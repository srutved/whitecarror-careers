# Tech Spec

## 1. Overview

This document describes the technical design of the Whitecarrot Careers Portal.
The goal was to build a realistic, production-style implementation for a Careers portal where each company can have its own custom UI.

The system allows:
- Recruiters to create and manage job postings
- Candidates to browse jobs via an SEO-friendly public page

---

## 2. Assumptions

- Each user belongs to exactly one company
- A company can have multiple job postings
- Images are used in base64, not uploaded on cloud
- Careers pages are public, editing is authenticated
- SEO is important (crawlable HTML, metadata, structured data)
- This is a demo project:
  - No pagination
  - Client-side filtering only
  - Focus on clarity and correctness

---

## 3. Architecture

### Frontend
- Next.js (App Router)
- Server Components for SEO-critical pages
- Client Components for interactivity
- Tailwind CSS

### Backend
- Next.js Route Handlers
- Supabase for authentication, and database

### Data Flow
- Public careers pages are server-rendered
- Dashboard is client-only
- Authorization is enforced at the database layer

---

## 4. Database Schema (High Level)

### users
- id
- email
- role
- company_id

### companies
- id
- name
- slug (unique)
- branding (colors, logo, banner)
- sections (JSON)
- is_published

### jobs
- id
- title
- location
- type
- department
- description
- requirements
- posted_date
- company_id

---

## 5. Security & RLS

- Public users can only read published companies and jobs
- Recruiters can manage data only for their own company

---

## 6. SEO Strategy

- Server-rendered careers pages
- Dynamic metadata per company
- JobPosting structured data (JSON-LD)
- Fully crawlable HTML

---

## 7. Test Plan

### Manual Tests
- Create and edit company page
- Add, edit, reorder sections
- Create jobs
- Verify access control

### SEO Tests
- View page source to confirm server-rendered jobs
- Validate metadata in browser devtools

---

## 8. Known Limitations

- No job pagination
- No applicant submissions
- Basic error handling
- No cloud bucket for images
- Only job creation allowed, no update or delete allowed