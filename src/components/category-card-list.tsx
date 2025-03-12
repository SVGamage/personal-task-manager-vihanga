import { CategoryWithTaskCount } from "@/app/types";
import CategoryCard from "./category-card";

interface CategoryCardListProps {
  categories: CategoryWithTaskCount[];
}
export default function CategoryCardList({
  categories,
}: CategoryCardListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => {
        return <CategoryCard key={category.id} category={category} />;
      })}
    </div>
  );
}
