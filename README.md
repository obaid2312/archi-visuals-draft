# Archi Visuals — Real Estate Video Production Website

A website built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** for **Archi Visuals**, a premier real estate and architectural cinematography production house.

---

## 🌟 Key Sections & Animation Implementation

1. **Hero Section (`Hero.tsx`)**
   - **Background Video**: Plays the ambient red fluid/glowing dynamic backdrop (`hero-bg.mp4`) with smooth fade-in and subtle scale.
   - **White Fade-In Headline**: `"Archi Visuals"` fades in with cinematic easing, accompanied by audio toggle controls and quick action CTAs.

2. **About Section (`About.tsx`)**
   - **Black Background**: Deep obsidian black aesthetic.
   - **Scroll-Driven Text Scrub**: As the user scrolls, each word transitions smoothly from muted charcoal dark (`#2c2c32`) into vibrant fiery red (`#ef4444`).
   - Introduces Archi Visuals' real estate video production expertise, equipment arsenal, and aerial capabilities.

3. **Stats / Metrics Section (`Stats.tsx`)**
   - Directly matching the layout and figures from the client screenshot:
     - **5+** Years In The Game
     - **3000+** Properties Filmed
     - **40+** Agents Trust Us
     - **$2.8B+** Property Marketed
   - Features animated number counters that start counting up when scrolled into view using an `IntersectionObserver`.

4. **Work / Portfolio Showcase (`Work.tsx`)**
   - **Custom `< DRAG >` Cursor**: A custom circular cursor follower with hand icon tracking mouse movement across the showcase area.
   - **Angled Property Cards**: Alternating subtle tilt angles (`-5°`, `+1.5°`, `+6°`, `-4°`, `+4.5°`, `-6°`) replicating the inspiration video.
   - **Draggable Carousel**: Horizontal drag interaction with momentum physics and arrow navigation controls.
   - **Background Typography**: Giant subtle ambient `"COLLECTION"` typography in the background.
   - **Interactive Preview Modal**: Clicking any property card opens an interactive 4K cinema reel preview lightbox.

5. **Testimonial Section (`Testimonials.tsx`)**
   - Direct replication of the inspiration animation:
     - **Audio-Waveform / Ticks Scrubber**: Horizontal row of 84 vertical tick marks with active position indicator that can be clicked or scrubbed.
     - **Active Card Focus & Depth Blur**: The center active card remains in sharp focus, while surrounding cards receive progressive depth blur and lower opacity.
     - Authentic testimonials from top luxury real estate agents, brokers, and architects.

6. **Contact Us Section (`Contact.tsx`)**
   - Two prominent action buttons:
     1. **Phone Number Button**: Displays `+64 21 892 4110` with one-click call & instant copy button (with confetti feedback).
     2. **Email Us Button**: Prominent red CTA button linking to email consultation.
   - Includes direct production brief submission form.

7. **Footer Section (`Footer.tsx`)**
   - Archi Visuals geometric monogram logo + name.
   - Tagline: *"Into Every Frame, Architectural Elegance. Witness premier real estate developments through the lens of Archi Visuals."*
   - Social media handles displayed as logos: **Instagram**, **YouTube**, **LinkedIn**, **Facebook**, **Vimeo**.
   - Quick links and copyright notice.

8. **Fixed Top-Right Navigation Menu (`Navbar.tsx`)**
   - Fixed position in the top-right corner across the entire webpage.
   - When clicked, opens a glassmorphism menu displaying the 3 requested navigation options:
     - `01 // About` (redirects to `#about`)
     - `02 // Work` (redirects to `#work`)
     - `03 // Contact` (redirects to `#contact`)
   - Smoothly scrolls to the section and auto-closes the menu.

---

## 🚀 Running the Project

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

