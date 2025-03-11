"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  ListTodo,
  Menu,
  PlayCircle,
  Tags,
  History,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Status } from "./types";
import TaskCardList from "@/components/task-card-list";

export default function Home() {
  const [selectedStatus, setSelectedStatus] = useState<Status>(Status.PENDING);
  const [open, setOpen] = useState(false);

  const StatusButtons = () => (
    <nav className="space-y-2">
      <Button
        variant={selectedStatus === Status.PENDING ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setSelectedStatus(Status.PENDING);
          setOpen(false);
        }}
      >
        <Circle className="mr-2 h-4 w-4" />
        Pending
      </Button>
      <Button
        variant={selectedStatus === Status.ONGOING ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setSelectedStatus(Status.ONGOING);
          setOpen(false);
        }}
      >
        <PlayCircle className="mr-2 h-4 w-4" />
        Ongoing
      </Button>
      <Button
        variant={selectedStatus === Status.COMPLETED ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => {
          setSelectedStatus(Status.COMPLETED);
          setOpen(false);
        }}
      >
        <CheckCircle2 className="mr-2 h-4 w-4" />
        Completed
      </Button>
    </nav>
  );

  const Categories = () => (
    <div className="mt-8">
      <h2 className="mb-4 font-semibold">Categories</h2>
      <div className="flex flex-col gap-2">
        <Link href="/categories">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setOpen(false)}
          >
            <Tags className="mr-2 h-4 w-4" />
            All Categories
          </Button>
        </Link>
        <Link href="/logs">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setOpen(false)}
          >
            <History className="mr-2 h-4 w-4" />
            Task Logs
          </Button>
        </Link>
      </div>
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
                    <StatusButtons />
                    <Categories />
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
              <StatusButtons />
              <Categories />
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-9">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold">
                {selectedStatus.charAt(0) +
                  selectedStatus.slice(1).toLowerCase()}{" "}
                Tasks
              </h2>
              <div className="flex items-center gap-2">
                <Button>New Task</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Sort By</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Due Date</DropdownMenuItem>
                    <DropdownMenuItem>Priority</DropdownMenuItem>
                    <DropdownMenuItem>Created Date</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Task Cards */}
            <TaskCardList />
          </div>
        </div>
      </main>
    </div>
  );
}
