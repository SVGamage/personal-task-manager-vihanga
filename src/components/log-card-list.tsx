import { TaskLog } from "@/app/types";
import LogCard from "./log-card";
import ItemNotFound from "./item-not-found";

interface LogCardProps {
  taskLogs: TaskLog[];
}
export default function LogCardList({ taskLogs }: LogCardProps) {
  return (
    <>
      {taskLogs.length > 0 ? (
        <div className="space-y-4">
          {taskLogs.map((log) => {
            return <LogCard key={log.id} taskLog={log} />;
          })}
        </div>
      ) : (
        <ItemNotFound name="Logs" />
      )}
    </>
  );
}
