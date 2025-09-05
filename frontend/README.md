# WongNok Frontend 🍽️

A modern Next.js frontend application for the WongNok restaurant review platform, built with React 19, TypeScript, and Tailwind CSS v4.

> **Note**: This project is currently in active development. Some features may be incomplete or subject to change.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Theme**: next-themes for dark/light mode
- **Charts**: Recharts
- **Animations**: Framer Motion (via vaul)

## 📁 Project Structure

```
frontend/
├── app/                     # Next.js App Router
│   ├── (auth)/             # Auth route group
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   └── forgotpassword/ # Password reset page
│   ├── restaurants/        # Restaurant listing page
│   ├── profile/           # User profile page
│   ├── privacy/           # Privacy policy page
│   ├── terms/             # Terms of service page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/             # Reusable components
│   ├── auth/              # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── Privacy.tsx
│   │   └── terms.tsx
│   ├── header/            # Navigation components
│   │   ├── Header.tsx
│   │   └── Test.tsx
│   ├── home/              # Homepage components
│   │   ├── Hero.tsx
│   │   └── CallToAction.tsx
│   └── ui/                # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── form.tsx
│       └── ... (50+ UI components)
├── hooks/                 # Custom React hooks
│   └── use-mobile.ts
├── lib/                   # Utility functions
│   └── utils.ts           # Tailwind utilities
├── public/                # Static assets
│   ├── logo.svg
│   ├── food1-7.png       # Food images
│   └── ...
├── next.config.ts        # Next.js configuration
├── tailwind.config.js    # Tailwind configuration
├── components.json       # shadcn/ui configuration
└── package.json          # Dependencies and scripts
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Set up environment variables**

   Create a `.env.local` file in the root of the frontend directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack (Next.js 15's fast bundler)
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for UI components, which provides:

- **50+ Pre-built Components**: Buttons, forms, dialogs, tables, etc.
- **Radix UI Primitives**: Accessible and unstyled components
- **Tailwind CSS**: Utility-first styling
- **Dark Mode Support**: Built-in theme switching
- **TypeScript**: Full type safety

### Key Components

- **Forms**: Login, registration, and review forms with validation
- **Navigation**: Responsive header with mobile menu
- **Cards**: Restaurant and review display cards
- **Modals**: Confirmation dialogs and forms
- **Tables**: Data display with sorting and pagination
- **Charts**: Rating and statistics visualization

## 🔧 Configuration

### Next.js Configuration (`next.config.ts`)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

### Tailwind Configuration

The project uses Tailwind CSS v4 with modern features:

- **CSS-first configuration** - No JavaScript config file needed
- **Improved performance** - Faster builds and smaller bundles
- **Enhanced developer experience** - Better IntelliSense and error messages
- **Custom color palette** and design tokens
- **Component animations** and transitions
- **Responsive breakpoints** and utilities

### shadcn/ui Configuration (`components.json`)

Configured for:

- TypeScript support
- Tailwind CSS integration
- Custom component styling
- App Router compatibility

## 🎯 Features

### ✅ Currently Implemented

- **Modern UI Framework**: Next.js 15 with App Router and React 19
- **Component Library**: Complete shadcn/ui component set (50+ components)
- **Styling System**: Tailwind CSS v4 with modern configuration
- **Authentication Pages**: Login, registration, and password reset forms
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Theme Support**: Dark/light mode toggle with next-themes
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: Zustand for global state management
- **Data Fetching**: TanStack Query for server state management

### 🚧 In Development

- **Backend Integration**: API endpoints and data fetching
- **Restaurant Features**: Browse, search, and filter restaurants
- **Review System**: Submit and manage restaurant reviews
- **User Profiles**: User account management
- **Testing Suite**: Unit and integration tests

## 🔗 API Integration

The frontend is designed to communicate with the backend API through:

- **TanStack Query**: For data fetching and caching
- **Fetch API**: Native HTTP client for API requests
- **Error Handling**: Centralized error management
- **Loading States**: UI feedback for async operations

### Planned API Endpoints

- `GET /api/restaurants` - Fetch restaurants
- `POST /api/auth/login` - User authentication
- `POST /api/reviews` - Submit reviews
- `GET /api/user/profile` - User profile data

> **Note**: API integration is currently in development. The frontend is ready for backend connection.

## 🧪 Testing

Testing setup is planned for future implementation. The project structure is ready to accommodate:

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Playwright**: End-to-end testing
- **MSW**: API mocking for tests

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main

### Manual Deployment

```bash
# Build the application
npm run build

# Start the production server
npm start
```

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_production_google_client_id
```

## 🎨 Styling Guide

### Tailwind CSS Usage

```jsx
// Example component styling
<div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
    Restaurant Name
  </h2>
  <p className="mt-2 text-gray-600 dark:text-gray-300">
    Restaurant description
  </p>
</div>
```

### Component Patterns

```jsx
// Using shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RestaurantCard({ restaurant }) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle>{restaurant.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{restaurant.description}</p>
        <Button className="mt-4">View Details</Button>
      </CardContent>
    </Card>
  );
}
```

## 🤝 Contributing

### Development Guidelines

1. **Code Style**: Follow the existing TypeScript and React patterns
2. **Components**: Use functional components with hooks
3. **Styling**: Use Tailwind CSS classes and shadcn/ui components
4. **State**: Prefer local state, use Zustand for global state
5. **Forms**: Use React Hook Form with Zod validation

### Adding New Components

```bash
# Add a new shadcn/ui component
npx shadcn-ui@latest add [component-name]

# Example: Add a new dialog component
npx shadcn-ui@latest add dialog
```

### Commit Guidelines

- Use conventional commit messages
- Test your changes before committing
- Update documentation as needed
- Follow the existing code style

## 📚 Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub Repository](https://github.com/vercel/next.js)

### UI/UX Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/)

### React Resources

- [React Documentation](https://react.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [TanStack Query](https://tanstack.com/query/latest)

## 📄 License

This project is licensed under the MIT License - see the main project LICENSE file for details.

---

Built with ❤️ using Next.js, React, and modern web technologies for the KMITL community.
