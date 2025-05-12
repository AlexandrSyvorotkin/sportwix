import styles from './single-team-info.module.scss'

import classNames from 'classnames';
import SingleTeamInfoTabsContent from '../single-team-info-tabs/single-team-info-tab-contexnt/single-team-info-tabs-content';
import { SingleTeamInfoTabManager } from '../single-team-info-tabs';
import { SingleTeamInfoCardLogo } from '@components/single-team-info-card-logo';
import { SingleTeamInfoStadiumCard } from '@components/single-team-info-card-stadium';
import { Separator } from '@shared/separator';


const SingleTeamInfo = () => {
    const theme = 'dark'
    const teamInfoStyles = classNames({
        [styles.team_info]: true,
        [styles.border_dark]: theme === 'dark',
        // [styles.border_light]: theme === 'light'
    })

    return (
        <div className={styles.single_team_info}>
            <div className={teamInfoStyles} id='team-card'>
                <SingleTeamInfoCardLogo/>
                <Separator className='w-full h-[1px]'/>
                <SingleTeamInfoStadiumCard/>
            </div>
            <Separator className='w-[1px] h-full'/>
            <div className={styles.tabs_section} id='single-team-info'>
                <div className="flex flex-col overflow-auto">
                <SingleTeamInfoTabManager/>
                <Separator className='w-full h-[1px]'/>
                <SingleTeamInfoTabsContent/>
                </div>
            </div>
        </div>
    );
};

export {SingleTeamInfo}
