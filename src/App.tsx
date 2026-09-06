/**
 * @file App.tsx
 * @description Root application component. Wraps the app in TanStack Query's
 * `QueryClientProvider` and react-hot-toast's `Toaster`, then composes all
 * page sections in order.
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { Navbar }             from './components/Navbar'
import { Hero }               from './components/Hero'
import { RegistrationForm }   from './components/RegistrationForm'
import { Contact }            from './components/Contact'
import { Footer }             from './components/Footer'

// ──────────────────────────────────────────
// TanStack Query Client configuration
// ──────────────────────────────────────────

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:  1000 * 60 * 5,  // 5 minutes
      gcTime:     1000 * 60 * 10, // 10 minutes
      retry:      1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0, // Do not auto-retry mutations; let the user retry manually
    },
  },
})

// ──────────────────────────────────────────
// App Component
// ──────────────────────────────────────────

/**
 * `App` — root component that sets up providers and renders the page layout.
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* ── Toast Notifications ────────────────── */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={12}
        containerStyle={{ top: 80 }}
        toastOptions={{
          duration: 5000,
          style: {
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize:   '14px',
            maxWidth:   '400px',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(45,26,0,0.12)',
          },
        }}
      />

      {/* ── Page Layout ────────────────────────── */}
      <div className="min-h-screen flex flex-col">
        {/* Sticky navigation */}
        <Navbar />

        {/* Main page content */}
        <main id="main-content" role="main">
          {/* 1. Hero */}
          <Hero />

          {/* 2. Member Registration Form */}
          <RegistrationForm />

          {/* 3. Contact & Address */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </QueryClientProvider>
  )
}

export default App
