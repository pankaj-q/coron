import type { Metadata } from "next";
import { Suspense } from "react";
import { BackgroundFX } from "@/components/ui/BackgroundFX";
import { VerifyEmailForm } from "@/components/auth/VerifyEmailForm";

export const metadata: Metadata = { title: "Verify your email" };

export default function VerifyEmailPage() {
  return (
    <>
      <BackgroundFX />
      <Suspense fallback={null}>
        <VerifyEmailForm />
      </Suspense>
    </>
  );
}
