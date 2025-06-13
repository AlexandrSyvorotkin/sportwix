import { Separator } from '@shared/separator'

type ActiveTimeFrame = {
	gametimeframe_1: number,
	gametimeframe_3: number,
	gametimeframe_5: number,
	gametimeframe_10: number,
	gametimeframe_15: number,
	gametimeframe_all: number
}

interface FieldTimesProps {
	activeTimeFrame: ActiveTimeFrame,
	setActiveTimeFrame: React.Dispatch<React.SetStateAction<ActiveTimeFrame>>
}

const FieldTimes = ({ activeTimeFrame, setActiveTimeFrame }: FieldTimesProps) => {

	const times = [
		{ id: 1, time: "1T", active: false },
		{ id: 2, time: "2T", active: false },
		{ id: 3, time: "FT", active: true }
	]

	return (
		<div className='w-[15%] h-full flex'>
			<div className="w-full flex flex-col">
				<div className="h-[20%] w-full p-2.5 text-sm">
					<span>Times</span>
				</div>
				<Separator className='w-full h-[1px]' />
				<div className="h-[80%] flex flex-col justify-between">
					<div className="w-full flex flex-row justify-center items-center h-[20%]">
						{times.map(it =>
							<div key={it.id} className={it.id === activeTimeFrame.gametimeframe_1 ? "bg-gray-900 w-1/3 flex justify-center items-center h-full cursor-pointer" : "w-1/3 flex justify-center items-center h-full cursor-pointer"} onClick={() => setActiveTimeFrame((prevState: ActiveTimeFrame) => ({ ...prevState, gametimeframe_1: it.id }))}>{it.time}</div>
						)}
					</div>
					<div className="w-full flex flex-row justify-center items-center h-[20%]">
						{times.map(it =>
							<div key={it.id} className={it.id === activeTimeFrame.gametimeframe_3 ? "bg-gray-900 w-1/3 flex justify-center items-center h-full cursor-pointer" : "w-1/3 flex justify-center items-center h-full cursor-pointer"} onClick={() => setActiveTimeFrame((prevState: ActiveTimeFrame) => ({ ...prevState, gametimeframe_3: it.id }))}>{it.time}</div>
						)}
					</div>
					<div className="w-full flex flex-row justify-center items-center h-[20%]">
						{times.map(it =>
							<div key={it.id} className={it.id === activeTimeFrame.gametimeframe_5 ? "bg-gray-900 w-1/3 flex justify-center items-center h-full cursor-pointer" : "w-1/3 flex justify-center items-center h-full cursor-pointer"} onClick={() => setActiveTimeFrame((prevState: ActiveTimeFrame) => ({ ...prevState, gametimeframe_5: it.id }))}>{it.time}</div>
						)}
					</div>
					<div className="w-full flex flex-row justify-center items-center h-[20%]">
						{times.map(it =>
							<div key={it.id} className={it.id === activeTimeFrame.gametimeframe_10 ? "bg-gray-900 w-1/3 flex justify-center items-center h-full cursor-pointer" : "w-1/3 flex justify-center items-center h-full cursor-pointer"} onClick={() => setActiveTimeFrame((prevState: ActiveTimeFrame) => ({ ...prevState, gametimeframe_10: it.id }))}>{it.time}</div>
						)}
					</div>
					<div className="w-full flex flex-row justify-center items-center h-[20%]">
						{times.map(it =>
							<div key={it.id} className={it.id === activeTimeFrame.gametimeframe_15 ? "bg-gray-900 w-1/3 flex justify-center items-center h-full cursor-pointer" : "w-1/3 flex justify-center items-center h-full cursor-pointer"} onClick={() => setActiveTimeFrame((prevState: ActiveTimeFrame) => ({ ...prevState, gametimeframe_15: it.id }))}>{it.time}</div>
						)}
					</div>
					<div className="w-full flex flex-row justify-center items-center h-[20%]">
						{times.map(it =>
							<div key={it.id} className={it.id === activeTimeFrame.gametimeframe_all ? "bg-gray-900 w-1/3 flex justify-center items-center h-full cursor-pointer" : "w-1/3 flex justify-center items-center h-full cursor-pointer"} onClick={() => setActiveTimeFrame((prevState: ActiveTimeFrame) => ({ ...prevState, gametimeframe_all: it.id }))}>{it.time}</div>
						)}
					</div>
				</div>
			</div>
			<Separator className='w-[1px] h-full' />
		</div>
	)
}

export { FieldTimes }

