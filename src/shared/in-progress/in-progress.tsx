import { Tooltip, TooltipTrigger, TooltipProvider, TooltipContent } from '@shared/tooltip/toopltip'

const InProgress = ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="cursor-not-allowed opacity-30 pointer-events-none">{children}</div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-[#0D0C0E]">В разработке</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { InProgress }
