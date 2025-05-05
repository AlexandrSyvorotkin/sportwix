import styles from './sparkline-last-game.module.scss'
import classNames from "classnames";

interface PreviousSparkLineGameTsProps {
    rival_team_logo: string,
    game_type?: boolean,
    team_goals: number,
    rival_team_goals: number,
    match_result?: string
}

const SparklineLastGame = ({rival_team_goals, game_type, rival_team_logo, team_goals}: PreviousSparkLineGameTsProps) => {


    const final_score = classNames({
        [styles.game_final_score]: true,
        [styles.win]: team_goals > rival_team_goals,
        [styles.lose]: team_goals < rival_team_goals,
        [styles.draw]: team_goals === rival_team_goals,
    }) 

    const language = 'Eng'
    const theme = 'dark'
    const homeGameType = language === 'Eng' ? 'H' : 'Д'
    const awaygameType = language === 'Eng' ? 'A' : 'Г'

    return (
        <div className={styles.previous_sparkline_game}>
            <div className={styles.game_info}>
                <div style={{color: theme === 'dark' ? 'white' : '#333333'}}>{game_type ? homeGameType : awaygameType}</div>
                <div className={final_score}>
                    <span>{team_goals}</span>
                    :
                    <span>{rival_team_goals}</span>
                </div>
            </div>
            <div className={styles.rival_team_img}>
                <img src={`${rival_team_logo}`} alt=""/>
            </div>
        </div>
    );
};

export { SparklineLastGame }