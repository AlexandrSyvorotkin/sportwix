import React, { useEffect, useState } from 'react';

import PlayoffTooltip from './playoffTooltip/PlayoffTooltip';
import styles from './PlayoffGrid.module.scss'
import TabBtn from '../../ui/Buttons/TabBtn/TabBtn';
import PlayoffStage from './PlayoffStage/PlayoffStage';
import Banner from '../Banner/Banner';
import GridLayout from './GridLayout/GridLayout';
import TorunamentGrid from '../TournamentGrid/TournamentGrid';

interface Team {
	name: string;
	img: string;
	score: string;
	mark: string
}

interface Match {
	team1: Team;
	team2: Team;
}

interface Props {
	// playoffData: {
	// 	"1/16": Match[],
	// 	"1/8": Match[],
	// 	"1/4": Match[],
	// 	"1/2": Match[],
	// 	"final": Match[]
	// }
	// playoffData: any
}

const PlayoffGridSVG: React.FC<Props> = ({  }) => {

	return (
		<div className={styles.playoff_grid}>
			<TorunamentGrid />
			<Banner />
		</div>
	);
};

export default PlayoffGridSVG;
