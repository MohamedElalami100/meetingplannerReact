import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface FiltersSectionProps {
  onSearch: (meetingType: string, capacity: number, date: Date) => void;
}

export default function FiltersSection({ onSearch }: FiltersSectionProps) {
  const [meetingType, setMeetingType] = useState("");
  const [capacity, setCapacity] = useState(1);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSearch = () => {
    if (date) {
      onSearch(meetingType, capacity, date);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Select onValueChange={(value) => setMeetingType(value)}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Meeting Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Conference">Conference</SelectItem>
          <SelectItem value="Training">Training</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="number"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(parseInt(e.target.value, 10))}
        min={1}
        className="w-full md:w-[120px]"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:w-[180px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button onClick={handleSearch} className="w-full md:w-auto">
        Search
      </Button>
    </div>
  );
}
