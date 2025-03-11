import TaskCardList from "@/components/task-card-list";
import { Button } from "@/components/ui/button";

export default function Category() {
  return (
    <div className="md:col-span-9">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">{`Category Name > Tasks`}</h2>
        <div className="flex items-center gap-2">
          <Button>Add Task</Button>
        </div>
      </div>

      {/* Task Cards */}
      <TaskCardList />
    </div>
  );
}
