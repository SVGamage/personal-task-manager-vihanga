import TaskCardList from "@/components/task-card-list";
import NewTaskModal from "@/components/new-task-modal";

import TaskFilters from "@/components/task-filters";
import { getAllTasksWithCategoryNames } from "../actions/actions";
import { SortField, Status, TaskWithCategory } from "../types";

export default async function Tasks({
  searchParams,
}: {
  searchParams: { status: Status; sort: SortField };
}) {
  const status = searchParams.status;
  const sort = searchParams.sort;
  const tasks: TaskWithCategory[] = await getAllTasksWithCategoryNames({
    status,
    sort,
  });

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
