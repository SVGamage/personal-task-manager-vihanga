"use client";

import { Edit2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategoryWithTaskCount } from "@/app/types";
import { useState } from "react";
import { updateCategory } from "@/app/actions/actions";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type UpdateCategoryFormValues = z.infer<typeof formSchema>;
interface UpdateCategoryModalProps {
  category: CategoryWithTaskCount;
}

export default function UpdateCategoryModal({
  category,
}: UpdateCategoryModalProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<UpdateCategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.name,
      description: category.description ?? "",
    },
  });

  async function onSubmit(values: UpdateCategoryFormValues) {
    try {
      await updateCategory(category.id, values);
      toast.success("Category updated successfully", {
        position: "top-right",
      });
      setOpen(false);
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update category", {
        position: "top-right",
      });
    }
  }

  const handleError = () => {
    toast.error("Validation Error", {
      description: "Please check the form fields and try again.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {
          <Button variant="default">
            <Edit2 />
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>
            {`Update Category details. Click save when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, handleError)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter category description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Update Category</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
