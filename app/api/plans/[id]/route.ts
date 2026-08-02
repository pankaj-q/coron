import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/dal";
import { serializePlan, completion } from "@/lib/serialize";
import { rateLimit } from "@/lib/rate-limit";

type RouteCtx = { params: Promise<{ id: string }> };

const patchSchema = z.object({
  stepId: z.string().optional(),
  done: z.boolean().optional(),
});

export async function GET(_req: NextRequest, ctx: RouteCtx) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;

  const plan = await prisma.plan.findFirst({
    where: { id, userId: session.userId },
    include: { steps: true },
  });
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  return NextResponse.json({ plan: serializePlan(plan) });
}

export async function PATCH(req: NextRequest, ctx: RouteCtx) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;

  const rl = rateLimit(`plan-update:${session.userId}`, 60, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many updates. Please slow down." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success || !parsed.data.stepId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const plan = await prisma.plan.findFirst({
    where: { id, userId: session.userId },
    include: { steps: true },
  });
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  const step = plan.steps.find((s) => s.id === parsed.data!.stepId);
  if (!step) {
    return NextResponse.json({ error: "Step not found" }, { status: 404 });
  }

  const done = parsed.data!.done ?? !step.done;

  const updated = await prisma.step.update({
    where: { id: step.id },
    data: { done },
  });

  const refreshed = await prisma.plan.findFirst({
    where: { id },
    include: { steps: true },
  });

  return NextResponse.json({
    step: { id: updated.id, done: updated.done },
    completion: refreshed ? completion(refreshed) : 0,
  });
}

export async function DELETE(_req: NextRequest, ctx: RouteCtx) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;

  const plan = await prisma.plan.findFirst({
    where: { id, userId: session.userId },
  });
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  await prisma.plan.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
