import { useAppSelector } from "@hooks/hooks";
import styles from './team-results-table.module.scss'
import { RootState } from "@store/store";
import classNames from "classnames";
import team_results_table from '../../localization/team_detail_info_section/team_results_table/team_results_table.json'
import { SingleTeamInfoCardLogo } from "@components/single-team-info-card-logo";
import { Separator } from "@shared/separator";
import { SingleTeamInfoStadiumCard } from "@components/single-team-info-card-stadium";

const CUP_STYLES: any = {
    1: 'border-[#B3891F] border-[3px]',
    2: 'border-[#867D7D] border-[3px]',
    3: 'border-[#5C3E1F]  border-[3px]',
}

const Medal = ({ children, place }: { children: React.ReactNode, place: string }) => {
    if (['1', '2', '3'].includes(place)) {
        return (
            <div className="flex items-center justify-center w-full">
                <div className={`${CUP_STYLES[place]} w-[40px] h-[40px] rounded-full flex items-center justify-center font-normal text-[14px] leading-[18px] border-solid`}>
                    {children}
                </div>
            </div>
        )
    }
    return children
}

const TeamResultsTable = () => {

    const firstSelectedTeamSeasonResults = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam?.tabs.seasons)
    console.log(firstSelectedTeamSeasonResults)
    const language = 'Eng'



    return (
        <div className='flex justify-between w-full h-full'>
            <div className='w-1/5'>
                <SingleTeamInfoCardLogo />
                <Separator className='w-full h-[1px]' />
                <SingleTeamInfoStadiumCard />
            </div>
            <Separator className='w-[1px] h-full' />
            <div className='h-full w-4/5'>
                <div className='flex flex-col w-full'>
                    <div className='w-full h-[50px] flex items-center'>
                        <div className='p-[15px] flex justify-center items-center w-1/7 text-center text-[14px]'>{language === 'Eng' ? team_results_table.season.eng : team_results_table.season.ru}</div>
                        <Separator className='w-[1px] h-full' />
                        <div className='p-[10px] flex justify-center items-center w-1/7 text-center text-[14px]'>{language === 'Eng' ? team_results_table.epl.eng : team_results_table.epl.ru}</div>
                        <Separator className='w-[1px] h-full' />
                        <div className='p-[10px] flex justify-center items-center w-1/7 text-center text-[14px]'>{language === 'Eng' ? team_results_table.eng_cup.eng : team_results_table.eng_cup.ru}</div>
                        <Separator className='w-[1px] h-full' />
                        <div className='p-[10px] flex justify-center items-center w-1/7 text-center text-[14px]'>{language === 'Eng' ? team_results_table.league_cup.eng : team_results_table.league_cup.ru}</div>
                        <Separator className='w-[1px] h-full' />
                        <div className='p-[10px] flex justify-center items-center w-1/7 text-center text-[14px]'>{language === 'Eng' ? team_results_table.ucl.eng : team_results_table.ucl.ru}</div>
                        <Separator className='w-[1px] h-full' />
                        <div className='p-[10px] flex justify-center items-center w-1/7 text-center text-[14px]'>{language === 'Eng' ? team_results_table.el.eng : team_results_table.el.ru}</div>
                        <Separator className='w-[1px] h-full' />
                        <div className='p-[10px] flex justify-center items-center w-1/7 text-center text-[14px]'>{language === 'Eng' ? team_results_table.cs.eng : team_results_table.cs.ru}</div>
                    </div>
                    <Separator className='w-full h-[1px]' />
                </div>
                <div className='h-full w-full overflow-auto'>
                    {firstSelectedTeamSeasonResults?.map((it: any) =>
                        <div key={it.season} className="w-full flex h-[50px]">
                            <div className='w-1/7 flex justify-center items-center flex-col '>
                                <div className="w-full text-center items-center flex h-full ">
                                    <span className="w-full">{it.season}</span>
                                    <Separator className="w-[1px] h-full" />
                                </div>
                                <Separator className="w-full h-[1px]" />
                            </div>
                            <div className='w-1/7 flex justify-center items-center flex-col '>
                                <div className="w-full text-center items-center flex h-full">
                                    <Medal place={it.Premier_League}>
                                        <span className="w-full">{it.Premier_League}</span>
                                    </Medal>
                                    <Separator className="w-[1px] h-full" />
                                </div>
                                <Separator className="w-full h-[1px]" />
                            </div>
                            <div className='w-1/7 flex justify-center items-center flex-col '>
                                <div className="w-full text-center items-center flex h-full">
                                    <Medal place={it.League_Cup}>
                                        <span className="w-full">{it.League_Cup}</span>
                                    </Medal>
                                    <Separator className="w-[1px] h-full" />
                                </div>
                                <Separator className="w-full h-[1px]" />
                            </div>
                            <div className='w-1/7 flex justify-center items-center flex-col '>
                                <div className="w-full text-center items-center flex h-full">
                                    <Medal place={it.League_Cup}>
                                        <span className="w-full">{it.League_Cup}</span>
                                    </Medal>
                                    <Separator className="w-[1px] h-full" />
                                </div>
                                <Separator className="w-full h-[1px]" />
                            </div>
                            <div className='w-1/7 flex justify-center items-center flex-col '>
                                <div className="w-full text-center items-center flex h-full">
                                    <Medal place={it.UEFA_Champions_League}>
                                        <span className="w-full">{it.UEFA_Champions_League}</span>
                                    </Medal>
                                    <Separator className="w-[1px] h-full" />
                                </div>
                                <Separator className="w-full h-[1px]" />
                            </div>
                            <div className='w-1/7 flex justify-center items-center flex-col '>
                                <div className="w-full text-center items-center flex h-full">
                                    <Medal place={it.Community_Shield}>
                                        <span className="w-full">{it.Europa_League}</span>
                                    </Medal>
                                    <Separator className="w-[1px] h-full" />
                                </div>
                                <Separator className="w-full h-[1px]" />
                            </div>
                            <div className='w-1/7 flex justify-center items-center flex-col '>
                                <div className="w-full text-center items-center flex h-full">
                                    <Medal place={it.Community_Shield}>
                                        <span className="w-full">{it.Community_Shield}</span>
                                    </Medal>
                                </div>
                                <Separator className="w-full h-[1px]" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export { TeamResultsTable }