import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@shared/tooltip'
import React from 'react'

export interface PanelBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode
  isActive: boolean
  tooltipText: string
  tooltipSide: 'top' | 'bottom' | 'left' | 'right' | undefined
}

const PanelBtn = ({ icon, isActive, tooltipText, tooltipSide, ...props }: PanelBtnProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            {...props}
            className={`w-10 h-10 flex items-center justify-center hover:bg-btn-hover rounded disabled:opacity-50 disabled:cursor-not-allowed ${isActive ? 'bg-[#181818]' : ''}`}
          >
            {icon}
          </button>
        </TooltipTrigger>
        {tooltipText && (
          <TooltipContent side={tooltipSide} className="text-[#1F1F1F]">
            <TooltipArrow className="fill-[#FFFFFF]" />
            {tooltipText}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export default PanelBtn
