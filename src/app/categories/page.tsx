"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoryCardList from "@/components/category-card-list";

export default function Categories() {
  return (
    <div className="md:col-span-9">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Category
        </Button>
      </div>
      <CategoryCardList />
    </div>
  );
}
