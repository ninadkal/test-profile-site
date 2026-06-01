# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static portfolio/resume website for Mina Kim (김미나), a backend developer. The site is built with vanilla HTML, CSS, and JavaScript with no build tools or frameworks required.

## File Structure

```
portfolio-resume/
├── index_demo.html          # Main HTML file - complete page structure
├── css/
│   └── style.css           # Custom CSS + Tailwind CSS config
├── js/
│   └── script.js           # Vanilla JS for interactivity
└── assets/
    └── images/             # Image assets
```

## Running the Site

**Option 1 - Quick preview (no server):**
```bash
open portfolio-resume/index_demo.html
```

**Option 2 - Local development server (recommended):**
```bash
cd portfolio-resume
python3 -m http.server 8000
# Then visit http://localhost:8000 in your browser
```

## Technology Stack

- **Styling**: Tailwind CSS (CDN) + custom CSS in `css/style.css`
- **JavaScript**: Vanilla JS (no frameworks), uses localStorage and IntersectionObserver
- **Fonts**: Google Fonts (Inter, Noto Sans KR)
- **Language**: Korean (ko) - all content and UI text in Korean

## Key Features & Implementation

### Dark Mode
- Stored in localStorage as `darkMode: true/false`
- Toggle button in navbar changes `document.documentElement` class and icon
- Tailwind's `dark:` class syntax used for dark mode styles
- CSS variables switch in `.dark` mode selector in style.css

### Navigation
- Fixed navbar with smooth scroll to sections
- Desktop nav (hidden on mobile) + mobile hamburger menu
- Active link indicator based on scroll position using `updateActiveNavLink()`
- IntersectionObserver updates active link as user scrolls

### Animations
- **Fade-in on scroll**: `fadeInUp` keyframe with IntersectionObserver
- **Typewriter effect**: Character-by-character display of "백엔드 개발자" with 120ms delay
- **Respects prefers-reduced-motion**: Typewriter effect skipped if user enables motion reduction
- **Card hover**: `translateY(-6px)` with shadow increase
- **Profile ring**: Pulsing gradient ring around profile image

### Email Copy
- Copy email button in contact section triggers `navigator.clipboard.writeText()`
- Shows toast notification via `showToast()` function with 3-second auto-hide

### Scroll Behavior
- Smooth scrolling enabled via CSS `scroll-behavior: smooth`
- Navbar gets shadow on scroll via `navbar.scrolled` class when `scrollY > 50px`

## Styling Approach

- Tailwind CSS for layout and utility classes in HTML
- Custom CSS in `style.css` for complex animations, gradients, and component-specific styles
- CSS variables (--primary-color, --accent-color, etc.) for theming
- Light mode: Indigo (#6366f1) / Purple (#8b5cf6) gradients
- Dark mode: Blue (#3b82f6) / Light blue (#60a5fa) gradients

## Content Sections

Page is divided into sections with `id` attributes for nav linking:
- `#about` - Hero section with profile image and intro
- `#experience` - Work experience
- `#skills` - Technical skills
- `#projects` - Portfolio projects
- `#contact` - Contact information

All section headers have fade-in animation on scroll via `.fade-in` class.

## Common Changes

**Adding a new navigation link:**
1. Add `<a href="#new-section">Label</a>` to navbar (both desktop and mobile menus)
2. Create corresponding `<section id="new-section">` in HTML
3. Add `.fade-in` class to content inside the section for animation

**Changing colors:**
- Light mode: Modify `--primary-color`, `--accent-color`, `--gradient-primary` in `:root` CSS
- Dark mode: Modify the same variables in `.dark` selector at bottom of style.css
- Tailwind colors used inline (indigo-50, blue-950, etc.) - update className references in HTML

**Updating content:**
- All text is in `index_demo.html` - edit directly
- Profile image src in `index_demo.html` line 82 (currently uses Pokemon API)
- Email in `script.js` line 111 - update the hardcoded email string

## Accessibility

- Semantic HTML5 elements (`<nav>`, `<section>`, `<main>`)
- Respects `prefers-reduced-motion` for animations
- Focus-visible outlines on interactive elements
- Alt text on images
- ARIA-compatible structure

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge) supporting:
  - CSS Grid/Flexbox
  - CSS Custom Properties (Variables)
  - IntersectionObserver API
  - Clipboard API
  - Fetch API
  - localStorage

Note: IE11 not supported due to CSS variables and modern JavaScript features.
