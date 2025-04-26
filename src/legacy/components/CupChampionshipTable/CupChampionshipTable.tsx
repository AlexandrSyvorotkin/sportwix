import { FC } from 'react'
import { useAppSelector } from '../../types/hooks'
import CupChampionshipTableItem from '../CupChampionshipTableItem/CupChampionshipTableItem'
import styles from './CupChampionshipTable.module.scss'


const CupChampionshipTable: FC = () => {
    //@ts-ignore
    const groups = useAppSelector(state => state.tournamentSlice.tournament?.teams.groups)
    // console.log(groups)
    return (
        <div className={styles.table_wrapper}>
            <div className={styles.table}>
                <div className={styles.table_header}>
                    <div>№</div>
                    <div>Flag</div>
                    <div>Team Name</div>
                    <div>gs</div>
                    <div>gc</div>
                    <div>Points</div>
                </div>
                <div className={styles.teams_list}>
                    {groups?.map((group: any, id: number) => <CupChampionshipTableItem key={id} groupName={group.group} teams={group.teams} />)}
                </div>
            </div>
            <div className={styles.side_panel}>
                dw
            </div>
        </div>
    )
} 

export default CupChampionshipTable



