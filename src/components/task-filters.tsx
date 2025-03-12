import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function TaskFilters() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Status</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Pending</DropdownMenuItem>
          <DropdownMenuItem>Ongoing</DropdownMenuItem>
          <DropdownMenuItem>Completed</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Sort By</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Due Date</DropdownMenuItem>
          <DropdownMenuItem>Priority</DropdownMenuItem>
          <DropdownMenuItem>Created Date</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
