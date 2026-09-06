# Kumawat Samaj — Official Community Portal

> **कुमावत समाज** | एकता • संस्कृति • विरासत  
> A modern, responsive single-page application for the Kumawat Samaj community.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Setup & Installation](#4-setup--installation)
5. [Architecture](#5-architecture)
6. [Component Reference](#6-component-reference)
7. [State Management (Zustand)](#7-state-management-zustand)
8. [Form Validation (Zod)](#8-form-validation-zod)
9. [Data Fetching (TanStack Query)](#9-data-fetching-tanstack-query)
10. [Design System](#10-design-system)
11. [Customization Guide](#11-customization-guide)
12. [Connecting a Real Backend](#12-connecting-a-real-backend)
13. [SEO & Accessibility](#13-seo--accessibility)

---

## 1. Project Overview

The Kumawat Samaj portal provides:

- **Hero Section** — a striking full-viewport header with saffron-to-gold gradient, animated Sanskrit greeting, community statistics, and dual CTA buttons.
- **3-Step Member Registration Form** — collects personal info, residential address, and family details with per-step Zod validation and a success screen.
- **Contact Section** — office address, helpline numbers, email, and office hours.
- **Footer** — community links, social media, newsletter subscription, and bilingual copyright.

---

## 2. Tech Stack

| Layer | Library | Version | Purpose |
|---|---|---|---|
| UI Framework | React | 18 | Component-based UI |
| Language | TypeScript | 5 | Type safety |
| Build Tool | Vite | 5 | Fast HMR dev server |
| Styling | Tailwind CSS | 3 | Utility-first responsive design |
| State | Zustand | 4 | Form step & submission state |
| Data/Async | TanStack Query | 5 | `useMutation` for form submission |
| Validation | Zod | 3 | Schema-based form validation |
| Forms | react-hook-form | 7 | Performant form handling |
| Resolver | @hookform/resolvers | 3 | Zod ↔ react-hook-form bridge |
| Toasts | react-hot-toast | 2 | Success / error notifications |
| Icons | lucide-react | latest | SVG icon library |

---

## 3. Project Structure

```
kumawat-website/
├── index.html                      # Root HTML (SEO meta, Google Fonts)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts              # Custom saffron/gold color palette
├── postcss.config.js
├── public/
│   └── favicon.svg                 # Om symbol SVG favicon
└── src/
    ├── main.tsx                    # App entry point
    ├── App.tsx                     # Root component (providers + layout)
    ├── index.css                   # Global styles (Tailwind + custom classes)
    │
    ├── types/
    │   └── member.ts               # Zod schemas + TypeScript types
    │
    ├── store/
    │   └── formStore.ts            # Zustand store (form state)
    │
    ├── services/
    │   └── memberService.ts        # Mock API (swap for real API)
    │
    ├── hooks/
    │   └── useMemberMutation.ts    # TanStack Query useMutation hook
    │
    ├── components/
    │   ├── Navbar.tsx              # Sticky translucent navigation
    │   ├── Hero.tsx                # Full-viewport hero section
    │   ├── Contact.tsx             # Contact cards + office hours
    │   ├── Footer.tsx              # Footer with links + newsletter
    │   │
    │   ├── RegistrationForm/
    │   │   ├── index.tsx           # Form container (step routing)
    │   │   ├── FormProgress.tsx    # Step indicator (1→2→3)
    │   │   ├── Step1Personal.tsx   # Name, Gotra, Mobile, Email
    │   │   ├── Step2Address.tsx    # Address, City, State, PIN
    │   │   └── Step3Family.tsx     # Marital Status, Children, etc.
    │   │
    │   └── ui/
    │       ├── Button.tsx          # Button variants (primary/secondary/gold/ghost)
    │       ├── Input.tsx           # Input, Select, Textarea
    │       ├── Card.tsx            # Card, ContactCard, StatCard
    │       └── Spinner.tsx         # Loading spinner
    │
    └── docs/
        └── README.md               # This file
```

---

## 4. Setup & Installation

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Steps

```bash
# 1. Clone / navigate to the project directory
cd kumawat-website

# 2. Install all dependencies
npm install

# 3. Start the development server
npm run dev
# → App runs at http://localhost:5173

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

### Environment Variables

No environment variables are required for the mock API mode.  
For a real backend, create a `.env` file:

```env
VITE_API_BASE_URL=https://api.kumawatsamaj.org
VITE_API_KEY=your_api_key_here
```

---

## 5. Architecture

### Data Flow

```
User fills form → react-hook-form (local state)
                ↓
           Zod validation (per-step schema)
                ↓ (valid)
           Zustand store (accumulated formData + currentStep)
                ↓ (Step 3 submit)
      TanStack Query useMutation → memberService.ts (mock API)
                ↓
        onSuccess → toast + Zustand success state → Success screen
        onError   → toast + Zustand error state  → Inline error message
```

### Component Hierarchy

```
App
├── QueryClientProvider
├── Toaster
└── div.min-h-screen
    ├── Navbar
    ├── main
    │   ├── Hero
    │   ├── RegistrationForm
    │   │   ├── FormProgress
    │   │   └── Step1Personal | Step2Address | Step3Family
    │   └── Contact
    └── Footer
```

---

## 6. Component Reference

### `<Navbar />`

| Prop | Type | Description |
|------|------|-------------|
| — | — | No props; reads scroll position internally |

**Features:**
- Becomes opaque + shadowed on scroll > 20px
- Om symbol + bilingual brand name
- Mobile hamburger menu with smooth open/close
- "Join Now" highlight button

---

### `<Hero />`

No props. Renders:
- Full-viewport saffron-to-gold gradient
- Om tile pattern overlay (SVG data URL)
- Animated heading, tagline, dual CTA buttons
- Community stats bar (50K+ members, 200+ villages, etc.)

---

### `<RegistrationForm />`

Reads `currentStep` and `submitStatus` from Zustand.

| State | Render |
|-------|--------|
| `currentStep: 1-3` | FormProgress + active step form |
| `submitStatus: 'success'` | Success screen with member ID |

---

### `<FormProgress currentStep={n} />`

| Prop | Type | Required |
|------|------|----------|
| `currentStep` | `number` | Yes |

---

### `<Button />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'gold' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `loading` | `boolean` | `false` | Shows spinner, disables button |
| `leftIcon` | `ReactNode` | — | Icon before label |
| `rightIcon` | `ReactNode` | — | Icon after label |

---

### `<Input />`

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Field label |
| `error` | `string` | Inline error message |
| `hint` | `string` | Helper text (hidden when error) |
| `leftIcon` | `ReactNode` | Icon inside input left |

Extends all native `<input>` attributes.

---

### `<Select />`

| Prop | Type | Description |
|------|------|-------------|
| `options` | `{value, label}[]` | Select options |
| `placeholder` | `string` | Disabled placeholder option |
| `error` | `string` | Inline error |

---

### `<Textarea />`

| Prop | Type | Description |
|------|------|-------------|
| `maxLength` | `number` | Character limit |
| `currentLength` | `number` | Current char count (for counter) |

---

### `<ContactCard />`

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `ReactNode` | Icon at top |
| `title` | `string` | Card heading |
| `lines` | `string[]` | Content lines |
| `href` | `string?` | Optional link URL |
| `accentColor` | `string?` | Tailwind classes for icon background |

---

### `<StatCard />`

| Prop | Type | Description |
|------|------|-------------|
| `value` | `string` | Large stat value (e.g. "50,000+") |
| `label` | `string` | Description label |
| `icon` | `ReactNode?` | Optional icon |

---

## 7. State Management (Zustand)

**Store:** `src/store/formStore.ts`

### State Shape

```ts
{
  currentStep:         1 | 2 | 3
  formData:            Partial<MemberFormData>
  submitStatus:        'idle' | 'loading' | 'success' | 'error'
  submitError:         string | null
  registeredMemberId:  string | null
}
```

### Actions

| Action | Description |
|--------|-------------|
| `nextStep()` | Advance to next step (max: 3) |
| `prevStep()` | Go to previous step (min: 1) |
| `goToStep(n)` | Jump to step n |
| `updateStep1(data)` | Merge Step 1 data into `formData` |
| `updateStep2(data)` | Merge Step 2 data into `formData` |
| `updateStep3(data)` | Merge Step 3 data into `formData` |
| `setSubmitStatus(s)` | Set submission status |
| `setSubmitError(e)` | Set error message |
| `setRegisteredMemberId(id)` | Store returned member ID |
| `resetForm()` | Reset all state to initial values |

### Devtools

Open Redux DevTools in browser → select **KumawatSamaj/FormStore** to inspect actions and state changes.

---

## 8. Form Validation (Zod)

**File:** `src/types/member.ts`

### Step Schemas

| Schema | Fields | Key Rules |
|--------|--------|-----------|
| `step1Schema` | `fullName, gotra, mobile, email` | Name: letters only; mobile: Indian 10-digit; email: valid format |
| `step2Schema` | `addressLine1, addressLine2?, city, state, pinCode` | PIN: 6-digit Indian format |
| `step3Schema` | `maritalStatus, numberOfChildren, fatherName, spouseName?, occupation, bio?` | Children: 0–20 integer; bio: max 500 chars |
| `memberFormSchema` | All of the above merged | Full combined schema for final submission |

### Usage with react-hook-form

```ts
const { register, handleSubmit, formState: { errors } } = useForm<Step1Data>({
  resolver: zodResolver(step1Schema),
  defaultValues: { fullName: '', gotra: undefined, mobile: '', email: '' }
})
```

### Adding a New Field

1. Add the field to the relevant step schema in `member.ts`
2. Add the input to the corresponding `Step*.tsx` component
3. The type is automatically inferred — no separate type update needed

---

## 9. Data Fetching (TanStack Query)

**Hook:** `src/hooks/useMemberMutation.ts`  
**Service:** `src/services/memberService.ts`

### Mock API Behavior

| Behavior | Value |
|----------|-------|
| Simulated delay | 1200–1800ms (random) |
| Success rate | ~90% |
| Failure rate | ~10% (random mock errors) |
| Returned on success | `{ memberId, message, registeredAt }` |
| Error examples | Duplicate mobile, duplicate email, server error |

### Mutation Lifecycle

```
mutate(formData)
  → onMutate:  setSubmitStatus('loading'), dismiss toasts
  → onSuccess: setSubmitStatus('success'), store memberId, show success toast
  → onError:   setSubmitStatus('error'), store error message, show error toast
```

### Replacing with Real API

Edit `src/services/memberService.ts`:

```ts
// Replace the mock implementation:
export async function submitMemberRegistration(
  data: MemberFormData
): Promise<MemberRegistrationResponse> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message ?? 'Registration failed')
  }

  return response.json()
}
```

---

## 10. Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `saffron-500` | `#ff7d0a` | Primary buttons, focus rings |
| `saffron-400` | `#ff9d40` | Hover states, icons |
| `gold-400` | `#fbbf24` | Gold accents, CTA buttons |
| `kumawat-cream` | `#fdf6ec` | Page background |
| `kumawat-deep` | `#2d1a00` | Primary text color |
| `kumawat-ochre` | `#d4820a` | Decorative accents |
| `kumawat-lotus` | `#e8608a` | Contact card accent |

### Typography

| Family | Variable | Usage |
|--------|----------|-------|
| Inter | `font-sans` | Body text, UI labels |
| Playfair Display | `font-serif` | Headings, hero title |
| Noto Serif Devanagari | `font-devanagari` | Sanskrit text, Om symbol |

### Component CSS Classes

| Class | Description |
|-------|-------------|
| `.btn-primary` | Saffron gradient button |
| `.btn-secondary` | Outlined saffron button |
| `.btn-gold` | Gold gradient CTA with pulse animation |
| `.form-input` | Styled form input |
| `.form-label` | Field label |
| `.form-error` | Inline error with icon |
| `.floating-card` | White card with hover lift |
| `.section-title` | Centered serif section heading |
| `.om-divider` | Decorative divider with Om symbol |
| `.text-gradient-saffron` | Saffron gradient text |
| `.glass` | Glassmorphism overlay |

### Custom Animations

| Animation | Usage |
|-----------|-------|
| `animate-fade-in-up` | Hero text entrance |
| `animate-fade-in` | Success screen |
| `animate-float` | Om badge, map pin |
| `animate-pulse-gold` | Gold CTA button glow |
| `animate-delay-{100-600}` | Staggered entrance delays |

---

## 11. Customization Guide

### Changing Community Name

Search for `"Kumawat Samaj"` and `"कुमावत समाज"` across all files and replace with your community name.

### Changing Colors

Edit `tailwind.config.ts` → `theme.extend.colors`. Change the `saffron`, `gold`, and `kumawat` values. The rest of the UI adapts automatically.

### Adding a New Form Step

1. Create `src/components/RegistrationForm/Step4*.tsx`
2. Add a new Zod schema in `member.ts`
3. Add an `updateStep4` action in `formStore.ts`
4. Update `TOTAL_STEPS` and `STEP_LABELS` in `formStore.ts`
5. Register the new step in the `STEP_COMPONENTS` map in `RegistrationForm/index.tsx`

### Adding New Contact Cards

Edit the `CONTACT_INFO` array in `src/components/Contact.tsx`.

### Adding Community Statistics

Edit the `COMMUNITY_STATS` array in `src/components/Hero.tsx`.

---

## 12. Connecting a Real Backend

### API Contract Expected

**POST** `/api/members`

```json
// Request body
{
  "fullName": "Ramesh Kumar Kumawat",
  "gotra": "Kashyap",
  "mobile": "+919876543210",
  "email": "ramesh@example.com",
  "addressLine1": "123 Main Street",
  "addressLine2": "Near City Mall",
  "city": "Jaipur",
  "state": "Rajasthan",
  "pinCode": "302001",
  "maritalStatus": "Married",
  "numberOfChildren": 2,
  "fatherName": "Suresh Kumar Kumawat",
  "spouseName": "Kavita Devi Kumawat",
  "occupation": "Software Engineer",
  "bio": "Proud Kumawat from Jaipur."
}

// Success response (200)
{
  "success": true,
  "memberId": "KS-2024-482931",
  "message": "Welcome to Kumawat Samaj, Ramesh!",
  "registeredAt": "2024-09-06T15:30:00Z"
}

// Error response (4xx/5xx)
{
  "success": false,
  "code": "DUPLICATE_MOBILE",
  "message": "Mobile number is already registered."
}
```

---

## 13. SEO & Accessibility

### SEO Implemented

- ✅ Descriptive `<title>` with community name and keywords
- ✅ `<meta description>` with bilingual content
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card meta tags
- ✅ Single `<h1>` per page (`<h1>` in Hero, `<h2>` for sections)
- ✅ Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- ✅ Mobile `theme-color` meta tag (saffron)

### Accessibility Implemented

- ✅ `aria-label` on all interactive elements
- ✅ `aria-invalid` on form inputs with errors
- ✅ `aria-describedby` linking inputs to error messages
- ✅ `role="alert"` on error messages
- ✅ `role="progressbar"` with `aria-valuenow/min/max` on FormProgress
- ✅ `role="list"` on navigation lists
- ✅ `aria-expanded` on mobile menu toggle
- ✅ `aria-controls` linking toggle to menu panel
- ✅ `aria-labelledby` linking sections to headings
- ✅ Visible focus indicators via `focus:ring-2`
- ✅ Skip to main content via `id="main-content"`
- ✅ Color contrast ≥ 4.5:1 for all text

---

## License

© 2024 Kumawat Samaj. All Rights Reserved.  
जय कुमावत समाज 🙏
