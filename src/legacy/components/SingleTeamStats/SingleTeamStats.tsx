import { FC } from 'react'
import styles from './SingleTeamStats.module.scss'
import CustomSelect from '../CustomSelect/CustomSelect'
import { log } from 'console'
import ModalSelect from '../../ui/Selections/ModalSelect/ModalSelect'

interface SingleTeam {
    team: string,
    img: string,
    points: number
}

interface SingleTeamStatsProps {
    teamName: string,
    teamLogo: string,
    type?: string,
    teams?: SingleTeam[] 
}

const Teams = [
	{language: 'Aрсенал'},
	{language: 'Manchester City'},
	{language: 'Bournly'},
]

const SingleTeamStats:FC<SingleTeamStatsProps> = ({teamName, teamLogo, type, teams}) => {

    return (
        <div className={styles.single_team_stats}>
            <div className={styles.header}>
                {type === 'team' ? 
                    <>
                        <span>{teamName}</span>
                        <div className={styles.img_wrapper}>
                            <img src={teamLogo} alt="" />
                        </div>
                    </> 
                : <>
                    <div className={styles.img_wrapper}>
                        {/* <img src={logos.logos.epl} alt="" /> */}
                    </div>
                    <CustomSelect type='localization' defaultValue='Премьер Лига' languages={Teams}/>
                </>
                }
            </div>
            <div className={styles.team_stats}>
                <div className={styles.stats_colunm}>
                    <div className={styles.stats_colunm_header}>
                        Pass, %
                    </div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                </div>
                <div className={styles.stats_colunm}>
                    <div className={styles.stats_colunm_header}>
                        xG
                    </div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                </div>
                <div className={styles.stats_colunm}>
                    <div className={styles.stats_colunm_header}>
                        xGOT
                    </div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                    <div>3 игры</div>
                </div>
            </div>
        </div>
    )
}

export default SingleTeamStats