# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 blog application that fetches content from a Hygraph (GraphQL CMS) backend. It's built as a learning project for Claude Code crash courses, demonstrating modern web development with AI-assisted workflows.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run all tests in watch mode
npm test

# Run tests with UI
npm test:ui
```

## Architecture

### Data Flow
- Blog posts are fetched from a Hygraph GraphQL endpoint (configured via `HYGRAPH_ENDPOINT` environment variable)
- Two main GraphQL queries in `src/lib/queries.ts`:
  - `GET_BLOG_POSTS`: Fetches all blog posts for the listing page
  - `GET_SINGLE_POST`: Fetches a single post by slug
- Data is cached with ISR (revalidate: 3600 seconds)
- HTML content from Hygraph is sanitized using DOMPurify before rendering

### Security
- All HTML content from the CMS is sanitized via `src/lib/sanitize.ts`
- DOMPurify configuration allows specific HTML tags and attributes only
- Data attributes and unknown protocols are blocked

### Styling System
- Uses Tailwind CSS 4 with custom CSS variables defined in `src/app/globals.css`
- Custom theming system with CSS variables for colors (primary, secondary, accent, etc.)
- Dark mode implemented via `.dark` class on `<html>` element
- Two custom fonts: Rubik (body) and Merriweather (headings)
- Color tokens: background, foreground, primary, secondary, accent, muted, success, warning, danger, info, surface, border

### Component Structure
- `src/app/layout.tsx`: Root layout with header and dark mode toggle
- `src/app/page.tsx`: Homepage
- `src/app/blog/page.tsx`: Blog listing page with hero section and sidebar layout
- `src/app/blog/[slug]/page.tsx`: Individual blog post page with dynamic routing
- `src/components/DarkModeToggle.tsx`: Client component for theme switching
- `src/components/BlogSidebar.tsx`: Sidebar component for blog pages
- `src/components/ui/Button/`: UI component with tests

### Testing
- Uses Vitest with jsdom environment
- Testing Library for React component tests
- Test setup in `src/test/setup.ts` with jest-dom matchers
- Path aliases configured via `vite-tsconfig-paths`

### Path Aliases
- `@/*` maps to `src/*` (configured in `tsconfig.json`)

## Environment Setup

This project requires a `HYGRAPH_ENDPOINT` environment variable pointing to your Hygraph GraphQL API endpoint. Create a `.env.local` file in the root directory with:

```
HYGRAPH_ENDPOINT=your_hygraph_endpoint_url
```

## Type Definitions

Core type: `BlogPost` interface in `src/lib/types.ts` defines the shape of blog post data from Hygraph, including:
- `id`, `blogPostSlug`, `blogTitle`
- `createdAt`, `createdBy.name`
- `blogPostContent.html`

## Custom Slash Commands

The project includes a `/merged` command (see README) for cleaning up after PR merges - switches to main, pulls changes, and deletes the merged branch.
