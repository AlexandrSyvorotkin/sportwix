import React, {FC, useContext} from 'react';
import styles from './ClubRecords.module.scss'
import { useAppSelector } from '../../types/hooks';
import { ClubRecord } from '../../types/InformationTabs/SingleTeamInfo/Records/ClubRecords/ClubRecord';
import { TeamRecords } from '../../types/InformationTabs/SingleTeamInfo/Records/ClubRecords/ClubRecords';
import { RootState } from '../../redux/store';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';


const ClubRecords:FC = () => {

    //TODO: сделать лучше

    const club_records = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam?.tabs.team_records)
    const {language} = useContext(LanguageContext) 

    return (
        <div className={styles.club_records}>
            {club_records?.longest_unbeaten_streak 
                ?
                <div className={styles.header_records}>
                    <span>{language === 'Eng' ? "Longest Unbeaten Streak" : 'Самая длинная беспроигрышная серия'}</span>
                </div>
                : null
            }
            {club_records?.longest_unbeaten_streak?.map((record: ClubRecord, id: number) => 
                <div key={id} className={styles.club_record_item}>
                    <span className={styles.record_item_detail_info_value}>{record.value} {language === 'Eng' ? 'games' : 'Игр'}</span>
                    <div className={styles.record_items}>
                        <span className={styles.record_item_detail_info}>{record.league}</span>
                        <span className={styles.record_item_detail_info}>{record.period}</span>
                    </div>
                </div>
            )}
            {club_records?.treble ? 
                <div className={styles.header_records}>
                    <span>{language === 'Eng' ? 'Treble' : 'Требл'}</span>
                </div>  
                : null  
            }
            {club_records?.treble?.map((record: ClubRecord, id: number) => 
                <div key={id} className={styles.club_record_item}>
                    <span className={styles.record_treble}>{language === 'Eng' ? 'Treble' : 'Требл'}</span>
                    <div className={styles.record_items}>
                        <span className={styles.record_treble}>{record.league}</span>
                        <span className={styles.record_treble}>{record.period}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClubRecords;