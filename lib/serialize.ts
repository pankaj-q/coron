import type { Plan, Step } from "@/lib/generated/prisma/client";
import type { PlanDto, PlanStepDto } from "@/lib/types";

export function serializePlan(
  plan: Plan & { steps: Step[] },
): PlanDto {
  return {
    id: plan.id,
    title: plan.title,
    taskInput: plan.taskInput,
    deadline: plan.deadline,
    summary: plan.summary,
    focus: plan.focus,
    totalMinutes: plan.totalMinutes,
    status: plan.status,
    createdAt: plan.createdAt.toISOString(),
    steps: plan.steps
      .slice()
      .sort((a, b) => a.stepNo - b.stepNo)
      .map((s) => ({
        id: s.id,
        stepNo: s.stepNo,
        title: s.title,
        how: s.how,
        when: s.when,
        duration: s.duration,
        priority: s.priority as PlanStepDto["priority"],
        done: s.done,
      })),
  };
}

export function completion(plan: Plan & { steps: Step[] }) {
  if (plan.steps.length === 0) return 0;
  const done = plan.steps.filter((s) => s.done).length;
  return Math.round((done / plan.steps.length) * 100);
}
