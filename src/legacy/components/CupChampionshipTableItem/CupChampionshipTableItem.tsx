import { FC } from "react"
import styles from './CupChampionshipTableItem.module.scss'
import { spawn } from "child_process"
import classNames from "classnames"

interface ChampionshipTableItemProps {
    groupName: string,
    teams: []
}

const CupChampionshipTableItem: FC<ChampionshipTableItemProps> = ({ groupName, teams }) => {

    return (
        <div className={styles.group_wrapper}>
            <div>
                <span>{groupName}</span>
            </div>
            <div className={styles.list_teams}>
                {teams.map((team: any) => {
                    const placeStyles = classNames({
                        [styles.place]: true,
                        [styles.place_default]:team.id === 4,
                        [styles.place_win]: team.id === 1 || team.id === 2,
                        [styles.place_europa]: team.id === 3
                    })

                    return (
                        <div key={team.name} className={team.id === 1 || team.id === 2 ? styles.team_description_wrapper_winner : styles.team_description_wrapper}>
                            <div className={styles.team_description}>
                                <div className={placeStyles}>{team.id}</div>
                                <div className={styles.img_wrapper}>
                                    <img src={team.img} alt="" />
                                </div>
                                <span>{team.name}</span>
                            </div>
                            <div className={styles.team_details}>
                                <div>{team.goals_scored}</div>
                                <div>{team.goals_conceded}</div>
                                <div>{team.points}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CupChampionshipTableItem