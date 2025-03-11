import { ListTodo } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListTodo className="h-6 w-6" />
            <h1 className="text-2xl font-bold">TaskMaster</h1>
          </div>
          <div className="flex items-center gap-2">
            <MobileSidebar />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
