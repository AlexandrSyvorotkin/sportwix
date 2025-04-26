import {FC, useState, useEffect, useContext} from 'react'
import styles from './FootballFieldMidfieldMobile.module.scss'
import midfield from '../../assets/footballField/midfield.svg'
import FootballProgressCircle from '../FootballProgressCircle/FootballProgressCircle'
import MobileFieldOptionsSelector from '../../ui/Selections/MobileFieldOptionsSelector/MobileFiledOptionsSelector'
import { useAppSelector } from '../../types/hooks'
import { calculatePercentage } from '../../utils/calculateCirclePercentage'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'
import field_options_variants from '../../localization/team_detail_info_section/field/field_options_variants.json'

type Metrics = {
    firstTeam: number | undefined,
    secondTeam: number | undefined,
     
}

interface FootballFieldMidfieldMobileProps {
    selectedGamesCount: number,
    activeTimeGameFrame: number
}

const FootballFieldMidfieldMobile:FC<FootballFieldMidfieldMobileProps> = ({selectedGamesCount, activeTimeGameFrame}) => {

    const {language} = useContext(LanguageContext)

    const selectors = [
        {
            id: 1,
            title: language === 'Eng' ? field_options_variants.midfied_options.title.eng : field_options_variants.midfied_options.title.ru,
            parameters: [
                { id: 1, title: language === 'Eng' ? field_options_variants.midfied_options.ball_possession.eng : field_options_variants.midfied_options.ball_possession.ru},
                { id: 2, title: language === 'Eng' ? field_options_variants.midfied_options.accurate_passes.eng : field_options_variants.midfied_options.accurate_passes.ru},
                { id: 3, title: language === 'Eng' ? field_options_variants.midfied_options.innacurate_passes.eng : field_options_variants.midfied_options.innacurate_passes.ru},
            ]
        }
    ]


    const [activeMidFieldParam, setActiveMidFieldParam] = useState(1)

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


    const allFirstTeamFieldMetrics = useAppSelector(state => state.tournamentSlice.firstSelectedTeam?.field)
    const allSecondTeamFieldMetrcis = useAppSelector(state => state.tournamentSlice.secondSelectedTeam?.field)

    const [midfieldMetrics, setMidfieldMetrics] = useState<Metrics>({
        firstTeam: undefined,
        secondTeam: undefined
    })

    // console.log(midfieldMetrics)

    useEffect(() => {
        
        if (activeTimeGameFrame === 1) { // фильтр тайма
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
        

        if (activeTimeGameFrame === 2) {
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
        
        if (activeTimeGameFrame === 3) {
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

        if (activeTimeGameFrame == 1) {
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

        if (activeTimeGameFrame == 2) {
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

        if (activeTimeGameFrame == 3) {
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

        if (activeTimeGameFrame == 1) {
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

        if (activeTimeGameFrame == 2) {
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

        if (activeTimeGameFrame == 3) {
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
        
        if (activeTimeGameFrame == 1) {
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

        if (activeTimeGameFrame == 2) {
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

        if (activeTimeGameFrame == 3) {
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

        if (activeTimeGameFrame === 1) {
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

        if (activeTimeGameFrame === 2) {
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

        if (activeTimeGameFrame === 3) {
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


        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 38) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.midfield.inaccurate_passes
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 38) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.midfield.ball_possession
                    })
                } else if (activeMidFieldParam === 2) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.midfield.accurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.midfield.accurate_passes
                    })
                } else if (activeMidFieldParam === 3) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.midfield.inaccurate_passes,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.midfield.inaccurate_passes
                    })
                }
            }
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 38) {
                if (activeMidFieldParam === 1) {
                    setMidfieldMetrics({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.midfield.ball_possession,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.midfield.ball_possession
                    })
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

    }, [allFirstTeamFieldMetrics, allSecondTeamFieldMetrcis, activeMidFieldParam, selectedGamesCount, activeTimeGameFrame])




    return (
        <div className={styles.midfield_wrapper}>
            <div className={styles.midfield}>
                <FootballProgressCircle
                    percent={calculatePercentage(midfieldMetrics.firstTeam, midfieldMetrics.secondTeam)}  
                    width={60} 
                    height={60} 
                    img={midfield}
                    imgHeight={15} 
                    imgWidth={15}
                />
            </div>
            <div className={styles.midfield_filters}>
                <MobileFieldOptionsSelector 
                    img={midfield} 
                    selectors={selectors} 
                    firstActiveFieldParam={activeMidFieldParam}
                    setFirstActiveFieldParam={setActiveMidFieldParam}
                />
            </div>
        </div>
    )
}

export default FootballFieldMidfieldMobile