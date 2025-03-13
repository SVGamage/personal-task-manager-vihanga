"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function TaskFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "none") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Status</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={searchParams.get("status") || "none"}
            onValueChange={(value) => updateQueryParams("status", value)}
          >
            <DropdownMenuRadioItem value="none">None</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="PENDING">
              Pending
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ONGOING">
              Ongoing
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="COMPLETED">
              Completed
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Sort By</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={searchParams.get("sort") || "none"}
            onValueChange={(value) => updateQueryParams("sort", value)}
          >
            <DropdownMenuRadioItem value="none">None</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dueDate">
              Due Date
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="priority">
              Priority
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="createdAt">
              Created Date
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
