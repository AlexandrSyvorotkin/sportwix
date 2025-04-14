import { FC, ReactElement, ReactNode } from 'react'
import styles from './SingleTeamInfoTabsContent.module.scss'
import { RootState } from '../../redux/store'
import { useAppSelector } from '../../types/hooks'
import ClubRecords from '../ClubRecords/ClubRecords'
import PlayersRecords from '../PlayersRecords/PlayerRecords'
import Sponsors from '../Sponsors/Sponsors'
import TeamAchievements from '../TeamAchievements/TeamAchievements'
import TeamFacts from '../TeamFacts/TeamFacts'
import UniformAndEmblems from '../UniformAndEmblems/UniformAndEmblems'

interface SingleTeamInfoTabsContentProps {

}

const tabsContent = [
    {id: 1, component: <TeamAchievements/>},
    {id: 2, component: <UniformAndEmblems/>},
    {id: 3, component: <Sponsors/>},
    {id: 4, component: <ClubRecords/>},
    {id: 5, component: <PlayersRecords/>},
    {id: 6, component: <TeamFacts/>}
]

const SingleTeamInfoTabsContent: FC<SingleTeamInfoTabsContentProps> = ({ }) => {
    const activeSingleTeamInfoTab = useAppSelector((state: RootState) => state.teamTabs.activeTabs.activeSingleTeamInfoTab)
    const tabActive = (id:number) => id === activeSingleTeamInfoTab ? 'block' : 'none'
    return (
        <div className={styles.tabs_content_wrapper}>
            {tabsContent.map(({id, component}) => <div key={id} style={{display: `${tabActive(id)}`}} className={styles.active_tab}>{component}</div>)}
        </div>
    )
}

export default SingleTeamInfoTabsContent

