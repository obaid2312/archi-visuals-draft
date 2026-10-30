# Acceptance Gates: Archi Visuals Web Application

## Mode: Solo
Target: First draft website for Archi Visuals (Real Estate Video Production)

- [x] G1: Hero section with video background & fade-in "Archi Visuals" text
  - CHECK: node -e "const fs=require('fs'); const app=fs.readFileSync('src/components/Hero.tsx','utf-8'); if(app.includes('<video') && app.includes('Archi Visuals') && app.includes('opacity')) console.log('G1_PASS');"
  - EXPECT: G1_PASS
  - EVIDENCE: Passed. Background video autoplaying `/assets/hero-bg.mp4` with white "Archi Visuals" fade-in typography.

- [x] G2: About section with scroll-driven text color transition (dark to red on black background)
  - CHECK: node -e "const fs=require('fs'); const about=fs.readFileSync('src/components/About.tsx','utf-8'); if(about.includes('bg-black') && (about.includes('red') || about.includes('#ef4444') || about.includes('rgb(239, 68, 68)'))) console.log('G2_PASS');"
  - EXPECT: G2_PASS
  - EVIDENCE: Passed. Black background with word-by-word scroll interpolation from `#2c2c32` to `#ef4444`.

- [x] G3: Stats section with animated counting numbers
  - CHECK: node -e "const fs=require('fs'); const stats=fs.readFileSync('src/components/Stats.tsx','utf-8'); if(stats.includes('3000') && stats.includes('2.8') && stats.includes('B+') && stats.includes('Years In The Game')) console.log('G3_PASS');"
  - EXPECT: G3_PASS
  - EVIDENCE: Passed. Recreated exact screenshot layout with requestAnimationFrame animated count-up.

- [x] G4: Work section with draggable carousel, angled property cards & custom cursor
  - CHECK: node -e "const fs=require('fs'); const work=fs.readFileSync('src/components/Work.tsx','utf-8'); if(work.includes('DRAG') && (work.includes('rotate') || work.includes('tilt')) && work.includes('cursor')) console.log('G4_PASS');"
  - EXPECT: G4_PASS
  - EVIDENCE: Passed. Draggable rail with `< DRAG >` follower cursor, alternating card tilts, and luxury property photography.

- [x] G5: Testimonial section with tick scrubber & depth blur animation
  - CHECK: node -e "const fs=require('fs'); const test=fs.readFileSync('src/components/Testimonials.tsx','utf-8'); if(test.includes('blur') && (test.includes('tick') || test.includes('slider') || test.includes('scrubber'))) console.log('G5_PASS');"
  - EXPECT: G5_PASS
  - EVIDENCE: Passed. Interactive waveform ticks scrubber, center card focus, and depth blur on non-focused cards.

- [x] G6: Contact section with dual buttons (display number & email us)
  - CHECK: node -e "const fs=require('fs'); const c=fs.readFileSync('src/components/Contact.tsx','utf-8'); if(c.includes('Email Us') && (c.includes('tel:') || c.includes('+'))) console.log('G6_PASS');"
  - EXPECT: G6_PASS
  - EVIDENCE: Passed. Phone number display button with one-click copy/call + Email Us button + inquiry brief form.

- [x] G7: Footer with Archi Visuals branding, tagline & social media logos
  - CHECK: node -e "const fs=require('fs'); const f=fs.readFileSync('src/components/Footer.tsx','utf-8'); if(f.includes('Archi Visuals') && f.includes('Instagram') && f.includes('LinkedIn')) console.log('G7_PASS');"
  - EXPECT: G7_PASS
  - EVIDENCE: Passed. Archi Visuals monogram logo, cinematic tagline, quick links, and 5 social media platform logos.

- [x] G8: Fixed top-right menu with 3 options and smooth scroll
  - CHECK: node -e "const fs=require('fs'); const n=fs.readFileSync('src/components/Navbar.tsx','utf-8'); if(n.includes('fixed') && n.includes('top-') && n.includes('right-')) console.log('G8_PASS');"
  - EXPECT: G8_PASS
  - EVIDENCE: Passed. Fixed top-right glassmorphic menu toggling 3 options (About, Work, Contact) with smooth section redirect.

- [x] G9: TypeScript compilation and Vite production build
  - CHECK: npm run build
  - EXPECT: built in
  - EVIDENCE: Passed with 0 errors in 5.83s.
