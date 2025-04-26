import React, {FC, useContext} from 'react';
import styles from './PlayerRecords.module.scss'
import { useAppSelector } from '../../types/hooks';
import PlayerRecordItem from '../PlayerRecordItem/PlayerRecordItem';
import { PlayerRecords } from '../../types/InformationTabs/SingleTeamInfo/Records/PlayerRecords/PlayerRecords';
import { PlayerRecord } from '../../types/InformationTabs/SingleTeamInfo/Records/PlayerRecords/PlayerRecord';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import player_records from '../../localization/team_detail_info_section/player_records/player_records.json'


const PlayersRecords: FC = () => {

    const teamPlayerRecords = useAppSelector<PlayerRecords | undefined>(state => state.tournamentSlice.firstSelectedTeam?.tabs.players_records)
    const {language} = useContext(LanguageContext)

    return (
        <div className={styles.players_records}>
            <div className={styles.players_records_header}>{language === 'Eng' ? "Most Goals" : "Наибольшее количество забитых голов"}</div>
            <div className={styles.players_records_subheader}>
                <span className={styles.subheader_item}>{language === 'Eng' ? player_records.name.eng : player_records.name.ru}</span>
                <span className={styles.subheader_item}>{language === 'Eng' ? player_records.games.eng : player_records.games.ru}</span>
                <span className={styles.subheader_item}>{language === 'Eng' ? player_records.goals.eng : player_records.goals.ru}</span>
                <span className={styles.subheader_item}>{language === 'Eng' ? player_records.goals_games.eng : player_records.goals_games.ru}</span>
                <span className={styles.subheader_item}>{language === 'Eng' ? player_records.period.eng : player_records.period.ru}</span>
            </div>
            <div className={styles.records_list}>
                {teamPlayerRecords?.most_goals?.map((it:PlayerRecord, id: number) => 
                    <PlayerRecordItem key={id} description={it.description} value={it.value} record_image={it.record_image} period={it.period} matches={it.matches}/>
                )}
            </div>
        </div>
    );
};

export default PlayersRecords;

