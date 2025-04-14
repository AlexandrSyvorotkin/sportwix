import {FC, useState} from 'react'
import styles from './GridLayout.module.scss'
import { createNull } from 'typescript/lib/tsserverlibrary'
import { handleMouseMove } from '../../../Charts/NewCandleChart/candleChartUtils/eventHandlers/eventHandlers'
import { playoffData } from '../data'
import cup from '../../../assets/teams/UEFA Super Cup 1.svg'

interface GridLayoutProps {
    visible: boolean,
    playoffData: any
}

const GridLayout:FC<GridLayoutProps> = ({visible, playoffData}) => {

	

    // const [svgWidth] = useState(1200)
	// const [svgHeight] = useState(800)

	//@ts-ignore
	function extractMatchesByLevels(node, level = 'final', matches = { final: [], semifinals: [], quarterfinals: [], roundOf8: [], roundOf16: [] }) {
		if (node.match) {
			//@ts-ignore
			matches[level].push(node.match);
		}

		for (let key in node) {
			if (Array.isArray(node[key])) {
				//@ts-ignore
				let nextLevel;
				switch (key) {
					case 'semifinals':
						nextLevel = 'semifinals';
						break;
					case 'quarterfinals':
						nextLevel = 'quarterfinals';
						break;
					case 'roundOf8':
						nextLevel = 'roundOf8';
						break;
					case 'roundOf16':
						nextLevel = 'roundOf16';
						break;
					default:
						nextLevel = level;
				}
				//@ts-ignore
				node[key].forEach(childNode => extractMatchesByLevels(childNode, nextLevel, matches));
			}
		}

		return matches;
	}

	const matches = extractMatchesByLevels(playoffData.final);
	console.log(matches)

    const [activePart, setActivePart] = useState({
		left: false,
		right: false
	})


	const handleMouseMove = (event: any) => {
		const { clientX, clientY } = event;
		// const isLeft = clientX <= svgWidth / 2;
		// const isRight = clientX >= svgWidth / 2;
		// const isWithinBounds = clientX >= 0 && clientX <= svgWidth && clientY >= 0 && clientY <= svgHeight;

		// if (isLeft && isWithinBounds) {
		// 	setActivePart({ left: true, right: false });
		// } else if (isRight && isWithinBounds) {
		// 	setActivePart({ left: false, right: true });
		// } else {
		// 	setActivePart({ left: false, right: false });
		// }

	};

    const arrayNames = {
		1: ['A1', 'B1'],
		2: ['A2', 'B2'],
		3: ['A3', 'B3'],
		4: ['A4', 'B4'],
		5: ['A5', 'B5'],
		6: ['A6', 'B6'],
		7: ['A7', 'B7'],
		8: ['A8', 'B8'],
		9: ['A1', 'B1', 'A2', 'B2'],
		10: ['A3', 'B3', 'A4', 'B4'],
		11: ['A5', 'B5', 'A6', 'B6'],
		12: ['A7', 'B7', 'A8', 'B8'],
		13: ['A1', 'B1', 'A2', 'B2', 'A3', 'B3', 'A4', 'B4'],
		14: ['A5', 'B5', 'A6', 'B6', 'A7', 'B7', 'A8', 'B8'],
		15: ['A1', 'B1', 'A2', 'B2', 'A3', 'B3', 'A4', 'B4', 'A5', 'B5', 'A6', 'B6', 'A7', 'B7', 'A8', 'B8']
	}

    const [currentLeftTeam, setCurrentLeftTeam] = useState('')
	const [stage, setStage] = useState('')

    function currentTeamAndStage(teamName: string, stage: string, clear: boolean) {
		if (!clear) {
			setStage(stage)
			setCurrentLeftTeam(teamName)
		} else if (clear) {
			setStage('')
			setCurrentLeftTeam('')
		}
	}

    if (!visible) {
        return null
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={1600} height={800}>
				<image href={cup} x={540} y={44} />
				<g>

					{matches.roundOf8.slice(0, 4).map((round: any, roundIndex: number) => (
						<g key={round.round}>
							<g key={`${round.round}-${roundIndex}`} >
								{/* <rect x={130} y={80 + (roundIndex * 160)} style={{position: 'relative'}} width="40" height="70" fill="red" strokeWidth="1" rx='8px' ry='8px' onMouseEnter={() => setIsTooltipVisible(true)} >
								{isTooltipVisible ? <PlayoffTooltip/> : null}
							</rect> */}
								<image href={round.team1.img} x={135} y={75 + (roundIndex * 160) + 14} style={{ cursor: 'pointer' }} width="30" height="30" onMouseEnter={() => currentTeamAndStage(round.team1.mark, '1/8', false)} onMouseLeave={() => currentTeamAndStage(round.team1.mark, '1/8', true)} />
								<image href={round.team2.img} x={135} y={75 + (roundIndex * 160) + 44} style={{ cursor: 'pointer' }} width="30" height="30" onMouseEnter={() => currentTeamAndStage(round.team2.mark, '1/8', false)} onMouseLeave={() => currentTeamAndStage(round.team2.mark, '1/8', true)} />
							</g>
						</g>
					))}

					{matches.quarterfinals.slice(0, 2).map((round: any, roundIndex: number) => (
						<g key={round.round}>
							<g key={`${round.round}-${roundIndex}`}>
								<image href={round.team1.img} x={235} y={150 + (roundIndex * 320) + 14} style={{ cursor: 'pointer' }} width="30" height="30" onMouseEnter={() => currentTeamAndStage(round.team1.mark, '1/4', false)} onMouseLeave={() => currentTeamAndStage(round.team1.mark, '1/4', true)} />
								<image href={round.team2.img} x={235} y={150 + (roundIndex * 320) + 44} style={{ cursor: 'pointer' }} width="30" height="30" onMouseEnter={() => currentTeamAndStage(round.team2.mark, '1/4', false)} onMouseLeave={() => currentTeamAndStage(round.team2.mark, '1/4', true)} />
							</g>
						</g>
					))}

					{matches.semifinals.slice(0, 1).map((round: any, roundIndex: number) => (
						<g key={round.round}>
							<g key={`${round.round}-${roundIndex}`}>
								<image href={round.team1.img} x={335} y={300 + (roundIndex * 80) + 14} style={{ cursor: 'pointer' }} width="30" height="30" onMouseEnter={() => currentTeamAndStage(round.team1.mark, '1/2', false)} onMouseLeave={() => currentTeamAndStage(round.team1.mark, '1/2', true)} />
								<image href={round.team2.img} x={335} y={300 + (roundIndex * 80) + 44} style={{ cursor: 'pointer' }} width="30" height="30" onMouseEnter={() => currentTeamAndStage(round.team2.mark, '1/2', false)} onMouseLeave={() => currentTeamAndStage(round.team2.mark, '1/2', true)} />
							</g>
						</g>
					))}
				//1/16
					<path d="M 70 70 L 90 70 L 90 100 L 110 100" fill="none" stroke={arrayNames[1].includes(currentLeftTeam) ? '#a266f4' : 'grey'} stroke-width="1" />
					<path d="M 70 160 L 90 160 L 90 130 L 110 130" fill="none" stroke={arrayNames[2].includes(currentLeftTeam) ? '#a266f4' : 'grey'} stroke-width="1" />
					<path d="M 70 230 L 90 230 L 90 260 L 110 260" fill="none" stroke={arrayNames[3].includes(currentLeftTeam) ? '#a266f4' : 'grey'} stroke-width="1" />
					<path d="M 70 320 L 90 320 L 90 290 L 110 290" fill="none" stroke={arrayNames[4].includes(currentLeftTeam) ? '#a266f4' : 'grey'} stroke-width="1" />
				//1/8
					<path d="M 70 400 L 90 400 L 90 430 L 110 430" fill="none" stroke={arrayNames[5].includes(currentLeftTeam) ? '#a266f4' : 'grey'} stroke-width="1" />
					<path d="M 70 490 L 90 490 L 90 460 L 110 460" fill="none" stroke={arrayNames[6].includes(currentLeftTeam) ? '#a266f4' : 'grey'} stroke-width="1" />
					<path d="M 70 550 L 90 550 L 90 580 L 110 580" fill="none" stroke={arrayNames[7].includes(currentLeftTeam) ? '#a266f4' : 'grey'} stroke-width="1" />
					<path d="M 70 640 L 90 640 L 90 610 L 110 610" fill="none" stroke={arrayNames[8].includes(currentLeftTeam) ? '#a266f4' : 'grey'} stroke-width="1" />
				//1/4
					<path d="M 180 120 L 200 120 L 200 180 L 220 180" fill="none" stroke={arrayNames[9].includes(currentLeftTeam) && (stage === '1/4' || stage === '1/2' || stage === 'final') ? '#a266f4' : 'grey'} stroke-width="1" />
					<path d="M 180 280 L 200 280 L 200 200 L 220 200" fill="none" stroke={arrayNames[10].includes(currentLeftTeam) && (stage === '1/4' || stage === '1/2' || stage === 'final') ? '#a266f4' : 'grey'} stroke-width="1" />
					<path d="M 180 440 L 200 440 L 200 500 L 220 500" fill="none" stroke={arrayNames[11].includes(currentLeftTeam) && (stage === '1/4' || stage === '1/2' || stage === 'final') ? '#a266f4' : 'grey'} stroke-width="1" />
					<path d="M 180 590 L 200 590 L 200 520 L 220 520" fill="none" stroke={arrayNames[12].includes(currentLeftTeam) && (stage === '1/4' || stage === '1/2' || stage === 'final') ? '#a266f4' : 'grey'} stroke-width="1" />
				//1/2
					<path d="M 270 190 L 290 190 L 290 330 L 310 330" fill="none" stroke={arrayNames[13].includes(currentLeftTeam) && (stage === '1/2' || stage === 'final') ? '#a266f4' : 'grey'} stroke-width="1" />
					<path d="M 270 510 L 290 510 L 290 350 L 310 350" fill="none" stroke={arrayNames[14].includes(currentLeftTeam) && (stage === '1/2' || stage === 'final') ? '#a266f4' : 'grey'} stroke-width="1" />
				</g>

				<g>
					{/* {playoffData["1/16"].slice(8, 16).map((round: any, roundIndex: number) => (
						<g key={round.round}>
							<g key={`${round.round}-${roundIndex}`}>
								<rect x={1135} y={40 + (roundIndex * 80)} width="32" height="68" fill="#181818" strokeWidth="1" rx='8px' ry='8px' />
								<text x={1151} y={25 + (roundIndex * 80) + 34} fontSize="14" fill='white' textAnchor="middle" alignmentBaseline="middle">{round.team1.mark}</text>
								<text x={1151} y={40 + (roundIndex * 80) + 54} fontSize="14" fill='white' textAnchor="middle" alignmentBaseline="middle">{round.team2.mark}</text>
								<image href={round.team1.img} x={1100} y={30 + (roundIndex * 80) + 14} width="30" height="30" />
								<image href={round.team2.img} x={1100} y={30 + (roundIndex * 80) + 44} width="30" height="30" />

							</g>
						</g>
					))} */}
					{matches.roundOf8.slice(4, 8).map((round: any, roundIndex: number) => (
						<g key={round.round}>
							<g key={`${round.round}-${roundIndex}`}>
								<image href={round.team1.img} x={1000} y={75 + (roundIndex * 160) + 14} width="30" height="30" />
								<image href={round.team2.img} x={1000} y={75 + (roundIndex * 160) + 44} width="30" height="30" />
							</g>
						</g>
					))}
					{matches.quarterfinals.slice(2, 4).map((round: any, roundIndex: number) => (
						<g key={round.round}>
							<g key={`${round.round}-${roundIndex}`}>
								<image href={round.team1.img} x={900} y={150 + (roundIndex * 320) + 14} width="30" height="30" />
								<image href={round.team2.img} x={900} y={150 + (roundIndex * 320) + 44} width="30" height="30" />
							</g>
						</g>
					))}
					{matches.semifinals.slice(1, 2).map((round: any, roundIndex: number) => (
						<g key={round.round}>
							<g key={`${round.round}-${roundIndex}`}>
								<image href={round.team1.img} x={800} y={300 + (roundIndex * 80) + 14} width="30" height="30" />
								<image href={round.team2.img} x={800} y={300 + (roundIndex * 80) + 44} width="30" height="30" />
							</g>
						</g>
					))}
					<path d="M 1100 70 L 1080 70 L 1080 100 L 1060 100" fill="none" stroke="grey" stroke-width="1" />
					<path d="M 1100 160 L 1080 160 L 1080 130 L 1060 130" fill="none" stroke="grey" stroke-width="1" />

					<path d="M 1100 230 L 1080 230 L 1080 260 L 1060 260" fill="none" stroke="grey" stroke-width="1" />
					<path d="M 1100 320 L 1080 320 L 1080 290 L 1060 290" fill="none" stroke="grey" stroke-width="1" />

					<path d="M 1100 400 L 1080 400 L 1080 430 L 1060 430" fill="none" stroke="grey" stroke-width="1" />
					<path d="M 1100 490 L 1080 490 L 1080 460 L 1060 460" fill="none" stroke="grey" stroke-width="1" />

					<path d="M 1100 550 L 1080 550 L 1080 580 L 1060 580" fill="none" stroke="grey" stroke-width="1" />
					<path d="M 1100 640 L 1080 640 L 1080 610 L 1060 610" fill="none" stroke="grey" stroke-width="1" />
					<path d="M 1000 120 L 980 120 L 980 180 L 960 180" fill="none" stroke="grey" stroke-width="1" />
					<path d="M 1000 280 L 980 280 L 980 200 L 960 200" fill="none" stroke="grey" stroke-width="1" />

					<path d="M 1000 440 L 980 440 L 980 500 L 960 500" fill="none" stroke="grey" stroke-width="1" />
					<path d="M 1000 590 L 980 590 L 980 520 L 960 520" fill="none" stroke="grey" stroke-width="1" />
					<path d="M 900 190 L 880 190 L 880 330 L 860 330" fill="none" stroke="grey" stroke-width="1" />
					<path d="M 900 510 L 880 510 L 880 350 L 860 350" fill="none" stroke="grey" stroke-width="1" />
				</g>

				<path d="M 370 340 L 430 340 L 430 235 L 490 235" fill="none" stroke={arrayNames[15].includes(currentLeftTeam) && stage === 'final' ? '#a266f4' : 'grey'} stroke-width="1" />
				{matches.final.map((round: any, roundIndex: number) => (
					<g key={round.round}>
						<g key={`${round.round}-${roundIndex}`}>
							<image href={round.team1.img} x={500} y={200 + (roundIndex * 80) + 14} width="30" height="30" onMouseEnter={() => currentTeamAndStage(round.team1.mark, 'final', false)} onMouseLeave={() => currentTeamAndStage(round.team1.mark, 'final', true)} />
							<image href={round.team2.img} x={650} y={200 + (roundIndex * 80) + 14} width="30" height="30" onMouseEnter={() => currentTeamAndStage(round.team2.mark, 'final', false)} onMouseLeave={() => currentTeamAndStage(round.team2.mark, 'final', true)} />
						</g>
					</g>
				))}
		</svg>
    )
}

export default GridLayout