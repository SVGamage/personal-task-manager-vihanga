import TaskCard from "./task-card";

export default function TaskCardList() {
  return (
    <div className="grid gap-4">
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
      <TaskCard />
    </div>
  );
}
