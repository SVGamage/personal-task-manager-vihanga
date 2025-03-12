"use client";
import { formatDateToReadable, statusMap } from "@/lib/utils";
import { Card } from "./ui/card";
import { CalendarDays, Clock4 } from "lucide-react";
import { Badge } from "./ui/badge";
import { TaskWithCategory } from "@/app/types";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskCardProps {
  task: TaskWithCategory;
}
export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold text-lg">{task.title}</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {task.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-1 h-4 w-4" />
              {formatDateToReadable(task.dueDate)}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock4 className="mr-1 h-4 w-4" />
              {formatDateToReadable(task.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge>{task.priority}</Badge>
          <Select onValueChange={(value) => console.log(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={statusMap(task.status)} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup defaultValue={task.status}>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="ONGOING">Ongoing</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {task.categories.map((category) => (
          <Badge key={category} variant="secondary">
            {category}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
