# My Portfolio

My personal developer portfolio — a cross-platform app (web + mobile, powered by Expo) showcasing the projects I've built, the problems they solve, and how they were built.

**Live demo:** [my-portfolio-mocha-mu-64.vercel.app](https://my-portfolio-mocha-mu-64.vercel.app)

## What's Inside

- **Home screen** — an animated landing experience with a preloader and scroll-revealed sections introducing who I am and what I do
- **Project showcase** — a scrollable list of project cards, each linking through to a dedicated detail screen
- **Project detail screens** — per-project breakdowns including an image carousel of app screens, a user-flow diagram, and a system-architecture diagram
- **About & contact sections** — a short bio and a direct way to reach me

## Tech Stack

- **Framework:** React Native + [Expo](https://expo.dev/)
- **Navigation:** React Navigation
- **Animation:** React Native's `Animated` API for scroll-reveal effects, smart nav-bar hide/show, and carousel transitions
- **Language:** TypeScript
- **Deployment:** Vercel (web export via Expo)

## Getting Started

```bash
# Install dependencies
npm install

# Start the app
npx expo start
```

From the Expo CLI output you can open the app in a development build, an Android/iOS simulator, [Expo Go](https://expo.dev/go), or directly in a web browser.

## Notable Implementation Details

- Project images and the loading screen run only on a true page reload, not on every in-app navigation — handled via a module-level flag rather than component state, since component state resets on every screen mount but a module stays loaded in memory until the JS bundle itself reloads.
- The project-screen image carousel auto-advances and supports swipe gestures on mobile; on web (where swipe isn't available) it falls back to clickable arrow controls, with platform-specific rendering logic (`Platform.OS === 'web'`) throughout.
- Images can be tapped to expand fullscreen via a modal overlay.

## Roadmap

- [ ] Add real project screenshots and architecture diagrams for each case study
- [ ] Dark/light theme toggle
- [ ] Blog/writing section
