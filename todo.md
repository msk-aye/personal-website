# Portfolio Website TODO

## Phase 1 – Architecture & Schema
- [x] Write todo.md
- [x] Design database schema (blog_posts, comments, contact_messages)
- [x] Apply SQL migrations via webdev_execute_sql

## Phase 2 – Global Styles & Layout
- [x] Choose and import elegant Google Fonts (headings + body)
- [x] Define refined color palette and CSS variables in index.css
- [x] Build top navigation bar with all 7 links: About, Experience, Projects, Interests, Education, Contact, Blog
- [x] Build site-wide Layout wrapper with nav + footer
- [x] Wire all routes in App.tsx

## Phase 3 – Portfolio Pages
- [x] Hero / About page – personal intro, profile area, tagline
- [x] Experience page – work history cards (company, role, dates, description)
- [x] Projects page – project cards (title, description, tech stack, links)
- [x] Interests page – visually engaging hobby/interest layout
- [x] Education page – academic background (institution, degree, dates)
- [x] Contact page – form with name, email, message; submits to owner

## Phase 4 – Blog System
- [x] Blog listing page – all posts with title, date, excerpt, Read More link
- [x] Blog post detail page – full markdown content rendering
- [x] Blog comments system – visitors leave comments, stored in DB
- [x] Admin: ability to create/edit/delete blog posts (owner only)

## Phase 5 – Backend
- [x] tRPC router: blog posts (list, getBySlug, create, update, delete)
- [x] tRPC router: comments (list by post, create)
- [x] tRPC router: contact form (submit → owner notification)
- [x] Server-side DB helpers in server/db.ts

## Phase 6 – Polish & Delivery
- [x] Responsive design across all pages
- [x] Smooth page transitions and micro-interactions
- [x] Vitest tests for routers
- [x] Final checkpoint and delivery
