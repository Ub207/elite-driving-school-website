# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-file React homepage for **Elite Driving Training** — a UK-based driving school in Luton. The entire UI lives in `driving-school-homepage.jsx` as a default-exported React component with no build tooling present in this repo. It is designed to be dropped into a React + Tailwind CSS environment (e.g. Vite, Next.js, or a tool like Claude Artifacts).

## Architecture

The file is self-contained: sub-components are defined above the main export and consumed inline. There is no routing, no state management library, and no API calls.

| Component | Purpose |
|---|---|
| `Counter` | Animates a number from 0 to `end` using `requestAnimationFrame`, triggered once on first scroll into view via `IntersectionObserver`. |
| `FadeIn` | Wraps any children in a scroll-triggered fade+slide-up animation. Accepts a `delay` prop (seconds). |
| `TestimonialCard` | Renders a star-rated review card. |
| `CourseCard` | Renders a pricing card; `popular` prop enables the highlighted/gold variant. |
| `ProcessStep` | Numbered step card, wraps `FadeIn`. |
| `DrivingSchoolHomepage` | Root component — navbar (scroll-aware + mobile hamburger), hero (auto-rotating 5 s slideshow), stats bar, courses, process, why-choose-us, testimonials, CTA, footer. |

## Styling

- **Tailwind CSS** utility classes throughout. No `tailwind.config.js` exists here; the consuming project must supply Tailwind.
- The `COLORS` constant at the top mirrors the palette used in Tailwind (`#0A1628` = `bg-[#0A1628]`, amber shades = `amber-500/400`). It is not used in JSX directly — it documents the design tokens.
- Fonts are loaded inline via a `<link>` tag inside the JSX: **Bebas Neue** (display headings) and **DM Sans** (body). The consuming app does not need to add these separately.
- One custom keyframe animation (`float`) is injected via a `<style>` tag inside the Hero section.

## Key Content / Contact Details

- Phone: `07500500545` — used in `tel:` links and WhatsApp (`https://wa.me/+447500500545`)
- Email: `info@elitedrivingtraining.co.uk`
- Location: Luton, United Kingdom
- Hours: Mon–Sun 7 am–9 pm
- Pricing: £30/hr (both manual and automatic)

## Adding / Editing Sections

Sections follow the same pattern: a `<section>` wrapper, a `FadeIn`-wrapped heading block, then content. To add a new section, follow this structure and place it between existing sections in the `DrivingSchoolHomepage` return.

To add a new course card, add a `<CourseCard>` inside the courses grid. To add a testimonial, add a `<TestimonialCard>` inside the testimonials grid — both are purely prop-driven with no shared state.
