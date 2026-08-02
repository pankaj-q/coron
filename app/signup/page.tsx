import type { Metadata } from "next";
import { Suspense } from "react";
import { BackgroundFX } from "@/components/ui/BackgroundFX";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Create account" };

export default function SignupPage() {
  return (
    <>
      <BackgroundFX />
      <Suspense fallback={null}>
        <AuthForm mode="signup" />
      </Suspense>
    </>
  );
}
