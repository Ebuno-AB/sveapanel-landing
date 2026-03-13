# Copilot Instructions — SveaPanel Landing

## Project Overview

SveaPanel is a Swedish survey/rewards app. This repository is its **marketing/auth landing page**, built with React + TypeScript + Vite. Users can register via BankID, follow referral links, and download the mobile app.

## Tech Stack

- **Framework**: React 19, TypeScript, Vite
- **Routing**: React Router DOM v7
- **State**: Redux Toolkit (`src/redux/`) — two slices: `balance` and `session`
- **Styling**: Per-component CSS files (co-located with component), MUI (`@mui/material`), Tailwind utility classes
- **Animation**: Framer Motion, GSAP, React Spring
- **Deep links**: Branch SDK (`branch-sdk`)
- **QR codes**: `qrcode` + `react-qr-code`

## Project Structure

```
src/
  components/   # Feature-based folders; each has a .tsx + .css file
  pages/        # Route-level pages (Landing, RegistrationPage, MyAccount, etc.)
  hooks/        # Custom hooks: useBankID, useReferral, gtag (GA4)
  config/       # API endpoints (api.ts) and BankID config (bankid.ts)
  redux/        # Store + slices
  utils/        # browserDetection, safeRedirect
  assets/       # icons, images, logos
```

## Key Conventions

- **Path alias**: `@/` resolves to `src/` — prefer `@/components/...` over relative paths for cross-folder imports.
- **Component files**: Each component lives in its own folder (`ComponentName/ComponentName.tsx` + `ComponentName.css`).
- **Language**: All user-facing text is in **Swedish**.
- **No test files exist** — do not generate test boilerplate unless asked.

## BankID Authentication

- Handled by `useBankID` hook (`src/hooks/useBankID.ts`).
- Polls two intervals: QR refresh and order verification.
- Always call `clearAllIntervals()` on unmount to avoid memory leaks.
- API calls go through `src/config/api.ts` endpoints — keep endpoint definitions there, not inline.

## Referral System

- Referral codes are exactly **5 characters** (`/r/{code}`).
- Codes are validated via `useReferral` hook before any navigation.
- Invalid/missing codes redirect to `/`.

## URL Redirect Safety

- **Always** use `safeRedirect(url)` from `src/utils/safeRedirect.ts` for programmatic navigation to external URLs.
- Allowed targets: `bankid://`, `https://app.bankid.com/`, and same-origin paths.
- Never use `window.location.href = untrustedUrl` directly.

## Mobile / Browser Detection

- Use helpers from `src/utils/browserDetection.ts`: `isPhone()`, `isSocialBrowser()`, `isAndroid()`, etc.
- Social browser detection covers Facebook, Instagram, and Snapchat in-app browsers — show `<SocialBrowserWarning>` in these cases.

## Redux Usage

- Use the typed `useAppSelector` from `src/redux/store.ts` instead of raw `useSelector`.
- Do not add new slices without updating both `store.ts` and the `RootState` type.

## Styling Notes

- Global styles live in `src/App.css` and `src/index.css`.
- Component-specific styles are co-located CSS files — do not use inline styles for layout.
- MUI components should use Emotion (`@emotion/styled`) for customization, not `sx` prop sprawl.
