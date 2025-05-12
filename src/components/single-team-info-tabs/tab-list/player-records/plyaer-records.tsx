

import player_records from '../../../../localization/team_detail_info_section/player_records/player_records.json'
import { useAppSelector } from '@hooks/hooks';
import { RootState } from '@store/store';
import { Separator } from '@shared/separator/separator';
import { PlayerRecordItem } from './player-record-item';

const PlayersRecords = () => {

    const teamPlayerRecords = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam?.tabs.players_records)
    const language = 'Eng'

    console.log(teamPlayerRecords)

    return (
        <div className='flex flex-col overflow-auto h-full'>

            <div className='flex flex-col'>
                <div className='flex justify-center items-center p-[10px]'>{"Наибольшее количество забитых голов"}</div>
                <Separator className='w-full h-[1px]'/>
            </div>
            <div className='flex justify-between w-full'>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.name.eng : player_records.name.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.games.eng : player_records.games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals.eng : player_records.goals.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals_games.eng : player_records.goals_games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.period.eng : player_records.period.ru}</span>
            </div>
            <div className=''>
                {teamPlayerRecords?.most_goals?.map((record, id: number) => 
                    <PlayerRecordItem key={id} description={record.description} value={record.value} record_image={record.record_image} period={record.period} matches={record.matches}/>
                )}
            </div>

            <div className='flex flex-col'>
                <div className='flex justify-center items-center p-[10px]'>{"Наибольшее количество ассистов"}</div>
                <Separator className='w-full h-[1px]'/>
            </div>
            <div className='flex justify-between w-full'>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.name.eng : player_records.name.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.games.eng : player_records.games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals.eng : player_records.goals.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals_games.eng : player_records.goals_games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.period.eng : player_records.period.ru}</span>
            </div>
            <div className=''>
                {teamPlayerRecords?.most_assists?.map((record, id: number) => 
                    <PlayerRecordItem key={id} description={record.description} value={record.value} record_image={record.record_image} period={record.period} matches={record.matches}/>
                )}
            </div>

            <div className='flex flex-col'>
                <div className='flex justify-center items-center p-[10px]'>{"Наибольшее количество желтых карточек"}</div>
                <Separator className='w-full h-[1px]'/>
            </div>
            <div className='flex justify-between w-full'>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.name.eng : player_records.name.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.games.eng : player_records.games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals.eng : player_records.goals.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals_games.eng : player_records.goals_games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.period.eng : player_records.period.ru}</span>
            </div>
            <div className=''>
                {teamPlayerRecords?.most_yellow_cards?.map((record, id: number) => 
                    <PlayerRecordItem key={id} description={record.description} value={record.value} record_image={record.record_image} period={record.period} matches={record.matches}/>
                )}
            </div>

            <div className='flex flex-col'>
                <div className='flex justify-center items-center p-[10px]'>{"Наибольшее количество красных карточек"}</div>
                <Separator className='w-full h-[1px]'/>
            </div>
            <div className='flex justify-between w-full'>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.name.eng : player_records.name.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.games.eng : player_records.games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals.eng : player_records.goals.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals_games.eng : player_records.goals_games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.period.eng : player_records.period.ru}</span>
            </div>
            <div className=''>
                {teamPlayerRecords?.most_red_cards?.map((record, id: number) => 
                    <PlayerRecordItem key={id} description={record.description} value={record.value} record_image={record.record_image} period={record.period} matches={record.matches}/>
                )}
            </div>

            <div className='flex flex-col'>
                <div className='flex justify-center items-center p-[10px]'>{"Наибольшее количество сухих матчей"}</div>
                <Separator className='w-full h-[1px]'/>
            </div>
            <div className='flex justify-between w-full'>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.name.eng : player_records.name.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.games.eng : player_records.games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals.eng : player_records.goals.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals_games.eng : player_records.goals_games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.period.eng : player_records.period.ru}</span>
            </div>
            <div className=''>
                {teamPlayerRecords?.most_clean_sheets?.map((record, id: number) => 
                    <PlayerRecordItem key={id} description={record.description} value={record.value} record_image={record.record_image} period={record.period} matches={record.matches}/>
                )}
            </div>

            <div className='flex flex-col'>
                <div className='flex justify-center items-center p-[10px]'>{"Наибольшее количество ударов в створ"}</div>
                <Separator className='w-full h-[1px]'/>
            </div>
            <div className='flex justify-between w-full'>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.name.eng : player_records.name.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.games.eng : player_records.games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals.eng : player_records.goals.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals_games.eng : player_records.goals_games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.period.eng : player_records.period.ru}</span>
            </div>
            <div className=''>
                {teamPlayerRecords?.most_shots_on_target?.map((record, id: number) => 
                    <PlayerRecordItem key={id} description={record.description} value={record.value} record_image={record.record_image} period={record.period} matches={record.matches}/>
                )}
            </div>

            <div className='flex flex-col'>
                <div className='flex justify-center items-center p-[10px]'>{"Наибольшее количество ударов вне створа"}</div>
                <Separator className='w-full h-[1px]'/>
            </div>
            <div className='flex justify-between w-full'>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.name.eng : player_records.name.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.games.eng : player_records.games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals.eng : player_records.goals.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals_games.eng : player_records.goals_games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.period.eng : player_records.period.ru}</span>
            </div>
            <div className=''>
                {teamPlayerRecords?.most_shots_off_target?.map((record, id: number) => 
                    <PlayerRecordItem key={id} description={record.description} value={record.value} record_image={record.record_image} period={record.period} matches={record.matches}/>
                )}
            </div>

            <div className='flex flex-col'>
                <div className='flex justify-center items-center p-[10px]'>{"Наибольшее количество фолов"}</div>
                <Separator className='w-full h-[1px]'/>
            </div>
            <div className='flex justify-between w-full'>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.name.eng : player_records.name.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.games.eng : player_records.games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals.eng : player_records.goals.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals_games.eng : player_records.goals_games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.period.eng : player_records.period.ru}</span>
            </div>
            <div className=''>
                {teamPlayerRecords?.most_fouls?.map((record, id: number) => 
                    <PlayerRecordItem key={id} description={record.description} value={record.value} record_image={record.record_image} period={record.period} matches={record.matches}/>
                )}
            </div>
            
            <div className='flex flex-col'>
                <div className='flex justify-center items-center p-[10px]'>{"Наибольшее количество офсайдов"}</div>
                <Separator className='w-full h-[1px]'/>
            </div>
            <div className='flex justify-between w-full'>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.name.eng : player_records.name.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.games.eng : player_records.games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals.eng : player_records.goals.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.goals_games.eng : player_records.goals_games.ru}</span>
                <span className="w-1/5 p-[10px] flex justify-center items-center">{language === 'Eng' ? player_records.period.eng : player_records.period.ru}</span>
            </div>
            <div className=''>
                {teamPlayerRecords?.most_offsides?.map((record, id: number) => 
                    <PlayerRecordItem key={id} description={record.description} value={record.value} record_image={record.record_image} period={record.period} matches={record.matches}/>
                )}
            </div>
        </div>
    );
};

export { PlayersRecords}

