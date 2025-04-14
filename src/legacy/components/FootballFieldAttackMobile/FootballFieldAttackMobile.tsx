import {FC, useState, useEffect, useContext} from 'react'
import styles from './FootballFieldAttackMobile.module.scss'
import FootballProgressCircle from '../FootballProgressCircle/FootballProgressCircle'
import attack from '../../assets/footballField/attack.svg'
import arrowOpen from '../../assets/select-arrows/open-arrow.svg'
import arrowClose from '../../assets/select-arrows/close-arrow.svg'
import MobileFieldOptionsSelector from '../../ui/Selections/MobileFieldOptionsSelector/MobileFiledOptionsSelector'
import { useAppSelector } from '../../types/hooks'
import { calculatePercentage } from '../../utils/calculateCirclePercentage'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'
import field_options_variants from '../../localization/team_detail_info_section/field/field_options_variants.json'


type Metrics = {
    firstTeam: number | undefined,
    secondTeam: number | undefined
}

interface FootballFieldAttackMobileProps {
    selectedGamesCount: number,
    activeTimeGameFrame: number
}

const FootballFieldAttackMobile:FC<FootballFieldAttackMobileProps> = ({selectedGamesCount, activeTimeGameFrame}) => {

    const {language} = useContext(LanguageContext)

    const selectors = [
        {
            id: 2,
            title: language === 'Eng' ? field_options_variants.attack_options.attack.title.eng : field_options_variants.attack_options.attack.title.ru,
            parameters: [
                { id: 1, title: language === 'Eng' ? field_options_variants.attack_options.attack.xG.eng : field_options_variants.attack_options.attack.xG.ru},
                { id: 2, title: language === 'Eng' ? field_options_variants.attack_options.attack.corners.eng : field_options_variants.attack_options.attack.corners.ru},
                { id: 3, title: language === 'Eng' ? field_options_variants.attack_options.attack.offsides.eng : field_options_variants.attack_options.attack.offsides.ru},
                { id: 4, title: language === 'Eng' ? field_options_variants.attack_options.attack.win_coefficient.eng : field_options_variants.attack_options.attack.win_coefficient.ru},
            ]
        },
        {
            id: 1,
            title: language === 'Eng' ? field_options_variants.attack_options.goal_attack.title.eng : field_options_variants.attack_options.goal_attack.title.ru,
            parameters: [
                { id: 1, title: language === 'Eng' ? field_options_variants.attack_options.goal_attack.total_shots.eng : field_options_variants.attack_options.goal_attack.total_shots.ru},
                { id: 2, title: language === 'Eng' ? field_options_variants.attack_options.goal_attack.bch.eng : field_options_variants.attack_options.goal_attack.bch.ru},
                { id: 3, title: language === 'Eng' ? field_options_variants.attack_options.goal_attack.bchm.eng : field_options_variants.attack_options.goal_attack.bchm.ru},
            ]
        }
    ]

    const allFirstTeamFieldMetrics = useAppSelector(state => state.tournamentSlice.firstSelectedTeam?.field)
    const allSecondTeamFieldMetrcis = useAppSelector(state => state.tournamentSlice.secondSelectedTeam?.field)

    const [attackParams, setAttackParams] = useState<Metrics>({
        firstTeam: undefined,
        secondTeam: undefined
    })

    const [goalAttackParams, setGoalAttackParams] = useState<Metrics>({
        firstTeam: undefined,
        secondTeam: undefined
    })



    const [activeAttackParams, setActiveAttackParams] = useState(1)
    const [activeGoalAttackParams, setActiveGoalAttackParams] = useState(1)

    const activeAttackParam = function (activeParam: number) {
        if (activeParam === 1) {
            return 'xG'
        }
        if (activeParam === 2) {
            return 'Corners'
        }
        if (activeParam === 3) {
            return 'Offsides'
        }
        if (activeParam === 4) {
            return 'Win coeff'
        }
    }
    
    const activeAttackGoalParam = function (activeParam: number) {
        if (activeParam === 1) {
            return 'Total shots'
        }
        if (activeParam === 2) {
            return 'Bch'
        }
        if (activeParam === 3) {
            return 'Bchm'
        }
    }

    useEffect(() => {
        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 1) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.attacking.forward.avg_coeff
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 1) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.attacking.forward.avg_coeff
                    })
                }
            }
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 1) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.attacking.forward.avg_coeff
                    })
                }
            }
        }

        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 3) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.attacking.forward.avg_coeff
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 3) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.attacking.forward.avg_coeff
                    })
                }
            }
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 3) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.attacking.forward.avg_coeff
                    })
                }
            }
        }

        
        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 5) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.attacking.forward.avg_coeff
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 5) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.attacking.forward.avg_coeff
                    })
                }
            }
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 5) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.attacking.forward.avg_coeff
                    })
                }
            }
        }

        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 10) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.attacking.forward.avg_coeff
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 10) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.attacking.forward.avg_coeff
                    })
                }
            }
        }
        
        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 10) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.attacking.forward.avg_coeff
                    })
                }
            }
        }

        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 15) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_1.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_1.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_1.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_1.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_1.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_1.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_1.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_1.attacking.forward.avg_coeff
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 15) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.attacking.forward.avg_coeff
                    })
                }
            }
        }

        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 15) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.attacking.forward.avg_coeff
                    })
                }
            }
        }

        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 38) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.forward.avg_coeff
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 38) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.attacking.forward.avg_coeff
                    })
                }
            }
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 38) {
                if (activeAttackParams === 1) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.attacking.forward.xG_sum,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.attacking.forward.xG_sum
                    })
                } else if (activeAttackParams === 2) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.attacking.forward.corners,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.attacking.forward.corners
                    })
                } else if (activeAttackParams === 3) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.attacking.forward.offsides,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.attacking.forward.offsides
                    })
                }
                else if (activeAttackParams === 4) {
                    setAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.attacking.forward.avg_coeff,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.attacking.forward.avg_coeff
                    })
                }
            }
        }
        

    }, [activeAttackParams, allFirstTeamFieldMetrics, allSecondTeamFieldMetrcis, selectedGamesCount, activeTimeGameFrame])

    useEffect(() => {
        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 1) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.attacking.gate_attack.bchm
                    })
                } 
            } 
        }
        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 1) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.attacking.gate_attack.bchm
                    })
                } 
            } 
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 1) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.attacking.gate_attack.bchm
                    })
                } 
            } 
        }

        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 3) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.attacking.gate_attack.bchm
                    })
                } 
            } 
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 3) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.attacking.gate_attack.bchm
                    })
                } 
            } 
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 3) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.attacking.gate_attack.bchm
                    })
                } 
            } 
        }


        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 5) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.attacking.gate_attack.bchm
                    })
                } 
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 5) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.attacking.gate_attack.bchm
                    })
                } 
            }
        }
        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 5) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.attacking.gate_attack.bchm
                    })
                } 
            }
        }

        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 10) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.attacking.gate_attack.bchm
                    })
                } 
            } 
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 10) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.attacking.gate_attack.bchm
                    })
                } 
            } 
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 10) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.attacking.gate_attack.bchm
                    })
                } 
            } 
        }

        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 15) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_1.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_1.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_1.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_1.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_1.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_1.attacking.gate_attack.bchm
                    })
                } 
            } 
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 15) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.attacking.gate_attack.bchm
                    })
                } 
            } 
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 15) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.attacking.gate_attack.bchm
                    })
                } 
            } 
        }

        if (activeTimeGameFrame === 1 ) {
            if (selectedGamesCount === 38) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.gate_attack.bchm
                    })
                } 
            } 
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 38) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.attacking.gate_attack.bchm
                    })
                } 
            } 
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 38) {
                if (activeGoalAttackParams === 1) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.attacking.gate_attack.total_shots,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.attacking.gate_attack.total_shots
                    })
                } else if (activeGoalAttackParams === 2) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.attacking.gate_attack.bch,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.attacking.gate_attack.bch
                    })
                } else if (activeGoalAttackParams === 3) {
                    setGoalAttackParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.attacking.gate_attack.bchm,
                        secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.attacking.gate_attack.bchm
                    })
                } 
            } 
        }
        

    }, [activeGoalAttackParams, allFirstTeamFieldMetrics, allSecondTeamFieldMetrcis, selectedGamesCount, activeTimeGameFrame])


    return (
        <div className={styles.attack_wrapper}>
            <div className={styles.attack}>
                <div className={styles.attack_circle}>
                    <FootballProgressCircle
                        percent={calculatePercentage(goalAttackParams.firstTeam, goalAttackParams.secondTeam)} 
                        width={60}
                        height={60}
                        img={attack}
                        imgHeight={15}
                        imgWidth={15}
                    />
                </div>
            <div className={styles.gate_section}>
                <div className={styles.corner_left}></div>
                <div style={{width: "45px"}}/>
                <div className={styles.gate}>
                <FootballProgressCircle
                        percent={calculatePercentage(attackParams.firstTeam, attackParams.secondTeam)} 
                        width={40}
                        height={40}
                        img={attack}
                        imgHeight={15}
                        imgWidth={15}
                    />
                </div>
                    <div style={{width: "45px"}}/>
                    <div className={styles.corner_right}></div>
                </div>
            </div>
            <div className={styles.attack_filters}>
                <MobileFieldOptionsSelector 
                    img={attack} 
                    selectors={selectors}
                    firstActiveFieldParam={activeAttackParams}
                    secondActiveFieldParam={activeGoalAttackParams}
                    setFirstActiveFieldParam={setActiveAttackParams}
                    setSecondActiveFieldParam={setActiveGoalAttackParams}
                />
            </div>
        </div>
    )
}

export default FootballFieldAttackMobile