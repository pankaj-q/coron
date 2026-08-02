import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BackgroundFX } from "@/components/ui/BackgroundFX";
import { PlanView } from "@/components/plan/PlanView";
import { getSession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { serializePlan } from "@/lib/serialize";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Plan" };

export default async function PlanPage({ params }: PageProps) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect("/login");

  const plan = await prisma.plan.findFirst({
    where: { id, userId: session.userId },
    include: { steps: true },
  });

  if (!plan) notFound();

  return (
    <>
      <BackgroundFX />
      <PlanView plan={serializePlan(plan)} />
    </>
  );
}
