"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type Option = {
  id: string;
  title: string;
};

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiSelectDropdown({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  emptyMessage = "No options found.",
  className,
  disabled = false,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (value: string) => {
    onChange(selected.filter((item) => item !== value));
  };

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex min-h-10 w-full flex-wrap items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
        >
          <div className="flex flex-wrap gap-1">
            {selected.length > 0 ? (
              selected.map((value) => {
                const option = options.find((option) => option.id === value);
                return (
                  <Badge
                    key={value}
                    variant="secondary"
                    className="flex items-center gap-1 px-2"
                  >
                    {option?.title}
                    <button
                      type="button"
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnselect(value);
                      }}
                      disabled={disabled}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {option?.title}</span>
                    </button>
                  </Badge>
                );
              })
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search options..." />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => {
                const isSelected = selected.includes(option.id);
                return (
                  <CommandItem
                    key={option.id}
                    value={option.id}
                    onSelect={() => handleSelect(option.id)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50"
                      )}
                    >
                      {isSelected && (
                        <span className="h-2 w-2 bg-current rounded-sm" />
                      )}
                    </div>
                    <span>{option.title}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
