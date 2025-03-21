"use client";
import { formatDateToReadable, priorityMap, statusMap } from "@/lib/utils";
import { Card } from "./ui/card";
import { CalendarDays, Clock4 } from "lucide-react";
import { Priority, Status, TaskWithCategory } from "@/app/types";

import UpdateTaskModal from "./update-task-modal";
import CategoryGroup from "./category-group";
import SelectMenu from "./select-menu";
import DeleteModal from "./delete-modal";
import { deleteTask, updateStatusOrPriority } from "@/app/actions/actions";
import { toast } from "sonner";

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
  async function OnValueChange(value: Status | Priority) {
    const valueType = value in Status ? "Status" : "Priority";
    try {
      await updateStatusOrPriority(
        task.id,
        valueType,
        value as Status | Priority
      );
      toast.success(`${valueType} updated successfully`, {
        position: "top-right",
      });
    } catch (err) {
      console.error(err);
      toast.error(`Failed to update ${valueType.toLowerCase()}`, {
        position: "top-right",
      });
    }
  }
  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      toast.success(`Task "${task.title}" has been deleted`, {
        position: "top-right",
      });
    } catch (err) {
      console.error(err);
      toast.error(`Failed to delete task "${task.title}"`, {
        position: "top-right",
      });
    }
  };
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
            onValueChange={OnValueChange}
            className="w-[100px] font-semibold"
          />
          <SelectMenu
            defaultValue={task.status}
            placeholder={statusMap(task.status)}
            selectGroup={selectStatusGroup}
            onValueChange={OnValueChange}
            className="w-[100px] font-semibold"
          />
          <div className="flex gap-2">
            <UpdateTaskModal task={task} />
            <DeleteModal
              handleDelete={handleDelete}
              type="task"
              name={task.title}
            />
          </div>
        </div>
      </div>
      <CategoryGroup categories={task.categories} />
    </Card>
  );
}
