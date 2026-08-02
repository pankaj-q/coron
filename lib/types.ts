export type Priority = "high" | "medium" | "low";

export type PlanStepInput = {
  title: string;
  how: string;
  when: string;
  duration: number;
  priority: Priority;
};

export type GeneratedPlan = {
  title: string;
  summary: string;
  focus: string;
  totalMinutes: number;
  steps: PlanStepInput[];
};

export type PlanStepDto = {
  id: string;
  stepNo: number;
  title: string;
  how: string;
  when: string;
  duration: number;
  priority: Priority;
  done: boolean;
};

export type PlanDto = {
  id: string;
  title: string;
  taskInput: string;
  deadline: string | null;
  summary: string | null;
  focus: string | null;
  totalMinutes: number | null;
  status: string;
  createdAt: string;
  steps: PlanStepDto[];
};
