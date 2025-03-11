import Link from "next/link";
import { Card } from "./ui/card";

interface CategoryCardProps {
  id: number;
  title: string;
  description: string;
  taskCount: number;
}
export default function CategoryCard({
  id,
  title,
  description,
  taskCount,
}: CategoryCardProps) {
  return (
    <Link href={`/categories/${id}`}>
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
    </Link>
  );
}
