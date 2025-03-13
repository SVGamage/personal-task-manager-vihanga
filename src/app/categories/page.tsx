import CategoryCardList from "@/components/category-card-list";
import NewCategoryModal from "@/components/new-category-modal";
import { getAllCategories } from "../actions/actions";

export default async function Categories() {
  const categories = await getAllCategories();
  return (
    <div className="md:col-span-9">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Categories</h2>
        <NewCategoryModal />
      </div>
      <CategoryCardList categories={categories} />
    </div>
  );
}
