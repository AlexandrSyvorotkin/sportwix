import { FC } from "react";
import styles from './GridMatchTooltip.module.scss'
import classNames from "classnames";

interface GridMatchTooltipProps {
    team1: any,
    team2: any,
    visible: boolean,
    tooltipPosition: 'left' | 'right' | 'final'
}

const GridMatchTooltip:FC<GridMatchTooltipProps> = ({team1, team2, visible, tooltipPosition}) => {

    const game_tooltip_styles = classNames({
        [styles.game_tooltip]: !visible,
        [styles.game_tooltip_visible]: visible,
        [styles.left]: tooltipPosition === 'left',
        [styles.right]: tooltipPosition === 'right',
        [styles.final]: tooltipPosition === 'final'
    })

    return (
        <div className={game_tooltip_styles}>
            <div className={styles.tooltip_description}>
                <div className={styles.team_game_info}>
                    <div>{team1.name}</div>
                    <div>{team1.goals} {team1.penalties ? <>({team1.penalties})</> : null }</div>
                </div>
                <div className={styles.team_game_info}>
                    <div>{team2.name}</div>
                    <div>{team2.goals} {team1.penalties ? <>({team2.penalties})</> : null }</div>
                </div>
            </div>
        </div>
    )
}

export default GridMatchTooltip