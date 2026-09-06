# Kumawat Samaj — Full-Stack SPA Implementation Plan

## Overview

A responsive, single-page React + TypeScript application for the **Kumawat Samaj** community with a Hindutva-inspired cultural aesthetic. The app features a hero section, multi-step member registration form, and contact section.

## Tech Stack

| Layer | Library | Purpose |
|---|---|---|
| UI Framework | React 18 + TypeScript | Core UI |
| Styling | Tailwind CSS v3 | Responsive design, gradients |
| State | Zustand | Form step + submission state |
| Data/Async | TanStack Query v5 | Mutation + loading states |
| Validation | Zod | Schema-based form validation |
| Build | Vite | Fast dev server |

---

## File Structure

```
d:\kumawat-website\
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types/
    │   └── member.ts              # Zod schemas + TS types
    ├── store/
    │   └── formStore.ts           # Zustand store
    ├── services/
    │   └── memberService.ts       # Mock API with simulated delay
    ├── hooks/
    │   └── useMemberMutation.ts   # TanStack Query useMutation
    ├── components/
    │   ├── Hero.tsx
    │   ├── Navbar.tsx
    │   ├── RegistrationForm/
    │   │   ├── index.tsx          # Form container + steps
    │   │   ├── Step1Personal.tsx  # Name, Gotra, Mobile, Email
    │   │   ├── Step2Address.tsx   # Residential Address
    │   │   ├── Step3Family.tsx    # Family Details
    │   │   └── FormProgress.tsx   # Step indicator
    │   ├── Contact.tsx
    │   ├── Footer.tsx
    │   ├── Toast.tsx              # Success/error toast
    │   └── ui/
    │       ├── Button.tsx
    │       ├── Input.tsx
    │       ├── Card.tsx
    │       └── Spinner.tsx
    └── docs/
        └── README.md              # Full project documentation
```

---

## Proposed Changes

### [NEW] Project Bootstrap
- `package.json` — dependencies, scripts
- `vite.config.ts` — Vite + React plugin
- `tailwind.config.ts` — custom saffron/gold/orange palette
- `tsconfig.json` — strict TypeScript config
- `index.html` — root HTML with Google Fonts

### [NEW] Types & Validation
#### [NEW] `src/types/member.ts`
- Zod schema for `MemberFormData` (3 steps merged)
- Partial schemas for each step for per-step validation
- Exported TypeScript types inferred from schemas

### [NEW] State Management
#### [NEW] `src/store/formStore.ts`
- Zustand store with: `currentStep`, `formData`, `isSubmitting`, `submitStatus`
- Actions: `nextStep`, `prevStep`, `updateFormData`, `resetForm`

### [NEW] Mock Service
#### [NEW] `src/services/memberService.ts`
- `submitMemberRegistration()` — async function with 1.5s delay, 90% success rate

### [NEW] TanStack Query Hook
#### [NEW] `src/hooks/useMemberMutation.ts`
- `useMutation` wrapping the mock service
- `onSuccess` / `onError` callbacks to update Zustand store

### [NEW] UI Components
All primitive UI components with saffron/gold design tokens.

### [NEW] Page Sections
- **Navbar** — sticky, translucent with Om symbol and community name
- **Hero** — full-screen saffron-to-gold gradient, animated greeting
- **RegistrationForm** — 3-step form with progress bar
- **Contact** — office address, phone, email cards
- **Footer** — links, copyright

### [NEW] Documentation
#### [NEW] `src/docs/README.md`
Full project documentation with setup, architecture, component API, and customization guide.

---

## Verification Plan

### Automated
- `npm run build` — TypeScript compilation + Vite build must succeed

### Manual Verification
- Dev server runs on `http://localhost:5173`
- Hero section renders with gradient + animation
- Form validation triggers inline errors on each step
- Form submission shows loading spinner → success toast
- Contact cards and footer render correctly
- Responsive layout works at mobile/tablet/desktop breakpoints
