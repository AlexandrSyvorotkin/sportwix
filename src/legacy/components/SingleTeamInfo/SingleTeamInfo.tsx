import {FC, useContext} from 'react'
import styles from './SingleTeamInfo.module.scss'
import TeamCardLogo from "../TeamCardLogo/TeamCardLogo";
import TeamStadiumCard from '../TeamStadiumCard/TeamStadiumCard';
import classNames from 'classnames';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import SingleTeamInfoTabsContent from '../SingleTeamInfoTabsContent/SingleTeamInfoTabsContent';
import SingleTeamInfoTabManager from '../SingleTeamInfoTabManager/SingleTeamInfoTabManager';



const SingleTeamInfo:FC = () => {
    const {theme} = useContext(ThemeContext)
    const teamInfoStyles = classNames({
        [styles.team_info]: true,
        [styles.border_dark]: theme === 'dark',
        [styles.border_light]: theme === 'light'
    })

    return (
        <div className={styles.single_team_info}>
            <div className={teamInfoStyles} id='team-card'>
                <TeamCardLogo/>
                <TeamStadiumCard/>
            </div>
            <div className={styles.tabs_section} id='single-team-info'>
                <SingleTeamInfoTabManager/>
                <SingleTeamInfoTabsContent/>
            </div>
        </div>
    );
};

export default SingleTeamInfo;
