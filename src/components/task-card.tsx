import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CalendarDays, Clock4 } from "lucide-react";

export default function TaskCard() {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold">Example Task Title</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            This is an example task description that shows how tasks will be
            displayed.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="mr-1 h-4 w-4" />
              Due Tomorrow
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock4 className="mr-1 h-4 w-4" />2 days ago
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
