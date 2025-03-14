"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SelectMenuProps {
  defaultValue: string;
  placeholder: string;
  selectGroup: { value: string; label: string }[];
  onValueChange: (value: string) => void;
  className?: string;
}
export default function SelectMenu({
  defaultValue,
  placeholder,
  selectGroup,
  onValueChange,
  className,
}: SelectMenuProps) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup defaultValue={defaultValue}>
          {selectGroup.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
