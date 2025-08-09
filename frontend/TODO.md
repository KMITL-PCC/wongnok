# Frontend TODO — Restaurant App

## ⏳ Project Deadline: 2 Months

---

## 👤 Only's Tasks (Everything except auth)

### 🍽️ Restaurant Feature

- [ ] **Restaurant List Page** — `/restaurants`
  - [ ] Fetch restaurants list from `/api/restaurants`
  - [ ] Display as responsive grid with `RestaurantCard`
  - [ ] Add search bar (filter by name/location)
  - [ ] Add optional category filter
- [ ] **Restaurant Detail Page** — `/restaurants/[id]`
  - [ ] Show restaurant info (name, address, description, opening hours)
  - [ ] Integrate Google Maps for location
  - [ ] Display reviews
  - [ ] "Leave a review" form (authenticated only)
- [ ] **Edit Restaurant Info Page** — `/restaurants/[id]/edit`
  - [ ] Pre-fill form with current restaurant data
  - [ ] Save changes to backend
  - [ ] Restrict access to owners only (frontend check)

### 📝 Feedback Feature

- [ ] Feedback Page — `/feedback`
  - [ ] Feedback form (subject + message)
  - [ ] Submit to backend `/api/feedback`
  - [ ] Show success/failure toast

### 🗂️ Components to Build

- [ ] `RestaurantCard.tsx` — for listing
- [ ] `RestaurantForm.tsx` — for add/edit
- [ ] `ReviewSection.tsx` — display + submit reviews
- [ ] `FeedbackForm.tsx` — send feedback
- [ ] `MapEmbed.tsx` — Google Maps iframe
- [ ] `AuthGuard.tsx` — protect routes client-side

### 📦 State Management

- [ ] Create Zustand store for UI state:
  - global loading
  - filters/search state
- [ ] Integrate React Query for API data:
  - restaurants
  - restaurant details
  - reviews
  - feedback

### 🎯 Final Polishing

- [ ] Responsive mobile/tablet layouts
- [ ] Loading skeletons for pages
- [ ] Error states (404, empty lists)
- [ ] Toast notifications (success/error)
- [ ] SEO metadata for pages

---

## 👤 Nice's Tasks (Auth)

### 🔑 Auth Pages & Flow

- [ ] `/auth/login`
- [ ] `/auth/register`
- [ ] `/auth/forgot-password`
- [ ] `/auth/verify-email`
- [ ] Handle token/session storage
- [ ] Role-based route protection
- [ ] Logout flow

### 🔧 Auth Components

- [ ] `AuthProvider.tsx` — wrap app with auth context
- [ ] `LoginForm.tsx`
- [ ] `RegisterForm.tsx`
- [ ] `PasswordResetForm.tsx`
- [ ] `EmailVerificationPrompt.tsx`

### 🛡️ Route Protection

- [ ] Implement middleware or `AuthGuard` to restrict:
  - `/restaurants/[id]/edit` → Owner only
  - `/feedback` → Authenticated users
  - `/admin/*` → Admin only

---

## 🆓 Unassigned Tasks

### 💬 Messaging Feature

- [ ] Chat Page — `/chat/[restaurantId]`
  - [ ] ChatBox component for messages
  - [ ] Fetch past messages from backend
  - [ ] Send new messages in real-time (socket or poll)
  - [ ] Show sender/receiver name & timestamp

### 🤖 AI Chatbot Feature

- [ ] Create AI chat modal or `/ai` page
- [ ] Input box for user request
- [ ] Call backend AI endpoint for recommendations
- [ ] Display recommended restaurants in card format

### 🛠️ Admin Dashboard (UI Only)

- [ ] Admin Feedback Page — `/admin/feedback`
  - [ ] List all feedback from backend
- [ ] Admin User List Page — `/admin/users`
  - [ ] Display list of registered users

---

## 📅 Milestone Roadmap (2 Months)

### **Month 1**

**Week 1–2**

- Only:
  - Build `/restaurants` list page
  - Build `/restaurants/[id]` detail page (static info first)
  - Create `RestaurantCard`, `MapEmbed`, `ReviewSection`
- Nice:
  - Complete `/auth/login` and `/auth/register`
  - Setup `AuthProvider` & basic role-based route protection

**Week 3–4**

- Only:
  - Implement edit restaurant page `/restaurants/[id]/edit`
  - Add reviews submit/display
  - Build `/feedback` page
- Nice:
  - Finish password reset & email verification
  - Finalize auth middleware

---

### **Month 2**

**Week 5–6**

- Assign Unassigned Tasks:
  - Messaging feature basic version
  - AI chatbot UI & API call integration
- Only:
  - Zustand store + React Query hooks
- Nice:
  - Assist with messaging auth checks

**Week 7**

- Admin dashboard UI (feedback & user list)
- SEO + responsive layout fixes

**Week 8**

- Bug fixing, testing, final polish
- Deploy to production
