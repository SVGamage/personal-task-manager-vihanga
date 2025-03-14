import { Badge } from "./ui/badge";

interface CategoryCardProps {
  categories: string[];
}
export default function CategoryGroup({ categories }: CategoryCardProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge key={category} variant="secondary">
          {category}
        </Badge>
      ))}
    </div>
  );
}
