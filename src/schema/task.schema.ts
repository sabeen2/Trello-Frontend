export enum TaskStatus {
  TODO = "To-Do",
  UNDER_REVIEW = "Under Review",
  IN_PROGRESS = "In Progress",
  DONE = "Completed",
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
