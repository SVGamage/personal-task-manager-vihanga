"use client";

import CategoryCardList from "@/components/category-card-list";
import NewCategoryModal from "@/components/new-category-modal";

export default function Categories() {
  return (
    <div className="md:col-span-9">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Categories</h2>
        <NewCategoryModal />
      </div>
      <CategoryCardList />
    </div>
  );
}
