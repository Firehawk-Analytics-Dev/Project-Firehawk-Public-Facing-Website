# Firehawk Analytics - Final Setup Guide

Follow these steps to connect your database and view your new website.

## 1. Connect to Supabase

1.  **Get your Connection String:**
    *   Go to your [Supabase Dashboard](https://supabase.com/dashboard/projects).
    *   Select your project.
    *   Go to **Project Settings** (gear icon) > **Database**.
    *   Find the **Connection string** section, select **URI**, and copy it.
    *   *Note: Ensure you use the "Transaction" mode (usually port 6543) if you use Prisma or high-concurrency tools, but for Payload/Postgres adapter, the standard URI is fine.*

2.  **Update your `.env` file:**
    *   Open the `.env` file in the root of your project.
    *   Replace the `DATABASE_URI` value with your copied URI.
    *   Replace the password placeholder with your actual database password.

```env
DATABASE_URI=postgresql://postgres.[YOUR_PROJECT_ID]:[YOUR_PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres
```

3.  **Set a Payload Secret:**
    *   In the same `.env` file, set `PAYLOAD_SECRET` to any long random string.

## 2. Run the Web App

Open your terminal in the project directory and run:

```bash
npm run dev
```

## 3. View the Website

Once the server is running, open your browser and go to:

*   **Public Website:** [http://localhost:3000](http://localhost:3000)
*   **Admin Panel:** [http://localhost:3000/admin](http://localhost:3000/admin) (This is where you'll create your first admin user)

---
**Tip:** When you're ready to publish, simply push this code to a GitHub repository and link it to **Vercel**. Vercel will automatically detect Next.js and Payload.
