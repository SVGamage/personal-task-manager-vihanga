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

const tasks: Option[] = [
  {
    id: "1",
    title: "Design a new logo",
  },
  {
    id: "2",
    title: "Update the website",
  },
  {
    id: "3",
    title: "Create a new blog post",
  },
  {
    id: "4",
    title: "Update the website",
  },
  {
    id: "5",
    title: "Create a new blog post",
  },
];

interface FormData {
  tasks: string[];
}

export default function AddTaskModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    tasks: [],
  });

  const handleTasksChange = (selected: string[]) => {
    setFormData((prev) => ({ ...prev, tasks: selected }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
    setOpen(false);
    setFormData({
      tasks: [],
    });
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
