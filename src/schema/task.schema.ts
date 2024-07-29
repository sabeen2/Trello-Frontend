export enum TaskStatus {
  TODO = "todo",
  UNDER_REVIEW = "under-review",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  URGENT = "urgent",
}

export interface ITaskInterface {
  _id: string;
  title: string;
  status: TaskStatus;
  user: string;
  description: string;
  priority: TaskPriority;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  deadline?: string;
  time?: string;
}
