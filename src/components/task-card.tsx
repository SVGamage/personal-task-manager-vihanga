"use client";
import { formatDateToReadable, priorityMap, statusMap } from "@/lib/utils";
import { Card } from "./ui/card";
import { CalendarDays, Clock4 } from "lucide-react";
import { TaskWithCategory } from "@/app/types";

import UpdateTaskModal from "./update-task-modal";
import CategoryGroup from "./category-group";
import SelectMenu from "./select-menu";
import DeleteTaskModal from "./delete-task-modal";

interface TaskCardProps {
  task: TaskWithCategory;
}

const selectStatusGroup = [
  { value: "PENDING", label: "Pending" },
  { value: "ONGOING", label: "Ongoing" },
  { value: "COMPLETED", label: "Completed" },
];

const selectPriorityGroup = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
];
export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold text-lg">{task.title}</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {task.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-1 h-4 w-4" />
              Due on {formatDateToReadable(task.dueDate)}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock4 className="mr-1 h-4 w-4" />
              Created on {formatDateToReadable(task.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <SelectMenu
            defaultValue={task.priority}
            placeholder={priorityMap(task.priority)}
            selectGroup={selectPriorityGroup}
            onValueChange={(value) => {
              console.log(value);
            }}
            className="w-[100px] font-semibold"
          />
          <SelectMenu
            defaultValue={task.status}
            placeholder={statusMap(task.status)}
            selectGroup={selectStatusGroup}
            onValueChange={(value) => {
              console.log(value);
            }}
            className="w-[100px] font-semibold"
          />
          <div className="flex gap-2">
            <UpdateTaskModal task={task} />
            <DeleteTaskModal task={task} />
          </div>
        </div>
      </div>
      <CategoryGroup categories={task.categories} />
    </Card>
  );
}
