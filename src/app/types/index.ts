import { Action } from "@prisma/client";

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
export type Actions = "CREATED" | "UPDATED" | "DELETED";

export interface GetTasksParams {
  status?: Status;
  sort?: SortField;
  skip?: number;
  take?: number;
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
  userId: string;
  action: Action;
  title: string | null;
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

export type SortField = "dueDate" | "priority" | "createdAt";

export type createTaskCategories = { taskId: string; categoryId: string };
