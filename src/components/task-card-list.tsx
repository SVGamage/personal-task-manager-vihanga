import { TaskWithCategory } from "@/app/types";
import TaskCard from "./task-card";
import ItemNotFound from "./item-not-found";

interface TaskCardListProps {
  tasks: TaskWithCategory[];
}
export default async function TaskCardList({ tasks }: TaskCardListProps) {
  return (
    <>
      {tasks.length > 0 ? (
        <div className="grid gap-4">
          {tasks.map((task) => {
            return <TaskCard key={task.id} task={task} />;
          })}
        </div>
      ) : (
        <ItemNotFound name="Tasks" />
      )}
    </>
  );
}
