"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SessionProvider } from "./components/auth/SessionProvider";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export function Providers({ children}: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider>
      <QueryClientProvider client={ queryClient }>{ children}</QueryClientProvider>
    </SessionProvider>
  );
}

export function StripeProvider({ children}: { children: React.ReactNode }) {
  return <Elements stripe={ stripePromise }>{ children}</Elements>;
}