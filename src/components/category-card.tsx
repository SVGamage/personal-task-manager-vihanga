import { Card } from "./ui/card";

interface CategoryCardProps {
  title: string;
  description: string;
  taskCount: number;
}
export default function CategoryCard({
  title,
  description,
  taskCount,
}: CategoryCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{taskCount}</p>
      </div>
    </Card>
  );
}
