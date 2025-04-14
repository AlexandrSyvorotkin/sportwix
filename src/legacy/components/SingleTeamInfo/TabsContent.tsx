import React, {FC} from 'react';
import styles from './SingleTeamInfo.module.scss';
import TeamAchievements from "../TeamAchievements/TeamAchievements";
import UniformAndEmblems from "../UniformAndEmblems/UniformAndEmblems";
import Sponsors from "../Sponsors/Sponsors";
import ClubRecords from "../ClubRecords/ClubRecords";
import PlayerRecords from "../PlayersRecords/PlayerRecords";
import TeamFacts from "../TeamFacts/TeamFacts";
import {useAppSelector} from "../../types/hooks";
import { RootState } from '../../redux/store';

const tabsContent = [
    {id: 1, component: <TeamAchievements/>},
    {id: 2, component: <UniformAndEmblems/>},
    {id: 3, component: <Sponsors/>},
    {id: 4, component: <ClubRecords/>},
    {id: 5, component: <PlayerRecords/>},
    {id: 6, component: <TeamFacts/>}
];

const TabsContent: FC = () => {
    const activeSingleTeamInfoTab = useAppSelector((state: RootState) => state.teamTabs.activeTabs.activeSingleTeamInfoTab);

    const tabActive = (id: number) => id === activeSingleTeamInfoTab ? 'block' : 'none';

    return (
        <div className={styles.tabs_content_wrapper}>
            {tabsContent.map(({ id, component }) => (
                <div key={id} style={{ display: tabActive(id) }} className={styles.active_tab}>
                    {component}
                </div>
            ))}
        </div>
    );
};

export default React.memo(TabsContent);
