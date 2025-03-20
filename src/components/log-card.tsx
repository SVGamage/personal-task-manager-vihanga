"use client";
import { TaskLog } from "@/app/types";
import { Card } from "./ui/card";
import { History } from "lucide-react";
import { timeAgo } from "@/lib/utils";
import DeleteModal from "./delete-modal";
import { toast } from "sonner";
import { deleteTaskLog } from "@/app/actions/actions";

interface LogCardProps {
  taskLog: TaskLog;
}
export default function LogCard({ taskLog }: LogCardProps) {
  const handleDelete = async () => {
    try {
      await deleteTaskLog(taskLog.id);
      toast.success(`Task log has been deleted`, {
        position: "top-right",
      });
    } catch (err) {
      console.error(err);
      toast.error(`Failed to delete task log`, {
        position: "top-right",
      });
    }
  };
  return (
    <Card className="flex justify-between p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
          <History className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-lg">{taskLog.title}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {timeAgo(taskLog.createdAt)}
          </p>
        </div>
      </div>

      <DeleteModal
        handleDelete={handleDelete}
        type="log"
        name={taskLog.title ?? ""}
      />
    </Card>
  );
}
