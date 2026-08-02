import { redirect } from "next/navigation";
import { BackgroundFX } from "@/components/ui/BackgroundFX";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { getSession } from "@/lib/dal";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) redirect("/login");

  return (
    <>
      <BackgroundFX />
      <ProfileForm user={{ name: user.name, email: user.email, image: user.image }} />
    </>
  );
}
