# NextAuth.js Integration for AuraColor

This document outlines how NextAuth.js has been integrated into the AuraColor application for authentication.

## Setup

1. NextAuth.js has been installed and configured to work with Supabase authentication.
2. The integration uses a Credentials provider that authenticates against Supabase.
3. Session management is handled via JWT strategy.

## Configuration

### Environment Variables

Add the following to your `.env.local` file:

```
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000
```

For production, generate a secure random string for `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### API Routes

NextAuth.js is configured in:
- `/app/api/auth/[...nextauth]/route.ts`

### Middleware

Route protection is implemented in:
- `/middleware.ts`

## Usage

### Server Components

```tsx
import { getSession } from "@/lib/auth/session";

export default async function Page() {
  const session = await getSession();
  
  if (!session) {
    // Handle unauthenticated state
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {session.user.name}</div>;
}
```

### Client Components

```tsx
"use client";

import { useAuth } from "@/hooks/use-auth";

export default function ClientComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protected Routes

Use the AuthGuard component to protect client-side routes:

```tsx
"use client";

import { AuthGuard } from "@/app/components/auth/AuthGuard";

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <div>This content is only visible to authenticated users</div>
    </AuthGuard>
  );
}
```

For admin-only routes:

```tsx
<AuthGuard requireAdmin={true}>
  <div>Admin-only content</div>
</AuthGuard>
```

## Authentication Flow

1. Users navigate to `/login`
2. After successful authentication, they are redirected to `/dashboard`
3. Admin users can access `/admin` routes
4. Protected routes check authentication status and redirect to login if needed

## Session Data

The session includes:
- `user.id`: The user's ID from Supabase
- `user.email`: The user's email address
- `user.name`: The user's name (if available)
- `user.role`: The user's role (e.g., "admin", "user")

## Customization

To customize the authentication flow:
1. Modify `/app/api/auth/[...nextauth]/route.ts` for backend changes
2. Update `/hooks/use-auth.ts` for client-side behavior
3. Adjust `/middleware.ts` for route protection rules