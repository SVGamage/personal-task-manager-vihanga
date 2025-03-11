import CategoryCard from "./category-card";

const categoryCardList = [
  {
    id: 1,
    title: "Development",
    description: "Development related tasks",
    taskCount: 10,
  },
  {
    id: 2,
    title: "Design",
    description: "Design related tasks",
    taskCount: 5,
  },
  {
    id: 3,
    title: "Marketing",
    description: "Marketing related tasks",
    taskCount: 8,
  },
  {
    id: 4,
    title: "Support",
    description: "Support related tasks",
    taskCount: 3,
  },
];
export default function CategoryCardList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categoryCardList.map((category) => {
        return (
          <CategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
            taskCount={category.taskCount}
          />
        );
      })}
    </div>
  );
}
