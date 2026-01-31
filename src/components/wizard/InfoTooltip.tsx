import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InfoTooltipProps {
  content: string;
}

export function InfoTooltip({ content }: InfoTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help inline-block ml-1" />
      </TooltipTrigger>
      <TooltipContent className="max-w-[280px]">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}
