import LogCard from "./log-card";

const logCardList = [
  {
    id: 1,
    title: "Task created",
    description: "Task created by John Doe",
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    title: "Task completed",
    description: "Task completed by John Doe",
    createdAt: "1 hour ago",
  },
  {
    id: 3,
    title: "Task created",
    description: "Task created by John Doe",
    createdAt: "2 hours ago",
  },
  {
    id: 4,
    title: "Task completed",
    description: "Task completed by John Doe",
    createdAt: "1 hour ago",
  },
];
export default function LogCardList() {
  return (
    <div className="space-y-4">
      {logCardList.map((log) => {
        return (
          <LogCard
            key={log.id}
            title={log.title}
            description={log.description}
            createdAt={log.createdAt}
          />
        );
      })}
    </div>
  );
}
