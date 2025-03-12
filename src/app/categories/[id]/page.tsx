import AddTaskModal from "@/components/add-task-modal";
// import TaskCardList from "@/components/task-card-list";

export default function Category() {
  return (
    <div className="md:col-span-9">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">{`Category Name > Tasks`}</h2>
        <div className="flex items-center gap-2">
          <AddTaskModal />
        </div>
      </div>

      {/* Task Cards */}
      {/* <TaskCardList /> */}
    </div>
  );
}
