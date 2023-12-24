import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip"

interface HintProps {
    label : string,
    children : React.ReactNode,
    asChild ?: boolean,
    side ?: "top" | "left" | "bottom" | "right",
    align ?: "start" | "center" | "end"
}

export const Hint = ({
    label,
    children,
    align,
    asChild,
    side,
} : HintProps) => {
    return (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild={asChild}>
              {children}
            </TooltipTrigger>
            <TooltipContent className="text-black bg-white" side={side} align={align}>
              <p className="font-semibold">
                {label}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
    )
}