import { Card } from "./ui/card";

export default function CategoryCard() {
  return (
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
  );
}
