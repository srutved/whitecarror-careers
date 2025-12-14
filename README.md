# Careers Page System

## Project Overview

This project implements a company careers page system with an private dashboard and a public, SEO-ready careers page.

The focus areas were:
- Clean architecture
- Correct SSR vs CSR usage
- Realistic data modeling
- Security

---

## Tech Stack

- Next.js (App Router)
- Supabase (Auth + Database)
- Tailwind CSS
- TypeScript

---

## How to Run Locally

1. Clone the repository
2. Install dependencies

   ```bash
   npm install --legacy-peer-deps
3. Start the dev server

   ```bash
   npm run dev

## What I Built
 
 ### Dashboard
 - Company details editor
 - Branding editor
 - Sections editor
 - Drag-and-drop sections
 - Add job feature

 ### Public Company Careers Page
 - Server rendered career page
 - SEO metadata and structured data
 - Dynamic title and favicon per company

## Improvement Plan
   - Add pagination in jobs
   - Add job edit feature
   - Add job analytics
   - Add custom section option

## Step-by-Step User Guide

   1. Go to https://whitecarrot-careers.vercel.app/
   2. Click on "Sign In" button in navbar
   3. Sign up if you do not have any account
   4. Verify your account by clicking Confirm Account button received in Supabase email
   5. Login now using your credentials, you will be redirected to dashboard
   6. On dashboard there are two sections horizontally divided - 1. Left one is editor section 2. Right one is live preview of the changes
   7. Fill company details, branding and sections from left section and Save changes
   8. Create jobs from Create Job button in right section navbar, it will appear only after you add company details and save them once
   9. Click on Share icon in right navbar to view the public page or to copy the public careers page url