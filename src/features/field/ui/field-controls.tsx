import { Separator } from "@shared/separator"

const FieildControls = () => {
	return (
		<div className="w-full flex flex-col h-1/5">
			<div className="w-full flex h-full">
				<div className="w-1/3">Защита</div>
				<Separator className="w-[1px] h-full" />
				<div className="w-1/3">Полузащита</div>
				<Separator className="w-[1px] h-full" />
				<div className="w-1/3">Атака</div>
			</div>
			<Separator className="w-full h-[1px]" />
		</div>
	)
}

export { FieildControls }