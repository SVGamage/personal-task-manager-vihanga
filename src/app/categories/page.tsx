"use client";

import { useState } from "react";
import { ListTodo, Menu, Plus, Tags } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

export default function Categories() {
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <div className="space-y-2">
      <Link href="/">
        <Button variant="ghost" className="w-full justify-start">
          <ListTodo className="mr-2 h-4 w-4" />
          Tasks
        </Button>
      </Link>
      <Button variant="default" className="w-full justify-start">
        <Tags className="mr-2 h-4 w-4" />
        Categories
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListTodo className="h-6 w-6" />
              <h1 className="text-2xl font-bold">TaskMaster</h1>
            </div>
            <div className="flex items-center gap-2">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] sm:w-[340px]">
                  <SheetHeader>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <SidebarContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Sidebar */}
          <div className="hidden md:col-span-3 md:block">
            <Card className="p-4">
              <SidebarContent />
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-9">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold">Categories</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Category
              </Button>
            </div>

            {/* Category Cards */}
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
        </div>
      </main>
    </div>
  );
}
