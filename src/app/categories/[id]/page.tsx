import { getAllTasks, getTasksByCategory } from "@/app/actions/actions";
import AddTaskModal from "@/components/add-task-modal";
import CategoryTaskCardList from "@/components/category-task-card-list";

export default async function Category({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { name: string };
}) {
  const categoryId = params.id;
  const categoryName = searchParams.name;
  const tasks = await getAllTasks();
  const tasksForCategory = await getTasksByCategory({
    categoryId,
  });
  return (
    <div className="md:col-span-9">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">{`${categoryName} > Tasks`}</h2>
        <div className="flex items-center gap-2">
          <AddTaskModal categoryId={categoryId} tasks={tasks} />
        </div>
      </div>

      {/* Task Cards */}
      <CategoryTaskCardList tasks={tasksForCategory} />
    </div>
  );
}
