import { CategoryWithTaskCount } from "@/app/types";
import CategoryCard from "./category-card";
import ItemNotFound from "./item-not-found";

interface CategoryCardListProps {
  categories: CategoryWithTaskCount[];
}
export default function CategoryCardList({
  categories,
}: CategoryCardListProps) {
  return (
    <>
      {categories.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            return <CategoryCard key={category.id} category={category} />;
          })}
        </div>
      ) : (
        <ItemNotFound name="Categories" />
      )}
    </>
  );
}
