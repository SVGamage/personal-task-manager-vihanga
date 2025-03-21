import { ArchiveX } from "lucide-react";
import { Label } from "./ui/label";

interface ItemNotFoundProps {
  name: string;
}
export default function ItemNotFound({ name }: ItemNotFoundProps) {
  return (
    <div className="h-full flex flex-col gap-2 justify-center items-center text-gray-400 dark:text-gray-600">
      <ArchiveX size={128} strokeWidth={1} />
      <Label className="text-2xl">{`No ${name} Found`}</Label>
    </div>
  );
}
