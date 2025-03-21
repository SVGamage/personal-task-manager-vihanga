import { TaskWithCategory } from "@/app/types";
import CategoryTaskCard from "./category-task-card";
import ItemNotFound from "./item-not-found";

interface CategoryTaskCardListProps {
  tasks: TaskWithCategory[];
}
export default async function TaskCardList({
  tasks,
}: CategoryTaskCardListProps) {
  return (
    <>
      {tasks.length > 0 ? (
        <div className="grid gap-4">
          {tasks.map((task) => {
            return <CategoryTaskCard key={task.id} task={task} />;
          })}
        </div>
      ) : (
        <ItemNotFound name="Tasks" />
      )}
    </>
  );
}
