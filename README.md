# Feedbook Frontend

Next.js 16 frontend for a social feed app. App Router, React 19, Tailwind v4, TanStack Query, Zustand.

**Live:** [feedbook-task.vercel.app](https://feedbook-task.vercel.app)

## Stack

- **Next.js 16** — App Router, server components where possible
- **React 19**
- **Tailwind v4** — CSS-first config, dark mode via `next-themes`
- **TanStack Query v5** — infinite queries for feed/comments/replies, optimistic mutations
- **Zustand** — client state: current user + session expiry
- **React Hook Form + Zod** — auth form validation
- **Radix UI** — Dialog, DropdownMenu
- **Sonner** — toast notifications

## BFF Proxy

All API calls go through Next.js API routes (`/api/v1/*`) rather than directly to the NestJS backend. The session token lives in an httpOnly cookie, so the browser can't read it — the Next.js route handler reads it server-side and forwards it as an `Authorization` header.

This keeps the token out of the client bundle and hides the backend URL from the browser. The catch-all handler is in `app/api/v1/[...path]/route.ts`.

## Auth

On mount, `AuthProvider` calls `GET /api/v1/users/me`. If it gets a 200, the Zustand store gets the user and `sessionExpiresAt`. If it gets a 401, the store stays null.

`proxy.ts` middleware handles redirects: unauthenticated users get bounced from `/feed` to `/login`, logged-in users get bounced from `/login`/`register` to `/feed`.

The Zustand store tracks `user`, `sessionExpiresAt`, and a computed `isAuthenticated`. `AuthProvider` shows a toast warning an hour before the session expires.

## Optimistic Updates

Mutations update the UI immediately and roll back on error:

- **Like/unlike** — heart fills instantly, count adjusts
- **Comments & replies** — appear right away with a placeholder ID, replaced on server response
- **Delete** — removed from the list, restored on failure
- **Edit post** — content updates in-place

Uses TanStack Query's `onMutate` / `onError` / `onSettled` pattern.

## Infinite Scroll

Feed, comments, and replies use `useInfiniteQuery` with cursor-based pagination. An `IntersectionObserver` at the bottom of each list triggers `fetchNextPage`.

Replies are lazy — only fetched when you expand a thread or open the reply input.

## Component Structure

```
features/
├── auth/
│   ├── api/auth.ts
│   ├── hooks/use-auth.ts
│   ├── store/auth.ts
│   ├── schemas/auth.ts
│   └── components/          # LoginForm, RegisterForm, AuthShell
└── feed/
    ├── api/feed.api.ts
    ├── hooks/use-feed.ts
    ├── types/feed.types.ts
    └── components/
        ├── feed-stream.tsx
        ├── feed-stream/
        │   ├── create-post.tsx
        │   ├── edit-post-dialog.tsx
        │   ├── post-card.tsx
        │   ├── comment-thread.tsx
        │   ├── comment-input.tsx
        │   ├── comment-item.tsx
        │   ├── reply-thread.tsx
        │   ├── reply-item.tsx
        │   ├── likers-modal.tsx
        │   └── post-actions.tsx
        ├── feed-sidebar/
        ├── feed-aside/
        ├── feed-header.tsx
        ├── feed-shell.tsx
        └── mobile-nav.tsx
```

## Setup

```bash
cp .env.example .env.local
yarn install
yarn dev
```

### .env.local

```
BACKEND_URL=http://localhost:4000/api/v1
```

The backend needs to be running for anything to work.

## Routes

| Path | Protected | Description |
|---|---|---|
| `/login` | No | Login form |
| `/register` | No | Registration form |
| `/feed` | Yes | Main feed |
| `/api/auth/*` | — | Auth BFF routes |
| `/api/v1/*` | — | Catch-all proxy to backend |
