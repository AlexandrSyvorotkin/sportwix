import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react'
import styles from './FiledMidfield.module.scss'
import midfield from '../../assets/footballField/midfield.svg'
import FootballFieldSelection from '../../ui/Selections/FootballFieldSelection/FootballFieldSelection'
import { useAppSelector } from '../../types/hooks';
import FootballProgressCircle from '../FootballProgressCircle/FootballProgressCircle'
import { calculatePercentage } from '../../utils/calculateCirclePercentage';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import field_options from '../../localization/team_detail_info_section/field/field_options.json'
import field_options_variants from '../../localization/team_detail_info_section/field/field_options_variants.json'
import { RootState } from '../../redux/store';

interface FieldMidfieldProps {
    selectedGamesCount: any,
    activeTimeFrame: {
        gametimeframe_1: number,
        gametimeframe_3: number,
        gametimeframe_5: number,
        gametimeframe_10: number,
        gametimeframe_15: number,
        gametimeframe_all: number
    },
}

type Metrics = {
    firstTeam: number | undefined,
    secondTeam: number | undefined
}

const FieldMidfield: FC<FieldMidfieldProps> = ({selectedGamesCount, activeTimeFrame}) => {

    // console.log(activeTimeFrame)
    
    const [activeMidFieldParam, setActiveMidFieldParam] = useState(1)
    const {language} = useContext(LanguageContext)


    const selectors = [
        {
            id: 1,
            title: language === 'Eng' ? field_options_variants.midfied_options.title.eng : field_options_variants.midfied_options.title.ru,
            parameters: [
                { 
                    id: 1, 
                    title: language === 'Eng' ? field_options_variants.midfied_options.ball_possession.eng : field_options_variants.midfied_options.ball_possession.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.midfied_options.ball_possession.eng_tip : field_options_variants.midfied_options.ball_possession.ru_tip
                },
                { 
                    id: 2, 
                    title: language === 'Eng' ? field_options_variants.midfied_options.accurate_passes.eng : field_options_variants.midfied_options.accurate_passes.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.midfied_options.accurate_passes.eng_tip : field_options_variants.midfied_options.accurate_passes.ru_tip
                },
                { 
                    id: 3, 
                    title: language === 'Eng' ? field_options_variants.midfied_options.innacurate_passes.eng : field_options_variants.midfied_options.innacurate_passes.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.midfied_options.innacurate_passes.eng_tip : field_options_variants.midfied_options.innacurate_passes.ru_tip
                },
            ]
        }
    ]

    const activeMidfieldParamHandler = function (activeMidFieldParam: number) {
        if (activeMidFieldParam === 1) {
            return language === 'Eng' ? field_options_variants.midfied_options.ball_possession.eng : field_options_variants.midfied_options.ball_possession.ru
        }
        if (activeMidFieldParam === 2) {
            return language === 'Eng' ? field_options_variants.midfied_options.accurate_passes.eng : field_options_variants.midfied_options.accurate_passes.ru
        }
        if (activeMidFieldParam === 3) {
            return language === 'Eng' ? field_options_variants.midfied_options.innacurate_passes.eng : field_options_variants.midfied_options.innacurate_passes.ru
        }
    }


    const fieldH2h = useAppSelector((state: RootState) => state.tournamentSlice.h2h.isH2h.field)
    const fieldParams = useAppSelector((state: RootState) => state.tournamentSlice.h2h.fieldParams)
    
    
    
    const allFirstTeamFieldMetrics = useAppSelector(state => state.tournamentSlice.firstSelectedTeam?.field)
    const allSecondTeamFieldMetrcis = useAppSelector(state => state.tournamentSlice.secondSelectedTeam?.field)

    const [midfieldMetrics, setMidfieldMetrics] = useState<Metrics>({
        firstTeam: undefined,
        secondTeam: undefined
    })
 

    function filterParams(gameTimeFrame: string, time: string, fieldPart: string, fieldZone: string, parameter: string, team: number) {
        //@ts-ignore
        return allFirstTeamFieldMetrics?.[gameTimeFrame].average?.[time]?.[fieldPart]?.[fieldZone]?.[parameter]
        // setMidfieldMetrics({
        //     //@ts-ignore
        //     firstTeam: allFirstTeamFieldMetrics?.[`${gameTimeFrame}`].average[`${time}`][`${fieldPart}`][`${parameter}`],
        //     //@ts-ignore
        //     secondTeam: allSecondTeamFieldMetrcis?.[`${gameTimeFrame}`].average[`${time}`][`${fieldPart}`][`${parameter}`]
        // })
    }

    // filterParams('timeframe_1', 'full_time', 'defense', 'goalkeeper', 1)

    // console.log(filterParams('timeframe_1', 'full_time', 'attacking', 'forward', 'avg_coeff', 1))


    // function filterParams (selectedGamesNumber: number, selectedGamesCount: number, activeMidFieldParam: number, activeTime: any) {
    //     if (selectedGamesCount === selectedGamesNumber) {
    //         if (activeMidFieldParam === 1) { // фильтр параметра
    //             setMidfieldMetrics({
    //                 //@ts-ignore
    //                 firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average[`${activeTime}`].midfield.ball_possession,
    //                 //@ts-ignore
    //                 secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average[`${activeTime}`].midfield.ball_possession
    //             })
    //         } else if (activeMidFieldParam === 2) {
    //             setMidfieldMetrics({
    //                 //@ts-ignore
    //                 firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average[`${activeTime}`].midfield.accurate_passes,
    //                 //@ts-ignore
    //                 secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average[`${activeTime}`].midfield.accurate_passes
    //             })
    //         } else if (activeMidFieldParam === 3) {
    //             setMidfieldMetrics({
    //                 //@ts-ignore
    //                 firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average[`${activeTime}`].midfield.inaccurate_passes,
    //                 //@ts-ignore
    //                 secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average[`${activeTime}`].midfield.inaccurate_passes
    //             })
    //         }
    //     }
    // }

    // useEffect(() => {
    //     if (activeTimeFrame.gametimeframe_1 === 3) {
    //         filterParams(1, selectedGamesCount, activeMidFieldParam, "full_time")
    //     }
    // }, [])

    // useEffect(() => {

    //     if (activeTimeFrame.gametimeframe_1 === 1 ) {
    //         filterParams(1, selectedGamesCount, activeMidFieldParam, "time_1")
    //     }
    //     if (activeTimeFrame.gametimeframe_1 === 2) {
    //         filterParams(1, selectedGamesCount, activeMidFieldParam, "time_2")
    //     }
    //     if (activeTimeFrame.gametimeframe_1 === 3) {
    //         filterParams(1, selectedGamesCount, activeMidFieldParam, "full_time")
    //     }
    // }, [activeTimeFrame, selectedGamesCount, activeMidFieldParam])


    useEffect(() => {
        
        if (activeTimeFrame.gametimeframe_1 === 1) { // фильтр тайма
            if (selectedGamesCount === 1) { // фильтр количества игр
                if (activeMidFieldParam === 1) { // фильтр параметра
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.midfield.inaccurate_passes
                    })
                }
            }
        }
        

        if (activeTimeFrame.gametimeframe_1 === 2) {
            if (selectedGamesCount === 1) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.midfield.inaccurate_passes
                    })
                }
            }
        }
        
        if (activeTimeFrame.gametimeframe_1 === 3) {
            if (selectedGamesCount === 1) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.midfield.inaccurate_passes
                    })
                }
            }
        }

        if (activeTimeFrame.gametimeframe_3 == 1) {
            if (selectedGamesCount === 3) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.midfield.inaccurate_passes
                    })
                }
            }
        }

        if (activeTimeFrame.gametimeframe_3 == 2) {
            if (selectedGamesCount === 3) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.midfield.inaccurate_passes
                    })
                }
            }
        }

        if (activeTimeFrame.gametimeframe_3 == 3) {
            if (selectedGamesCount === 3) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.midfield.inaccurate_passes
                    })
                }
            }
        }

        if (activeTimeFrame.gametimeframe_5 == 1) {
            if (selectedGamesCount === 5) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.midfield.inaccurate_passes
                    })
                }
            }
        }

        if (activeTimeFrame.gametimeframe_5 == 2) {
            if (selectedGamesCount === 5) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.midfield.inaccurate_passes
                    })
                }
            }
        }

        if (activeTimeFrame.gametimeframe_5 == 3) {
            if (selectedGamesCount === 5) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.midfield.inaccurate_passes
                    })
                }
            }
        }
        
        if (activeTimeFrame.gametimeframe_10 == 1) {
            if (selectedGamesCount === 10) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.midfield.inaccurate_passes
                    })
                }
            }
        } 

        if (activeTimeFrame.gametimeframe_10 == 2) {
            if (selectedGamesCount === 10) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.midfield.inaccurate_passes
                    })
                }
            }
        } 

        if (activeTimeFrame.gametimeframe_10 == 3) {
            if (selectedGamesCount === 10) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.midfield.inaccurate_passes
                    })
                }
            }
        } 

        if (activeTimeFrame.gametimeframe_15 === 1) {
            if (selectedGamesCount === 15) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_1.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_1.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_1.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_1.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_1.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_1.midfield.inaccurate_passes
                    })
                }
            }
        }

        if (activeTimeFrame.gametimeframe_15 === 2) {
            if (selectedGamesCount === 15) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.midfield.inaccurate_passes
                    })
                }
            }
        }

        if (activeTimeFrame.gametimeframe_15 === 3) {
            if (selectedGamesCount === 15) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.midfield.inaccurate_passes
                    })
                }
            }
        }


        if (activeTimeFrame.gametimeframe_all === 1) {
            if (selectedGamesCount === 38) {
                if (activeMidFieldParam === 1) {
                    if (fieldH2h) {
                        setMidfieldMetrics({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.midfield.ball_possession,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.midfield.ball_possession
                        })
                    } else if (!fieldH2h) {
                        setMidfieldMetrics({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.midfield.ball_possession,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.midfield.ball_possession
                        })
                    }
                } else if (activeMidFieldParam === 2) {
                    if (fieldH2h) {
                        setMidfieldMetrics({
                            firstTeam: fieldParams?.firstTeamH2h.timeframe_all.time_1.midfield.accurate_passes,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.midfield.accurate_passes
                        })
                    } else if (!fieldH2h) {
                        setMidfieldMetrics({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.midfield.accurate_passes,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.midfield.accurate_passes
                        })
                    }
                } else if (activeMidFieldParam === 3) {
                    if (fieldH2h) {
                        setMidfieldMetrics({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.midfield.inaccurate_passes,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.midfield.inaccurate_passes
                        })
                    } else if (!fieldH2h) {
                        setMidfieldMetrics({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.midfield.inaccurate_passes,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.midfield.inaccurate_passes
                        })
                    }
                }
            }
        }

        if (activeTimeFrame.gametimeframe_all === 2) {
            if (selectedGamesCount === 38) {
                if (activeMidFieldParam === 1) {
                    if (fieldH2h) {
                        setMidfieldMetrics({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_2.midfield.ball_possession,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_2.midfield.ball_possession
                        })
                    } else if (!fieldH2h) {
                        setMidfieldMetrics({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.midfield.ball_possession,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.midfield.ball_possession
                        })
                    }
                } else if (activeMidFieldParam === 2) {
                    if (fieldH2h) {
                        setMidfieldMetrics({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_2.midfield.accurate_passes,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_2.midfield.accurate_passes
                        })
                    } else if (!fieldH2h) {
                        setMidfieldMetrics({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.midfield.accurate_passes,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.midfield.accurate_passes
                        })
                    }
                } else if (activeMidFieldParam === 3) {
                    if (fieldH2h) {
                        setMidfieldMetrics({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_2.midfield.inaccurate_passes,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_2.midfield.inaccurate_passes
                        })
                    } else if (!fieldParams) {
                        setMidfieldMetrics({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.midfield.inaccurate_passes,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.midfield.inaccurate_passes
                        })
                    }
                }
            }
        }

        if (activeTimeFrame.gametimeframe_all === 3) {
            if (selectedGamesCount === 38) {
                if (activeMidFieldParam === 1) {
                    if (fieldH2h) {
                        setMidfieldMetrics({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all?.full_time?.midfield?.ball_possession,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all?.full_time?.midfield?.ball_possession
                        })
                    } else if (!fieldH2h) {
                        setMidfieldMetrics({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.midfield.ball_possession,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.midfield.ball_possession
                        })
                    }
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.midfield.inaccurate_passes
                    })
                }
            }
        }

    }, [allFirstTeamFieldMetrics, allSecondTeamFieldMetrcis, activeMidFieldParam, selectedGamesCount, activeTimeFrame, fieldH2h, fieldParams])



    

    return (
        <div className={styles.midfield_wrapper}>
            <div className={styles.midfield_header}>
                <span style={{padding: '10px 10px 0 10px'}}>M: {activeMidfieldParamHandler(activeMidFieldParam)}</span>
                <FootballFieldSelection 
                    onClose={() => null} 
                    selectors={selectors} 
                    typeVariant="midfield"
                    setFirstActiveFieldParam={setActiveMidFieldParam} 
                    firstActiveFieldParam={activeMidFieldParam} 
                    ruTitle={field_options.midfied.ru}
                    engTitle={field_options.midfied.eng}
                />
            </div>
            <div className={styles.midfield}>
                <FootballProgressCircle 
                    percent={calculatePercentage(midfieldMetrics.firstTeam, midfieldMetrics.secondTeam)} 
                    width={80} 
                    height={80} 
                    img={midfield}
                    imgHeight={25} 
                    imgWidth={25}
                />
            </div>
        </div>
    )
}

export default FieldMidfield