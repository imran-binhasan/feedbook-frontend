├── app
│   ├── api
│   │   ├── auth
│   │   │   ├── login
│   │   │   │   └── route.ts
│   │   │   ├── logout
│   │   │   │   └── route.ts
│   │   │   └── register
│   │   │       └── route.ts
│   │   └── v1
│   │       ├── [...path]
│   │       │   └── route.ts
│   │       └── uploads
│   │           └── images
│   │               └── route.ts
│   ├── (auth)
│   │   ├── loading.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   └── register
│   │       └── page.tsx
│   ├── error.tsx
│   ├── favicon.ico
│   ├── (feed)
│   │   ├── feed
│   │   │   ├── error.tsx
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── not-found.tsx
├── components
│   ├── providers
│   │   ├── auth-provider.tsx
│   │   ├── query-provider.tsx
│   │   └── theme-provider.tsx
│   └── ui
│       ├── avatar.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── confirm-dialog.tsx
│       ├── field.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── profile-dropdown.tsx
│       └── theme-toggle.tsx
├── docs
│   └── folder_strcuture.md
├── eslint.config.mjs
├── features
│   ├── auth
│   │   ├── api
│   │   │   └── auth.ts
│   │   ├── components
│   │   │   ├── auth-decorative-shapes.tsx
│   │   │   ├── auth-page-shell.tsx
│   │   │   ├── google-auth-button.tsx
│   │   │   ├── login-form.tsx
│   │   │   ├── or-divider.tsx
│   │   │   └── register-form.tsx
│   │   ├── hooks
│   │   │   └── use-auth.ts
│   │   ├── schemas
│   │   │   └── auth.ts
│   │   ├── store
│   │   │   └── auth.ts
│   │   └── types
│   │       └── auth.ts
│   └── feed
│       ├── api
│       │   └── feed.api.ts
│       ├── components
│       │   ├── feed-aside
│       │   │   ├── feed-aside.tsx
│       │   │   ├── friends-list-card.tsx
│       │   │   └── suggested-pages-card.tsx
│       │   ├── feed-header.tsx
│       │   ├── feed-icons.tsx
│       │   ├── feed-shell.tsx
│       │   ├── feed-sidebar
│       │   │   ├── events-card.tsx
│       │   │   ├── explore-card.tsx
│       │   │   ├── feed-sidebar.tsx
│       │   │   └── suggested-people-card.tsx
│       │   ├── feed-stream
│       │   │   ├── comment-input.tsx
│       │   │   ├── comment-item.tsx
│       │   │   ├── comment-thread.tsx
│       │   │   ├── create-post.tsx
│       │   │   ├── edit-post-dialog.tsx
│       │   │   ├── feed-stories.tsx
│       │   │   ├── post-card.tsx
│       │   │   ├── reply-item.tsx
│       │   │   └── reply-thread.tsx
│       │   ├── feed-stream.tsx
│       │   └── mobile-nav.tsx
│       ├── data
│       │   └── feed.ts
│       ├── hooks
│       │   └── use-feed.ts
│       └── types
│           └── feed.types.ts
├── libs
│   ├── api
│   │   ├── backend.ts
│   │   └── client.ts
│   ├── hooks
│   │   └── use-file-preview.ts
│   └── utils.ts
├── next.config.mjs
├── next-env.d.ts
├── package.json
├── postcss.config.mjs
├── proxy.ts
├── public
├── README.md
├── tsconfig.json
├── tsconfig.tsbuildinfo
└── yarn.lock
