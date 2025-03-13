import { TaskLog } from "@/app/types";
import LogCard from "./log-card";

interface LogCardProps {
  taskLogs: TaskLog[];
}
export default function LogCardList({ taskLogs }: LogCardProps) {
  return (
    <div className="space-y-4">
      {taskLogs.map((log) => {
        return <LogCard key={log.id} taskLog={log} />;
      })}
    </div>
  );
}
