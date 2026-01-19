# Internal Code Review & Project Roadmap

## 1. Technical Audit

### Current Status: **Foundation Established**
- [x] **Next.js 15 (App Router)**: Core routing and structure complete.
- [x] **Payload CMS 3.0**: Native integration, API routes, and admin panel functional.
- [x] **Database**: Supabase PostgreSQL connected via `db-postgres`.
- [x] **Brand Identity**: Global CSS theme, Logo/Favicon assets, and core UI components (Navbar/Hero) ready.

### Identified Gaps & Improvements
1.  **Storage Logic**: The `@payloadcms/storage-s3` package is installed but not yet initialized in `src/payload.config.ts`. Media uploads are currently using local storage.
2.  **Dynamic Fetching**: The Landing Page (`Hero`, `Navbar`) is static. It needs to fetch and render `Services` from the Payload API.
3.  **Types & Safety**: Some TypeScript definitions can be tightened.
4.  **Resend Hooks**: The `Newsletters` collection needs a `beforePublish` hook to trigger email delivery via Resend.
5.  **SEO Depth**: JSON-LD utility is ready but not yet injected into the frontend page `<head>`.

---

## 2. Recommended Roadmap

### Phase 1: Storage & Media (Priority: High)
*   **Action**: Configure the S3 storage adapter in `payload.config.ts` using the provided Supabase S3 credentials.
*   **Result**: Permanent hosting for blog and service images.

### Phase 2: Content Integration (Priority: High)
*   **Action**: Implement `getPayload` in Server Components.
*   **Result**: 
    - Landing Page "Services" section (Bento Grid).
    - Dynamic Blog pages (`/blog/[slug]`).
    - Dynamic Service pages (`/services/[slug]`).

### Phase 3: Marketing & Lead Gen (Priority: Mid)
*   **Action**: 
    - Build a "Contact Us" component with Next.js Server Actions.
    - Connect the `Newsletters` publish hook to Resend.
*   **Result**: Functional lead capture and automated newsletters.

### Phase 4: Polish & Performance (Priority: Mid)
*   **Action**: 
    - Integrate Google Fonts (Outfit or Inter) for a more premium look.
    - Add Framer Motion for subtle micro-animations.
    - Final Vercel build optimization.

---

## Logical Next Step
**I recommend focusing on "Phase 1: Storage & Media" first.** This ensures that when you start adding content to your CMS, the images are correctly stored in Supabase from the beginning.
