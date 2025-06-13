import { Popover, PopoverContent, PopoverTrigger } from "@shared/ui/popover"

const CandleChartFilter = ({
	trigger,
	content
}: {
	trigger: React.ReactNode,
	content: React.ReactNode
}) => {
	return (
		<Popover>
			<PopoverTrigger className='relative'>
				{trigger}
			</PopoverTrigger>
			<PopoverContent className='absolute top-[-40px] right-6 w-[200px] h-[250px] bg-[#111111] rounded-lg'>
				{content}
			</PopoverContent>
		</Popover>
	)
}

export { CandleChartFilter }