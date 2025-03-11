import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CalendarDays, Clock4 } from "lucide-react";

interface TaskCardProps {
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
}
export default function TaskCard({
  title,
  description,
  dueDate,
  createdAt,
}: TaskCardProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-1 h-4 w-4" />
              {dueDate}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock4 className="mr-1 h-4 w-4" />
              {createdAt}
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="shrink-0">
          Mark as Ongoing
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="secondary" size="sm">
          Work
        </Button>
        <Button variant="secondary" size="sm">
          Priority
        </Button>
      </div>
    </Card>
  );
}
