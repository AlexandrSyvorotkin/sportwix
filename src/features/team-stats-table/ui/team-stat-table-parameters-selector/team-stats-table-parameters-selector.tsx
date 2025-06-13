import { Popover, PopoverTrigger, PopoverContent } from "@shared/ui/popover"

export const TeamStatTableParametersSelector = ({
	items, 
	renderCustomSettings,
	onMetricToggle
}: 
{
	items: {id: number, name: string, isActive: boolean}[],
	renderCustomSettings?:  React.ReactNode,
	onMetricToggle: (metricName: string) => void
}) => {
	return (
		<Popover>
			<PopoverTrigger className="w-full h-full px-4 py-1.5 flex items-start">
				Параметры
			</PopoverTrigger>
			<PopoverContent 
				className="w-[var(--radix-popover-trigger-width)] bg-[#111] h-full px-4 py-1.5 flex flex-col items-start p-0 h-[300px] overflow-y-auto"
				align="start"
				sideOffset={5}
			>
				{renderCustomSettings}
				{items.map(item => (
					<div key={item.id} className="w-full px-4 py-1.5 hover:bg-gray-100 text-white hover:text-black cursor-pointer flex items-center gap-2"
					onClick={() => onMetricToggle(item.name)}>
						<input 
							type="checkbox" 
							checked={item.isActive}
						/>
						<span>{item.name}</span>
					</div>
				))}
			</PopoverContent>
		</Popover>
	)
}