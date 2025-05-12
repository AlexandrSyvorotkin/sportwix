import styles from './single-team-info-card-logo.module.scss'
import {useAppSelector} from "../../legacy/types/hooks";
import classNames from 'classnames';

const SingleTeamInfoCardLogo = () => {
    const firstTeamSelected = useAppSelector(state => state.tournamentSlice.firstSelectedTeam) || null
    
    const language = 'Ru'
    const theme = 'dark'
    const textColor = theme === 'dark' ? 'white' : '#333333'

    const teamCardStyles = classNames({
        [styles.team_card_logo]: true,
        [styles.border_dark]: theme === 'dark',
    })

    const teamName = firstTeamSelected?.team_name || ''
    const teamAlterName = firstTeamSelected?.tabs?.team_alter_name_ru || ''
    const teamFoundDate = firstTeamSelected?.tabs?.team_found_date || ''
    const teamImg = firstTeamSelected?.team_img || ''

    return (
        <div className={teamCardStyles}>
            <div className={styles.logo}>
                {teamImg && <img src={teamImg} alt={teamName || 'Team logo'} />}
            </div>
            <div className={styles.club_description} style={{color: textColor}}>
                <div>{teamName}</div>
                <div>{teamAlterName}</div>
                <div>Основан в {teamFoundDate}</div>
            </div>
        </div>
    );
};

export {SingleTeamInfoCardLogo};