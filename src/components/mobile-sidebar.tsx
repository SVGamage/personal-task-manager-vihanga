"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import SideBar from "./sidebar";
import { useState } from "react";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  return (
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
          <SideBar />
        </div>
      </SheetContent>
    </Sheet>
  );
}
