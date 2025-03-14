"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, ListTodo, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SideBar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      <Link href="/">
        <Button
          variant={pathname === "/" ? "default" : "ghost"}
          className="w-full justify-start"
        >
          <ListTodo className="mr-2 h-4 w-4" />
          Tasks
        </Button>
      </Link>
      <Link href="/categories">
        <Button
          variant={pathname === "/categories" ? "default" : "ghost"}
          className="w-full justify-start"
        >
          <Tags className="mr-2 h-4 w-4" />
          Categories
        </Button>
      </Link>
      <Link href="/logs">
        <Button
          variant={pathname === "/logs" ? "default" : "ghost"}
          className="w-full justify-start"
        >
          <History className="mr-2 h-4 w-4" />
          Task Logs
        </Button>
      </Link>
    </div>
  );
}
