import { TaskWithCategory } from "@/app/types";
import TaskCard from "./task-card";

interface TaskCardListProps {
  tasks: TaskWithCategory[];
}
export default async function TaskCardList({ tasks }: TaskCardListProps) {
  return (
    <div className="grid gap-4">
      {tasks.map((task) => {
        return <TaskCard key={task.id} task={task} />;
      })}
    </div>
  );
}
