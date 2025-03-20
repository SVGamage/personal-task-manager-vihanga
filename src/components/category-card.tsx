"use client";
import Link from "next/link";
import { Card } from "./ui/card";
import { CategoryWithTaskCount } from "@/app/types";
import { Badge } from "./ui/badge";
import UpdateCategoryModal from "./update-category-modal";
import { ChevronRight } from "lucide-react";
import { Label } from "./ui/label";
import DeleteTaskModal from "./delete-modal";
import { toast } from "sonner";
import { deleteCategory } from "@/app/actions/actions";

interface CategoryCardProps {
  category: CategoryWithTaskCount;
}
export default function CategoryCard({ category }: CategoryCardProps) {
  const handleDelete = async () => {
    try {
      await deleteCategory(category.id);
      toast.success(`Category "${category.name}" has been deleted`, {
        position: "top-right",
      });
    } catch (err) {
      console.error(err);
      toast.error(`Failed to delete task "${category.name}"`, {
        position: "top-right",
      });
    }
  };
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{category.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {category.description}
          </p>
        </div>
        <div className="flex gap-2">
          <UpdateCategoryModal category={category} />
          <DeleteTaskModal
            handleDelete={handleDelete}
            type="category"
            name={category.name}
          />
        </div>
      </div>
      <div className="mt-4">
        <Link href={`/categories/${category.id}?name=${category.name}`}>
          <Badge variant="secondary">
            <div className="flex items-center justify-center gap-1 ">
              <Label className="text-xs">
                {category._count.TaskCategory} Tasks
              </Label>{" "}
              <ChevronRight size={16} />
            </div>
          </Badge>
        </Link>
      </div>
    </Card>
  );
}
