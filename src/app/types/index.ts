export enum Status {
  PENDING = "PENDING",
  ONGOING = "ONGOING",
  COMPLETED = "COMPLETED",
  DELETED = "DELETED",
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  priority: Priority;
  status: Status;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface TaskLog {
  id: string;
  taskId: string;
  action: string;
  createdAt: Date;
}
