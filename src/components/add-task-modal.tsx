"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  MultiSelectDropdown,
  type Option,
} from "@/components/multi-select-dropdown";
import { createTaskCategories } from "@/app/actions/actions";
import { toast } from "sonner";

interface FormData {
  tasks: string[];
}

interface AddTaskModalProps {
  categoryId: string;
  tasks: Option[];
}

export default function AddTaskModal({ categoryId, tasks }: AddTaskModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    tasks: [],
  });

  const handleTasksChange = (selected: string[]) => {
    setFormData((prev) => ({ ...prev, tasks: selected }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newTaskCategories = await createTaskCategories(
        formData.tasks,
        categoryId
      );
      toast("Tasks added to the category successfully!", {
        type: "success",
        position: "top-right",
      });
      setOpen(false);
      setFormData({
        tasks: [],
      });
    } catch (err) {
      toast("Failed to add tasks to the category!", {
        type: "error",
        position: "top-right",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Tasks</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Tasks to the Category</DialogTitle>
            <DialogDescription>{`Select tasks below. Click save when you're done.`}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tasks" className="text-right">
                Tasks
              </Label>
              <div className="col-span-3">
                <MultiSelectDropdown
                  options={tasks}
                  selected={formData.tasks}
                  onChange={handleTasksChange}
                  placeholder="Select tasks..."
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
