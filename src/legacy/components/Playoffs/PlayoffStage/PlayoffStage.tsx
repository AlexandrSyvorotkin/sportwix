import { FC } from 'react'
import styles from './PlayoffStage.module.scss'

interface PlayoffStageProps {
    games: any,
    visible: boolean
}

const PlayoffStage: FC<PlayoffStageProps> = ({games, visible}) => {

    if (!visible) {
        return null
    }

    return (
        <div className={styles.playoff_stage}>
            {games.map((match: any) =>
                <div className={styles.single_game}>
                    <div className={styles.team_description}>
                        <div className={styles.img_wrapper}>
                            <img src={match.team1.img} alt="" />
                        </div>
                        <span className={styles.name}>{match.team1.name}</span>
                        <span>{match.team1.score}</span>
                    </div>
                    <div className={styles.team_description}>
                        <div className={styles.img_wrapper}>
                            <img src={match.team2.img} alt="" />
                        </div>
                        <span className={styles.name}>{match.team2.name}</span>
                        <span>{match.team2.score}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PlayoffStage