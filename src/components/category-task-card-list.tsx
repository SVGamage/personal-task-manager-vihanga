import { TaskWithCategory } from "@/app/types";
import CategoryTaskCard from "./category-task-card";

interface CategoryTaskCardListProps {
  tasks: TaskWithCategory[];
}
export default async function TaskCardList({
  tasks,
}: CategoryTaskCardListProps) {
  return (
    <div className="grid gap-4">
      {tasks.map((task) => {
        return <CategoryTaskCard key={task.id} task={task} />;
      })}
    </div>
  );
}
