import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";

interface DatePickerProps {
  placeholder?: string;
  defaultValue: string;
  className?: string;
  onValueChange?: (date: string) => void;
}

export function DatePicker({
  placeholder = "Pick a date",
  defaultValue,
  className,
  onValueChange,
}: DatePickerProps) {
  console.log(defaultValue);
  const [date, setDate] = React.useState<string>(defaultValue);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date ? "text-muted-foreground" : "",
            className || ""
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={new Date(date)}
          onSelect={(date) => {
            setDate(date ? format(date, "yyyy-MM-dd") : "");
            if (date && onValueChange) {
              onValueChange(format(date, "yyyy-MM-dd"));
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
