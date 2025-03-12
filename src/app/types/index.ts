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
  userId: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskLog {
  id: string;
  taskId: string;
  action: string;
  createdAt: Date;
}

export interface TaskWithCategory {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  createdAt: string;
  priority: Priority;
  status: Status;
  categories: string[];
}

export type CategoryWithTaskCount = Category & {
  _count: { TaskCategory: number };
};
