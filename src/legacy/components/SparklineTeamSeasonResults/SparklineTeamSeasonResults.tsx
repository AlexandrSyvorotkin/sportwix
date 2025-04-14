import React, { FC } from 'react'
import styles from './SparklineTeamSeasonResults.module.scss'

interface SparklineTeamSeasonsResultsProps {
    wins: number,
    draws: number,
    losses: number,
    visible: boolean
}

const SparklineTeamSeasonResults: FC<SparklineTeamSeasonsResultsProps> = ({ wins, draws, losses, visible }) => {

    if (!visible) {
        return null
    }

    return (
        <div className={styles.sparkline_team_season_results}>
            <div style={{ color: '#ED392F' }}>Losses: <span style={{ color: 'white' }}>{losses}</span></div>
            <div style={{ color: '#B7A503' }}>Draws: <span style={{ color: 'white' }}>{draws}</span></div>
            <div style={{ color: '#3A751F' }}>Wins: <span style={{ color: 'white' }}>{wins}</span></div>
        </div>

    )
}

export default SparklineTeamSeasonResults