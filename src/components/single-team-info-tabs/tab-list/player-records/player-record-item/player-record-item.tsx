import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shared/tooltip/toopltip';


const PlayerRecordItem = ({ 
    period, 
    record_image, 
    value, 
    description, 
    matches 
}: 
{
    period: string,
    record_image: string,
    value: number,
    description: string,
    matches: number
}) => {

    return (
        <TooltipProvider>
            <Tooltip>
                <div className="flex justify-between w-full">
                    <TooltipTrigger className="w-1/5 cursor-pointer">
                        <div className="w-full p-[10px] text-center">{description}</div>
                    </TooltipTrigger>
                    <div className='w-4/5 flex'>
                        <div className="w-1/4 p-[10px] text-center">
                            <span>Goals</span>
                            <span>{value}</span>
                        </div>
                        <div className="w-1/4 p-[10px] text-center">
                            <span>Matches</span>
                            <span>{matches}</span>
                        </div>
                        <div className="w-1/4 p-[10px] text-center">
                            <span>G/M</span>
                            <span>{(value / matches).toFixed(1)}</span>
                        </div>
                        <div className="w-1/4 p-[10px] text-center">
                            <span>Period</span>
                            <span>{period}</span>
                        </div>
                    </div>
                </div>
                <TooltipContent>
                    <div className="w-full h-full bg-white">
                        <img src={record_image} alt="record" />
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}

export { PlayerRecordItem }
