import { HelpCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InfoTooltipProps {
  content: string;
}

export function InfoTooltip({ content }: InfoTooltipProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="inline-flex items-center">
          <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help ml-1" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[280px] text-sm">
        <p>{content}</p>
      </PopoverContent>
    </Popover>
  );
}
