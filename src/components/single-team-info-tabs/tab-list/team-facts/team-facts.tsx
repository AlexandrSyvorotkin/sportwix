import { useAppSelector } from "@hooks/hooks";
import { RootState } from '@store/store';

const TeamFacts = () => {
    const teamFacts = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam?.tabs.facts)

    return (
        <div className='flex flex-col gap-[12px] p-[12px]'>
            {teamFacts?.map((fact, id: number) =>
                <div className={`flex justify-between items-center gap-[12px] w-full text-white text-[14px] leading-[18px] font-normal whitespace-break-spaces ${id % 2 === 0 && fact.image ? 'flex-row-reverse' : 'flex-row'}`} key={id}>
                    {fact.image ? <div className="min-w-[20%] max-w-[30%]">
                        <div className="w-full h-[130px]">
                            <img src={`${fact.image}`} alt="" className="w-full h-full rounded-lg object-cover" />
                        </div> 
                    </div>: null}
                    <div className="flex flex-col gap-[10px] min-w-[70%] max-w-full">
                        {fact.title === '_' ? null
                            :
                            <div className="font-bold text-[16px]">
                                {fact.title_ru}
                            </div>
                        }
                        <p>{fact.text_ru}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export {TeamFacts};