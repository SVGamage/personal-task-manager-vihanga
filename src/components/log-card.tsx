import { TaskLog } from "@/app/types";
import { Card } from "./ui/card";
import { History } from "lucide-react";
import { timeAgo } from "@/lib/utils";

interface LogCardProps {
  taskLog: TaskLog;
}
export default function LogCard({ taskLog }: LogCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
          <History className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-lg">{taskLog.title}</p>
          <p className="text-sm text-muted-foreground">{taskLog.task.title}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {timeAgo(taskLog.createdAt)}
          </p>
        </div>
      </div>
    </Card>
  );
}
