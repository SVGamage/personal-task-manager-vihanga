"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TaskWithCategory } from "@/app/types";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteTaskModalProps {
  task: TaskWithCategory;
}

export default function DeleteTaskModal({ task }: DeleteTaskModalProps) {
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    console.log("Deleting task", task.id);
    setOpen(false);
    toast.success(`Task "${task.title}" has been deleted`, {
      position: "top-right",
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {
          <Button variant="destructive">
            <Trash2 />
          </Button>
        }
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`This action cannot be undone. This will permanently delete the task
            ${task.title} and remove it from our servers.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
