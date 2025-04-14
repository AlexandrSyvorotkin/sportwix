import { FC, useState } from "react";
import styles from './GridMatch.module.scss'
import classNames from "classnames";
import cup from '../../../assets/teams/UEFA Super Cup 1.svg'
import GridMatchTooltip from "./GridMatchTooltip";

interface GridMatchProps {
    team1: any,
    team2: any,
    final?: boolean,
    tooltipPosition: 'left' | 'right' | 'final',
    setIsTeamHovered: any,
    isRootMatch?: boolean,
    right?: boolean,
    isHalfTournamentGrid?: boolean
}

const GridMatch: FC<GridMatchProps> = ({ team1, team2, final, tooltipPosition, setIsTeamHovered, isRootMatch, right, isHalfTournamentGrid }) => {

    const matchStyles = classNames({
        [styles.match]: !final,
        [styles.final]: final
    })

    

    const [isTooltipVisible, setIsTooltipVisilbe] = useState(false)
    const teamsWrapperFlex = right ? 'row-reverse' : 'row'

    const color = team1.goals > team2.goals ? 'green' : 'red'

    return (
        <div className={styles.final_wrapper}>
            {final ?
                <div className={styles.cup_wrapper}>
                    <img src={cup} alt="" />
                </div>
                : null}
            <div className={styles.teams_wrapper} style={{flexDirection: teamsWrapperFlex}}>
                {isRootMatch ?
                    <div className={styles.teams_marks} style={{zIndex: 1}}>
                        <div>
                            {team1.mark}
                        </div>
                        <div>
                            {team2.mark}
                        </div>
                    </div>
                    :
                    null
                }
                <div className={matchStyles} onMouseEnter={() => setIsTooltipVisilbe(true)} onMouseLeave={() => setIsTooltipVisilbe(false)}>
                    <div className={styles.team} onMouseEnter={() => setIsTeamHovered(team1.mark)} onMouseLeave={() => setIsTeamHovered('')}>
                        <div className={styles.flag}>
                            <img src={team1.img} />
                        </div>
                    </div>
                    <div className={styles.team} onMouseEnter={() => setIsTeamHovered(team2.mark)} onMouseLeave={() => setIsTeamHovered('')} >
                        <div className={styles.flag}>
                            <img src={team2.img} />
                        </div>
                    </div>
                    <GridMatchTooltip team1={team1} team2={team2} visible={isTooltipVisible} tooltipPosition={tooltipPosition} />
                </div>
                {isHalfTournamentGrid ? 
                    <div className={styles.score}>
                        <div style={{color: team1.goals > team2.goals ? 'green' : 'red'}}>{team1.goals}</div>
                        <div style={{color: team2.goals > team1.goals ? 'green' : 'red'}}>{team2.goals}</div>
                    </div>
                : null    
                }
            </div>
        </div>
    )
}

export default GridMatch

