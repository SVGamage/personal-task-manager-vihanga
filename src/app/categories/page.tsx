"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">Work</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Work-related tasks and projects
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">12 tasks</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">Personal</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Personal tasks and errands
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">8 tasks</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">Shopping</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Shopping lists and items to buy
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">5 tasks</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
