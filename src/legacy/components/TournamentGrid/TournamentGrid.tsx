import { FC, useRef, useState } from "react";
import cup from '../../assets/teams/UEFA Super Cup 1.svg'
import styles from './TournamentGrid.module.scss'
import NextMatchLine from "./NextMatchLine/NextMatchLine";
import GridMatch from "./GridMatch/GridMatch";
import MatchesList from "./MatchesList/MatchesList";
import MainBtn from "../../ui/Buttons/MainBtn/MainBtn";
import GridTabItem from "./GridTabItem/GridTabItem";
import FullGrid from "./FullGrid/FullGrid";
import { useAppSelector } from "../../types/hooks";

interface TournamentGridProps {
}

const TournamentGrid: FC<TournamentGridProps> = ({  }) => {

	
	const gridData = useAppSelector(state => state.tournamentSlice.tournament?.grid)
	// console.log(gridData, 'grid redux')

	
	const [curretTab, setCurrentTab] = useState(4)

	const stages = [
		{ id: 1, title: "1/8" },
		{ id: 2, title: "1/4" },
		{ id: 3, title: "1/2" },
		{ id: 4, title: "final" },
		{ id: 5, title: "1/2" },
		{ id: 6, title: "1/4" },
		{ id: 7, title: "1/8" },
	]

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

	const matches = extractMatchesByLevels(gridData.final);


	


	// console.log(matches)
	

	const [gridPart, setGridPart] = useState({
		left: false,
		right: false
	})

	const resetGridHandler = () => {
		setGridPart({ left: false, right: false })
	}


	// console.log(curretTab)


	return (
		<section className={styles.grid_wrapper}>

			{!gridPart.left && !gridPart.right &&
				<>	
					<div className={styles.grid_header}>
						{stages.map(it => <div key={it.id} style={{ backgroundColor: curretTab === it.id ? '#B279FF' : '' }} onClick={() => setCurrentTab(it.id)}>{it.title}</div>)}
					</div>
					<FullGrid visible={curretTab === 4} stages={stages} matches={matches} setCurrentTab={setCurrentTab} currentTab={curretTab} setGridPart={setGridPart} gridPart={gridPart} resetGridHandler={resetGridHandler}/> 
					<GridTabItem visible={curretTab === 1} matches={matches.roundOf8.slice(0, 4)} />
					<GridTabItem visible={curretTab === 2} matches={matches.quarterfinals.slice(0, 2)} />
					<GridTabItem visible={curretTab === 3} matches={matches.semifinals.slice(0, 1)} />
					<GridTabItem visible={curretTab === 5} matches={matches.semifinals.slice(1, 2)} />
					<GridTabItem visible={curretTab === 6} matches={matches.quarterfinals.slice(2, 4)} />
					<GridTabItem visible={curretTab === 7} matches={matches.roundOf8.slice(4, 8)} />
				</>
			}
			{gridPart.left && !gridPart.right &&
				<>
					<div className={styles.grid_header}>
						{stages.slice(0, 4).map(it => <div key={it.id} style={{ backgroundColor: curretTab === it.id ? '#B279FF' : '' }} onClick={() => setCurrentTab(it.id)}>{it.title}</div>)}
					</div>
					<FullGrid visible={curretTab === 4} stages={stages} matches={matches} setCurrentTab={setCurrentTab} currentTab={curretTab} setGridPart={setGridPart} gridPart={gridPart} resetGridHandler={resetGridHandler}/>
					<GridTabItem visible={curretTab === 1} matches={matches.roundOf8.slice(0, 4)} />
					<GridTabItem visible={curretTab === 2} matches={matches.quarterfinals.slice(0, 2)} />
					<GridTabItem visible={curretTab === 3} matches={matches.semifinals.slice(0, 1)} /> 
				</>
			}
			{!gridPart.left && gridPart.right &&
				<>
					<div className={styles.grid_header}>
						{stages.slice(3, 7).map(it => <div key={it.id} style={{ backgroundColor: curretTab === it.id ? '#B279FF' : '' }} onClick={() => setCurrentTab(it.id)}>{it.title}</div>)}
					</div>
					<FullGrid visible={curretTab === 4} stages={stages} matches={matches} setCurrentTab={setCurrentTab} currentTab={curretTab} setGridPart={setGridPart} gridPart={gridPart} resetGridHandler={resetGridHandler}/>
					<GridTabItem visible={curretTab === 5} matches={matches.semifinals.slice(1, 2)} />
					<GridTabItem visible={curretTab === 6} matches={matches.quarterfinals.slice(2, 4)} />
					<GridTabItem visible={curretTab === 7} matches={matches.roundOf8.slice(4, 8)} /> 
				</>

			}
		</section>

	)
}

export default TournamentGrid
