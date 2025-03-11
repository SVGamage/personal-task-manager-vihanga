"use client";

import { History } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function TaskLogs() {
  return (
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
              <p className="font-medium">Task status updated to Completed</p>
              <p className="text-sm text-muted-foreground">
                Complete project documentation
              </p>
              <p className="mt-1 text-xs text-muted-foreground">2 hours ago</p>
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
              <p className="mt-1 text-xs text-muted-foreground">5 hours ago</p>
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
              <p className="mt-1 text-xs text-muted-foreground">1 day ago</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
