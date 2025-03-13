import LogCardList from "@/components/log-card-list";
import { getAllTaskLogs } from "../actions/actions";
import { TaskLog } from "../types";

export default async function TaskLogs() {
  const taskLogs: TaskLog[] = await getAllTaskLogs();

  return (
    <div className="md:col-span-9">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Task Activity Logs</h2>
      </div>
      <LogCardList taskLogs={taskLogs} />
    </div>
  );
}
