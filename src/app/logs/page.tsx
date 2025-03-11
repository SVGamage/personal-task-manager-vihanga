"use client";

import LogCardList from "@/components/log-card-list";

export default function TaskLogs() {
  return (
    <div className="md:col-span-9">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Task Activity Logs</h2>
      </div>
      <LogCardList />
    </div>
  );
}
