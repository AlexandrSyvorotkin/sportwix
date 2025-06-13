import type { JSX } from "react"

const CentralCircle = () => <div className="absolute w-[250px] h-[250px] border-2 border-white opacity-50 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10" />

const CentralLine = () => <div className="absolute w-full h-0.5 bg-white opacity-50 top-1/2 left-0 right-0 mx-auto z-10" />

interface CornerProps {
	side: 'left' | 'right'
}

const Corner = ({ side }: CornerProps) => <div
	className="w-10 h-10"
	style={{
		borderBottom: "2px solid white",
		borderRight: side === 'left' ? "2px solid white" : "none",
		borderLeft: side === 'right' ? "2px solid white" : "none",
		borderRadius: side === 'left' ? '0 0 100%' : '0 100% 0'
	}}
/>

const PenaltyArea = () => <div className="w-[260px] h-[100px] border border-white border-t-0 z-10 relative">
	<div
		className="absolute top-[100px] left-1/2 w-[60px] h-5 border-b border-l border-r border-white transform -translate-x-1/2"
		style={{
			borderBottomLeftRadius: '30px',
			borderBottomRightRadius: '30px'
		}}
	/>
</div>


const Field = () => {
	return <div className="w-[600px] h-[800px] border border-gray-400 bg-green-600 relative">
		<CentralCircle />
		<CentralLine />
		<div className="absolute top-0 left-0 flex w-full justify-between z-10">
			<Corner side="left" />
			<PenaltyArea />
			<Corner side="right" />
		</div>
		<div className="absolute bottom-0 left-0 flex w-full justify-between z-10 transform rotate-180">
			<Corner side="left" />
			<PenaltyArea />
			<Corner side="right" />
		</div>
	</div>
}

export { Field }
