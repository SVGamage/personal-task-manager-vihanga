import TaskCard from "./task-card";

const taskCardList = [
  {
    id: 1,
    title: "Design a new logo",
    description: "Design a new logo for the website",
    dueDate: "Due on 12th July 2021",
    createdAt: "Created on 5th July 2021",
  },
  {
    id: 2,
    title: "Update the website",
    description: "Update the website with new content",
    dueDate: "Due on 15th July 2021",
    createdAt: "Created on 8th July 2021",
  },
  {
    id: 3,
    title: "Create a new blog post",
    description: "Create a new blog post for the website",
    dueDate: "Due on 20th July 2021",
    createdAt: "Created on 10th July 2021",
  },
  {
    id: 4,
    title: "Update the website",
    description: "Update the website with new content",
    dueDate: "Due on 15th July 2021",
    createdAt: "Created on 8th July 2021",
  },
  {
    id: 5,
    title: "Create a new blog post",
    description: "Create a new blog post for the website",
    dueDate: "Due on 20th July 2021",
    createdAt: "Created on 10th July 2021",
  },
];
export default function TaskCardList() {
  return (
    <div className="grid gap-4">
      {taskCardList.map((task) => {
        return (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            createdAt={task.createdAt}
          />
        );
      })}
    </div>
  );
}
