"use client";

import { useState } from "react";
import { History, ListTodo, Menu, Tags } from "lucide-react";
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

export default function TaskLogs() {
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <div className="space-y-2">
      <Link href="/">
        <Button variant="ghost" className="w-full justify-start">
          <ListTodo className="mr-2 h-4 w-4" />
          Tasks
        </Button>
      </Link>
      <Link href="/categories">
        <Button variant="ghost" className="w-full justify-start">
          <Tags className="mr-2 h-4 w-4" />
          Categories
        </Button>
      </Link>
      <Button variant="default" className="w-full justify-start">
        <History className="mr-2 h-4 w-4" />
        Task Logs
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
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Task Activity Logs</h2>
            </div>

            {/* Logs List */}
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <History className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      Task status updated to Completed
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Complete project documentation
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      2 hours ago
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <History className="h-4 w-4 text-green-600 dark:text-green-300" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">New task created</p>
                    <p className="text-sm text-muted-foreground">
                      Review pull requests
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      5 hours ago
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                    <History className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Task priority changed to High</p>
                    <p className="text-sm text-muted-foreground">
                      Fix critical bug in production
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      1 day ago
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
