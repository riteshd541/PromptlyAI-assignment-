"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return; // Wait until Clerk finishes loading
    if (isSignedIn) {
      router.replace("/dashboard");
    } else {
      router.replace("/sign-in");
    }
  }, [isSignedIn, isLoaded, router]);

  return null; // no UI here
}
