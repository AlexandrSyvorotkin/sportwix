
import { Separator } from '@shared/separator'
import { TeamParameterBar } from '@shared/team-parameter-bar'
import { getTeamParameterBarBackgound, getTeamParameterBarPercent } from '@shared/lib/helpers'
import { TooltipTrigger, Tooltip, TooltipProvider, TooltipContent } from '@shared/tooltip'

type title = {
    ru: string,
    eng: string,
    ru_tip: string,
    eng_tip: string
}
interface TeamPerameterProps {
    first_selected_param?: number,
    second_selected_param?: number,
    visible: boolean,
    type: number,
    title: title,
    setFirstSelectedTeamParams?: (params: unknown) => void,
    setSecondSelectedTeamMetrics?: (metrics: unknown) => void
}

const TeamStatParameter = ({ first_selected_param, second_selected_param, visible, type, title }: TeamPerameterProps) => {

    if (!visible) {
        return null
    }


    return (
        <div className='w-full'>
            <div className="min-h-[30px] w-full flex">
                <div className='flex w-1/3'>
                    <TeamParameterBar
                        percent={getTeamParameterBarPercent(first_selected_param, second_selected_param, true)}
                        background={getTeamParameterBarBackgound(first_selected_param, second_selected_param, type)}
                    />
                    <Separator className='w-[1px] h-full' />
                </div>
                <div className="flex w-[40%] text-center justify-between h-[60px]">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className='flex w-full h-full'>
                                <div className="py-[19px] px-3 flex justify-center items-center font-normal text-sm leading-4 text-white w-1/3 cursor-pointer sm:py-[19px] sm:px-3 py-[10px] px-[10px]">
                                    {first_selected_param?.toFixed(1)}
                                </div>
                                <div className="py-[19px] px-3 flex justify-center items-center font-normal text-sm leading-4 text-white w-1/3 relative cursor-pointer sm:py-[19px] sm:px-3 py-[10px] px-[10px]">
                                    {title.ru}
                                </div>
                                <div className="py-[19px] px-3 flex justify-center items-center font-normal text-sm leading-4 text-white w-1/3 cursor-pointer sm:py-[19px] sm:px-3 py-[10px] px-[10px]">
                                    {second_selected_param?.toFixed(1)}
                                </div>
                            </TooltipTrigger>
                            {title.ru_tip.length > 0 && <TooltipContent>{title.ru_tip}</TooltipContent>}
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <Separator className='w-[1px] h-full' />
                <div className='flex w-1/3'>
                    <Separator className='w-[1px] h-full' />
                    <TeamParameterBar
                        percent={getTeamParameterBarPercent(first_selected_param, second_selected_param, false)}
                        background={getTeamParameterBarBackgound(second_selected_param, first_selected_param, type)}
                    />

                </div>
            </div>
            <Separator className='w-full h-[1px]' />
        </div>
    )
}

export { TeamStatParameter }