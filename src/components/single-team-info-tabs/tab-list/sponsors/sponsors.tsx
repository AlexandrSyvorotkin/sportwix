import { useAppSelector } from '../../../../hooks/hooks'
import { RootState } from '../../../../store/store';
import sponsorsTitles from '../../../../localization/team_detail_info_section/sponsors/sponsors.json'
import { Separator } from '@shared/separator/separator';


const Sponsors = () => {

    const sponsors = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam?.tabs.sponsors)
    const language = 'Eng'
    const theme = 'dark'
    const textColor = theme === 'dark' ? 'white' : '#333333'

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='flex w-full flex-col sticky top-0' style={{color: textColor}}>
                <div className='flex w-full'>
                    <div className='w-1/4 flex justify-center items-center p-[12px]'>{language === 'Eng' ? sponsorsTitles.period.eng : sponsorsTitles.period.ru}</div>
                    <Separator className='w-[1px] h-full'/>
                    <div className='w-1/4 flex justify-center items-center p-[12px]'>{language === 'Eng' ? sponsorsTitles.title_sponsor.eng : sponsorsTitles.title_sponsor.ru}</div>
                    <Separator className='w-[1px] h-full'/>
                    <div className='w-1/4 flex justify-center items-center p-[12px]'>{language === 'Eng' ? sponsorsTitles.uniform.eng : sponsorsTitles.uniform.ru}</div>
                    <Separator className='w-[1px] h-full'/>
                    <div className='w-1/4 flex justify-center items-center p-[12px]'>{language === 'Eng' ? sponsorsTitles.contract.eng : sponsorsTitles.uniform.ru}</div>
                </div>
                <Separator className='w-full h-[1px]'/>
            </div>
            <Separator className='w-full h-[1px]'/>
            <div className='flex flex-col'>
                {sponsors?.map((it, id)=>
                    <div className="flex w-full" key={id} >
                        <div className="flex w-1/4">
                            <div className="flex flex-col w-full">
                                <div className='flex w-full justify-center items-center p-[12px]' style={{color: textColor}}>{it.period}</div>
                                <Separator className='w-full h-[1px]'/>
                            </div>
                            <Separator className='w-[1px] h-full'/>
                        </div>
                        <div className='flex w-3/4'>
                            <div className="flex w-1/3">
                                <div className='flex w-full flex-col'>
                                    <div className='flex w-full justify-center items-center p-[12px]' style={{color: textColor}}>{it.title}</div>
                                    <Separator className='w-full h-[1px]'/>
                                </div>
                                <Separator className='w-[1px] h-full'/>
                            </div>
                            <div className="flex w-1/3">
                                <div className='flex w-full flex-col'>
                                    <div className='flex w-full justify-center items-center p-[12px]' style={{color: textColor}}>{it.title}</div>
                                    <Separator className='w-full h-[1px]'/>
                                </div>
                                <Separator className='w-[1px] h-full'/>
                            </div>
                            <div className="flex w-1/3">
                                <div className='flex w-full flex-col'>
                                <div className='flex w-full justify-center items-center p-[12px]' style={{color: textColor}}>{language === 'Eng' ? sponsorsTitles.contract.eng : sponsorsTitles.uniform.ru}</div>
                                    <Separator className='w-full h-[1px]'/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export {Sponsors};