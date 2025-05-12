import { CupMedal } from '@shared/cup-medal/cup-medal';
import styles from './single-cup-team-achievement-item.module.scss'
import classNames from 'classnames';

interface AchievementProps {
    bronse_of_league: number,
    coeff_games: number,
    count_games: number,
    gold_of_league: number,
    league_name: string,
    silver_of_league: number
    img: string
}

const SingleCupTeamAchievement = ({coeff_games, count_games, league_name, gold_of_league, bronse_of_league, silver_of_league, img}: AchievementProps) => {

    const language = 'Eng'
    const theme = 'dark'
    const textColor = theme === 'dark' ? 'white' : '#333333'


    const singleCupAchievementStyles = classNames({
        [styles.single_cup_team_achievement]:true,
        [styles.border_dark]: theme === 'dark',
        // [styles.border_light]: theme === 'light'
    })

    return (
        <div className={singleCupAchievementStyles}>
            <div className={styles.cup_description}>
                <div className={styles.cup_img_container}>
                    <div className={styles.cup_img_wrapper}>
                        <img src={`${img}`} alt=""/>
                    </div>
                </div>
                <p className={styles.cup_title} style={{color: textColor}}>{league_name}</p>
            </div>
            <div className={styles.achievement_border}/>
            <div className={styles.metrics}>
                <div className={styles.metric_item} style={{color: textColor}}>
                    <div className={styles.metric_type}>{language === 'Eng' ? "Total games" : "Всего игр"}</div>
                    <div className={styles.games} style={{color: textColor}}>{count_games}</div>
                </div>
                <div className={styles.metric_item} style={{color: textColor}}>
                    <div className={styles.metric_type}>{language === 'Eng' ? "Prizes coefficient" : "Коефф. побед"}</div>
                    <div className={styles.games} style={{color: textColor}}>{coeff_games}</div>
                </div>
                <div className={styles.metric_item} style={{color: textColor}}>
                    <div className={styles.metric_type}>{language === 'Eng' ? "Prize" : "Награды"}</div>
                    <div className={styles.titles_quantities}>
                        <CupMedal cupsCount={gold_of_league} cupMedalType='gold'/>
                        <CupMedal cupsCount={silver_of_league} cupMedalType='silver'/>
                        <CupMedal cupsCount={bronse_of_league} cupMedalType='bronze'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {SingleCupTeamAchievement};