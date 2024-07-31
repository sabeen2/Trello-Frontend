export enum TaskStatus {
  TODO = "To-Do",
  UNDER_REVIEW = "Under Review",
  IN_PROGRESS = "In Progress",
  DONE = "Completed",
}

export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  URGENT = "Urgent",
}

export interface ITaskInterface {
  taskId?: string;
  _id?: string | any;
  title?: string;
  status?: TaskStatus;
  user?: string;
  description?: string;
  priority?: TaskPriority;
  createdAt?: string;
  updatedAt?: string;
  deadline?: string;
  time?: string;
}
