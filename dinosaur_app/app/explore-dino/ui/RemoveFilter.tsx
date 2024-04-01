"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FilterX } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
const RemoveFilter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    const keys = Array.from(params.keys());
    keys.forEach((key) => params.delete(key));

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="text-orange-600"
            onClick={handleClick}
          >
            <FilterX />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Remove filters</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RemoveFilter;
