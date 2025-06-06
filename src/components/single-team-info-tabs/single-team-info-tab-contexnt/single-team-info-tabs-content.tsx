// const tabsContent = [
//     {id: 1, component: <TeamAchievements/>},
//     {id: 2, component: <UniformAndEmblems/>},
//     {id: 3, component: <Sponsors/>},
//     {id: 4, component: <ClubRecords/>},
//     {id: 5, component: <PlayersRecords/>},
//     {id: 6, component: <TeamFacts/>}
// ]

import { RootState } from '../../../store/store'
import { useAppSelector } from '../../../hooks/hooks'
import { TeamAchievements } from '../tab-list/team-achievements'
import { Sponsors } from '../tab-list/sponsors'
import { Kits } from '../tab-list/kits/kits'
import { ClubRecords } from '../tab-list/club-records'
import { PlayersRecords } from '../tab-list/player-records'
import { TeamFacts } from '../tab-list/team-facts'

const tabsContent = [
  { id: 'Achievements', component: <TeamAchievements /> },
  { id: 'Kits & Emblems', component: <Kits /> },
  { id: 'Sponsors', component: <Sponsors /> },
  { id: 'Club records', component: <ClubRecords /> },
  { id: 'Player records', component: <PlayersRecords /> },
  { id: 'Facts', component: <TeamFacts /> },
]

const SingleTeamInfoTabsContent = ({}) => {
  const activeSingleTeamInfoTab = useAppSelector(
    (state: RootState) => state.interfaceState.single_team_info_tabs.active_single_team_info_tab
  )
  // const tabActive = (id:number) => id === activeSingleTeamInfoTab ? 'block' : 'none'
  return (
    <div className="h-full overflow-auto">
      {tabsContent.find(it => it.id === activeSingleTeamInfoTab)?.component}
    </div>
  )
}

export default SingleTeamInfoTabsContent
