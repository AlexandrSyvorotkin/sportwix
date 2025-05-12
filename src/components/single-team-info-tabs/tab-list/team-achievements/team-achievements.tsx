import styles from './team-achievements.module.scss';
// import SingleCupTeamAchievement from "../SingleCupTeamAchievement/SingleCupTeamAchievement";
import {useAppSelector} from "../../../../hooks/hooks";
// import { Achievement } from '../../types/InformationTabs/Achievement/Achievement';
import { Achievement } from 'src/types/InformationTabs/Achievement/Achievement';
import { SingleCupTeamAchievement } from './single-cup-team-achievement-item';

const TeamAchievements = () => {

    const firstSelectedTeam = useAppSelector(state => state.tournamentSlice.firstSelectedTeam)

    const achievements: Achievement[] | undefined = firstSelectedTeam?.tabs?.achievements

    const language = 'Eng'
    const theme = 'dark'
    return (
        <div className={styles.team_achievements}>
            <div className={styles.team_achievements_header}>
                <span className={styles.header_item} style={{width: '25%'}}>{language === 'Eng' ? "Tournament" : "Турнир"}</span>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '75%'}}>
                    <span className={styles.header_item}>{language === 'Eng' ? "Total games" : "Всего игр"}</span>
                    <span className={styles.header_item}>{language === 'Eng' ? "Prizes coefficient" : "Коефф. побед"}</span>
                    <span className={styles.header_item}>{language === 'Eng' ? "Prize" : "Награды"}</span>
                </div>
            </div>
            {achievements?.map(cup =>
                <SingleCupTeamAchievement
                    key={cup?.league_name}
                    league_name={cup?.league_name}
                    gold_of_league={cup?.gold_of_league}
                    silver_of_league={cup?.silver_of_league}
                    bronse_of_league={cup?.bronse_of_league}
                    count_games={cup?.count_games}
                    coeff_games={cup?.coeff_games}
                    img={cup.league_img}
                />
                )}
        </div>
    );
};

export {TeamAchievements}