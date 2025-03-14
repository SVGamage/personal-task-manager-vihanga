"use client";
import { formatDateToReadable } from "@/lib/utils";
import { Card } from "./ui/card";
import { CalendarDays, Clock4 } from "lucide-react";
import { TaskWithCategory } from "@/app/types";

import DeleteTaskModal from "./delete-task-modal";
import { toast } from "sonner";
import { deleteTaskCategory } from "@/app/actions/actions";
import { useParams, useSearchParams } from "next/navigation";

interface CategoryTaskCardProps {
  task: TaskWithCategory;
}

export default function CategoryTaskCard({ task }: CategoryTaskCardProps) {
  const searchParams = useSearchParams();
  const params = useParams();
  const categoryName = searchParams.get("name");
  const categoryId = params.id as string;
  const handleDelete = async () => {
    try {
      await deleteTaskCategory(task.id, categoryId);
      toast.success(
        `Task "${task.title}" has been deleted from ${categoryName}`,
        {
          position: "top-right",
        }
      );
    } catch (err) {
      console.error(err);
      toast.error(
        `Failed to delete task "${task.title}" from ${categoryName}`,
        {
          position: "top-right",
        }
      );
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
          <DeleteTaskModal handleDelete={handleDelete} task={task} />
        </div>
      </div>
    </Card>
  );
}
