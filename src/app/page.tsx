import TaskCardList from "@/components/task-card-list";
import NewTaskModal from "@/components/new-task-modal";
import { getAllTasksWithCategoryNames } from "./actions/actions";
import { TaskWithCategory } from "./types";
import TaskFilters from "@/components/task-filters";

export default async function Home() {
  const tasks: TaskWithCategory[] = await getAllTasksWithCategoryNames();

  return (
    <div className="md:col-span-9">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <div className="flex items-center gap-2">
          <TaskFilters />
          <NewTaskModal />
        </div>
      </div>

      {/* Task Cards */}
      <TaskCardList tasks={tasks} />
    </div>
  );
}
