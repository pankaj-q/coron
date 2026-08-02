import { redirect } from "next/navigation";
import { BackgroundFX } from "@/components/ui/BackgroundFX";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { getSession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { serializePlan } from "@/lib/serialize";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const plans = await prisma.plan.findMany({
    where: { userId: session.userId },
    include: { steps: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <BackgroundFX />
      <DashboardClient userName={session.name} plans={plans.map(serializePlan)} />
    </>
  );
}
