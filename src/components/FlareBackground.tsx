import React, { useEffect, useRef, useState } from 'react';

const MODES = ['Flare', 'Fluid', 'Nebula', 'Plasma', 'Flame'] as const;

interface FlareBackgroundProps {
    initialMode?: number;
    showSwitcher?: boolean;
    className?: string;
}

export const FlareBackground: React.FC<FlareBackgroundProps> = ({
    initialMode = 0,
    showSwitcher = false,
    className = 'absolute inset-0 w-full h-full pointer-events-none',
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const modeRef = useRef<number>(initialMode);
    const [activeMode, setActiveMode] = useState<number>(initialMode);

    useEffect(() => {
        modeRef.current = activeMode;
    }, [activeMode]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl', {
            antialias: false,
            depth: false,
            stencil: false,
        });

        if (!gl) {
            console.error('WebGL is not supported in this browser.');
            return;
        }

        const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

        const fragmentShaderSource = `
      precision highp float;

      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_mode;

      mat2 rot(float a) {
        float s = sin(a), c = cos(a);
        return mat2(c, -s, s, c);
      }

      vec3 flarePalette(float x) {
        x = max(0.0, x);
        return vec3(
          pow(x, 0.85) * 1.75,
          pow(x, 2.85) * 1.15,
          pow(x, 5.20) * 0.95
        );
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

        vec2 m = (u_mouse - 0.5) * 0.18;
        uv += m * exp(-length(uv) * 1.2);

        float t = u_time * 0.28;
        float intensity = 0.0;

        if (u_mode < 0.5) {
          vec2 p = uv * 1.45;
          vec2 q = p;

          for (float i = 1.0; i <= 7.0; i++) {
            p *= rot(0.18 + 0.03 * i);
            q += (0.62 / i) * vec2(
              sin(i * p.y + t * 0.95 + i * 0.45) + cos(p.x * 0.85 - t * 0.6),
              cos(i * p.x + t * 0.80 + i * 0.90) - sin(p.y * 0.75 + t * 0.5)
            );
            p = q;

            float fold = abs(sin(p.x * 1.15 + cos(p.y * 1.05 + t * 0.4)) + cos(p.y * 1.15 - sin(p.x * 0.95 - t * 0.35)));
            float ridge = 1.0 / (fold * 2.15 + 0.42);
            intensity += ridge * (0.20 / pow(i, 0.58));
          }

          float voidMask = 0.55 + 0.45 * sin(uv.x * 1.35 - t * 0.55 + cos(uv.y * 1.25 + t * 0.4));
          voidMask = smoothstep(0.08, 0.95, voidMask);

          intensity = pow(intensity * 0.82, 1.55) * (0.38 + 0.82 * voidMask);
        } 
        else if (u_mode < 1.5) {
          vec2 p = uv * 1.8;
          for (float i = 1.0; i < 6.0; i++) {
            p.x += 0.55 / i * sin(i * 1.8 * p.y + t * 1.1 + 0.3 * i);
            p.y += 0.55 / i * cos(i * 1.8 * p.x + t * 0.9 + 0.5 * i);
          }
          intensity = 0.55 / (abs(sin(p.x + p.y + t * 0.5)) + 0.28);
          intensity = pow(intensity * 0.62, 1.4);
        } 
        else if (u_mode < 2.5) {
          vec2 p = uv * 1.5;
          float acc = 0.0;
          float amp = 0.55;
          for (int i = 0; i < 7; i++) {
            p = rot(0.6) * p * 1.35;
            p += vec2(sin(p.y + t * 0.5), cos(p.x - t * 0.4)) * 0.45;
            acc += amp * (0.5 + 0.5 * sin(p.x * 1.4 + cos(p.y * 1.4 + t)));
            amp *= 0.58;
          }
          intensity = pow(acc * 0.95, 2.2) * 1.6;
        } 
        else if (u_mode < 3.5) {
          vec2 p = uv * 2.2;
          for (float i = 1.0; i <= 6.0; i++) {
            p += (0.45 / i) * sin(p.yx * i * 1.4 + vec2(t * 1.4, -t * 1.1));
            intensity += (0.16 / i) / (abs(sin(length(p) * 2.5 - t * 1.5)) + 0.12);
          }
          intensity = pow(intensity * 0.78, 1.35);
        } 
        else {
          vec2 p = uv * 1.6;
          p.y -= t * 0.9;
          for (float i = 1.0; i <= 6.0; i++) {
            p.x += (0.5 / i) * sin(i * p.y * 1.6 + t * 1.8);
            p.y += (0.35 / i) * cos(i * p.x * 1.6 + t * 1.2);
          }
          float wave = abs(sin(p.x * 1.5) + cos(p.y * 1.2));
          intensity = pow(0.68 / (wave + 0.32), 1.6) * (0.85 - uv.y * 0.35);
        }

        vec3 col = flarePalette(intensity);
        col = 1.0 - exp(-col * 1.15);

        float vig = 1.0 - 0.25 * dot(uv * 0.65, uv * 0.65);
        col *= clamp(vig, 0.0, 1.0);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

        const compileShader = (type: number, source: string): WebGLShader | null => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        const program = gl.createProgram();

        if (!program || !vs || !fs) return;

        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);

        const quadBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            gl.STATIC_DRAW
        );

        const posLoc = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        const resLoc = gl.getUniformLocation(program, 'u_resolution');
        const timeLoc = gl.getUniformLocation(program, 'u_time');
        const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
        const modeLoc = gl.getUniformLocation(program, 'u_mode');

        const targetMouse = { x: 0.5, y: 0.5 };
        const smoothMouse = { x: 0.5, y: 0.5 };

        const handleResize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const width = canvas.clientWidth || window.innerWidth;
            const height = canvas.clientHeight || window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(resLoc, canvas.width, canvas.height);
        };

        const handlePointerMove = (e: PointerEvent) => {
            targetMouse.x = e.clientX / window.innerWidth;
            targetMouse.y = 1.0 - e.clientY / window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('pointermove', handlePointerMove);
        handleResize();

        const startTime = performance.now();
        let animationFrameId: number;

        const render = (now: number) => {
            const elapsed = (now - startTime) * 0.001;
            smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.05;
            smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.05;

            gl.uniform1f(timeLoc, elapsed);
            gl.uniform2f(mouseLoc, smoothMouse.x, smoothMouse.y);
            gl.uniform1f(modeLoc, modeRef.current);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('pointermove', handlePointerMove);
            if (quadBuffer) gl.deleteBuffer(quadBuffer);
            gl.deleteProgram(program);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} className={className} />
            {showSwitcher && (
                <nav
                    aria-label="Background Effect Modes"
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 p-1.5 rounded-full bg-black/65 border border-white/15 backdrop-blur-md shadow-2xl"
                >
                    {MODES.map((label, idx) => (
                        <button
                            key={label}
                            onClick={() => setActiveMode(idx)}
                            className={`px-4 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer ${activeMode === idx
                                    ? 'bg-white text-black font-semibold shadow-sm'
                                    : 'text-white/80 hover:text-white font-medium'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </nav>
            )}
        </>
    );
};

export default FlareBackground;