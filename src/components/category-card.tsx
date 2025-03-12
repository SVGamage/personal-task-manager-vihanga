import Link from "next/link";
import { Card } from "./ui/card";
import { CategoryWithTaskCount } from "@/app/types";
import { Badge } from "./ui/badge";

interface CategoryCardProps {
  category: CategoryWithTaskCount;
}
export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.id}?name=${category.name}`}>
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{category.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {category.description}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Badge variant="secondary">
            {category._count.TaskCategory} Tasks
          </Badge>
        </div>
      </Card>
    </Link>
  );
}
