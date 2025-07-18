"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user;
  
  const login = async (email: string, password: string) => {
    return signIn("credentials", { email, password, redirect: false });
  };
  
  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  };
  
  const isAdmin = user?.role === "admin";
  
  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin,
    login,
    logout,
  };
}