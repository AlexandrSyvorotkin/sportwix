import { FC, useState, useEffect, useContext } from 'react'
import styles from './FootballFieldDefenseMobile.module.scss'
import { useAppSelector } from '../../types/hooks'
import { ITeam } from '../../models/ITeam'
import { IMG_PATH } from '../../api/variables'
import line1 from '../../assets/football_filed_arrows/line1.svg'
import line2 from '../../assets/football_filed_arrows/line2.svg'
import defence from '../../assets/footballField/defence.svg'
import FootballProgressCircle from '../FootballProgressCircle/FootballProgressCircle'
import FieldStatSelectTeam from '../../ui/Selections/FieldStatSelectTeam/FieldStatSelectTeam'
import arrowOpen from '../../assets/select-arrows/open-arrow.svg'
import arrowClose from '../../assets/select-arrows/close-arrow.svg'
import FootballFieldSelection from '../../ui/Selections/FootballFieldSelection/FootballFieldSelection'
import MobileFieldOptionsSelector from '../../ui/Selections/MobileFieldOptionsSelector/MobileFiledOptionsSelector'
import { calculatePercentage } from '../../utils/calculateCirclePercentage'
import { RootState } from '../../redux/store'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'
import field_options_variants from '../../localization/team_detail_info_section/field/field_options_variants.json'
import { useFetchChampionshipInfoQuery } from '../../services/championships-api/championship-api'

type Metric = {
    firstTeam: number | undefined,
    secondeTeam: number | undefined
}

interface FootballFieldDefenseMobileProps {
    selectedGamesCount: number,
    activeTimeGameFrame: number
}

const FootballFieldDefenseMobile: FC<FootballFieldDefenseMobileProps> = ({selectedGamesCount, activeTimeGameFrame}) => {

    const firstTeam = useAppSelector((state: RootState) => state.tournamentSlice.firstSelectedTeam)
    
    const {championshipId, season} = useAppSelector(state => state.tournamentSlice)
    const {data} = useFetchChampionshipInfoQuery({championshipId, season})

    const {language} = useContext(LanguageContext)


    const selectors = [
        {
            id: 1,
            title: language === 'Eng' ? field_options_variants.defense_options.defense_goal.title.eng : field_options_variants.defense_options.defense_goal.title.ru,
            parameters: [
                { id: 1, title: language === 'Eng' ? field_options_variants.defense_options.defense_goal.opponent_shots_on_target.eng : field_options_variants.defense_options.defense_goal.opponent_shots_on_target.ru},
                { id: 2, title: language === 'Eng' ? field_options_variants.defense_options.defense_goal.opponent_bch.eng : field_options_variants.defense_options.defense_goal.opponent_bch.ru},
                { id: 3, title: language === 'Eng' ? field_options_variants.defense_options.defense_goal.opponent_bchm.eng : field_options_variants.defense_options.defense_goal.opponent_bchm.ru},
            ]
        },
        {
            id: 2,
            title: language === 'Eng' ? field_options_variants.defense_options.defense.title.eng : field_options_variants.defense_options.defense.title.ru,
            parameters: [
                { id: 1, title: language === 'Eng' ? field_options_variants.defense_options.defense.opponent_xG.eng : field_options_variants.defense_options.defense.opponent_xG.ru},
                { id: 2, title: language === 'Eng' ? field_options_variants.defense_options.defense.opponent_corners.eng : field_options_variants.defense_options.defense.opponent_corners.ru},
                { id: 3, title: language === 'Eng' ? field_options_variants.defense_options.defense.opponent_offsides.eng : field_options_variants.defense_options.defense.opponent_offsides.ru},
                { id: 4, title: language === 'Eng' ? field_options_variants.defense_options.defense.lose_coefficient.eng : field_options_variants.defense_options.defense.lose_coefficient.ru},
            ]
        }
    ]
    
    const activeDefenceMetric = function (activeParam: number) {
        if (activeParam === 1) {
            return 'Op xG'
        }
        if (activeParam === 2) {
            return 'Op Corners'
        }
        if (activeParam === 3) {
            return 'Op offsides'
        }
        if (activeParam === 4) {
            return 'Lose coeff'
        }
    }
    
    const activeDefenceGoalMetric = function (activeParam: number) {
        if (activeParam === 1) {
            return 'Op shots'
        }
        if (activeParam === 2) {
            return 'Op Bch'
        }
        if (activeParam === 3) {
            return 'Op Bchm'
        }
    }

    const [gateParams, setGateParams] = useState<Metric>({
        firstTeam: undefined,
        secondeTeam: undefined
    })

    const [defenceParams, setDefenceParams] = useState<Metric>({
        firstTeam: undefined,
        secondeTeam: undefined
    })

    const [activeGateParam, setActiveGateParam] = useState(1)
    const [activeDefenceParam, setActiveDefenceParam] = useState(1)




    const allFirstTeamFieldMetrics = useAppSelector(state => state.tournamentSlice.firstSelectedTeam?.field)
    const allSecondTeamFieldMetrcis = useAppSelector(state => state.tournamentSlice.secondSelectedTeam?.field)


    useEffect(() => {

        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 1) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        } 

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 1) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        } 

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 1) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        } 

        if  (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 3) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        } 

        if  (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 3) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        } 

        if  (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 3) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        } 

        if(activeTimeGameFrame === 1) {
            if (selectedGamesCount === 5) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        }

        if(activeTimeGameFrame === 2) {
            if (selectedGamesCount === 5) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        }


        if(activeTimeGameFrame === 3) {
            if (selectedGamesCount === 5) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        }


        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 10) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 10) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 10) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 15) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_1.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_1.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_1.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_1.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_1.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_1.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_1.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_1.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 15) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 15) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        }


        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 38) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 38) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 38) {
                if (activeDefenceParam === 1) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.defense.defenders.xG_sum_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.defense.defenders.xG_sum_opponent
                    })
                } else if (activeDefenceParam === 2) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.defense.defenders.corners_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.defense.defenders.corners_opponent
                    })
                } else if (activeDefenceParam === 3) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.defense.defenders.offsides_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.defense.defenders.offsides_opponent
                    })
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        }

    }, [activeDefenceParam, allFirstTeamFieldMetrics, allSecondTeamFieldMetrcis, selectedGamesCount, activeTimeGameFrame])

    useEffect(() => {

        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 1) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_1.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_1.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 1) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.time_2.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.time_2.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 1) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_1.average.full_time.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_1.average.full_time.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 3) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_1.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_1.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 3) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.time_2.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.time_2.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 3) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_3.average.full_time.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_3.average.full_time.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 5) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_1.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_1.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 5) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.time_2.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.time_2.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 5) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_5.average.full_time.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_5.average.full_time.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }


        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 10) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_1.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_1.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 10) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.time_2.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.time_2.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }


        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 10) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_10.average.full_time.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_10.average.full_time.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }


        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 15) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 15) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.time_2.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.time_2.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 15) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_15.average.full_time.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_15.average.full_time.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }


        if (activeTimeGameFrame === 1) {
            if (selectedGamesCount === 38) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 2) {
            if (selectedGamesCount === 38) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }

        if (activeTimeGameFrame === 3) {
            if (selectedGamesCount === 38) {
                if (activeGateParam === 1) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.defense.goalkeeper.total_shots_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.defense.goalkeeper.total_shots_opponent
                    })
                } else if (activeGateParam === 2) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.defense.goalkeeper.bch_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.defense.goalkeeper.bch_opponent
                    })
                } else if (activeGateParam === 3) {
                    setGateParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.defense.goalkeeper.bchm_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.defense.goalkeeper.bchm_opponent
                    })
                }
            }
        }

    }, [activeGateParam, allFirstTeamFieldMetrics, allSecondTeamFieldMetrcis, selectedGamesCount, activeTimeGameFrame])

    
    return (
        <div className={styles.defense_wrapper}>
            <div className={styles.defense}>
                <div className={styles.gate_section}>
                    <div className={styles.corner_left}></div>
                    <div className={styles.team}>
                        <div className={styles.img_wrapper}>
                            <img src={`${IMG_PATH}${firstTeam?.team_img}`} alt="" />
                        </div>
                        <div className={styles.arrow}>
                            <img src={line1} alt="" />
                        </div>
                    </div>
                    <div className={styles.gate}>
                        <FootballProgressCircle
                            percent={calculatePercentage(gateParams.firstTeam, gateParams.secondeTeam)}
                            width={40}
                            height={40}
                            img={defence}
                            imgHeight={15}
                            imgWidth={15}
                        />
                    </div>
                    <div className={styles.team}>
                        <FieldStatSelectTeam
                            defaultValue={''} selectors={data?.teams}
                        />
                        <div className={styles.arrow}>
                            <img src={line2} alt="" />
                        </div>
                    </div>
                    <div className={styles.corner_right}></div>
                </div>
                <div className={styles.circle}>
                    <FootballProgressCircle
                        percent={calculatePercentage(gateParams.firstTeam, gateParams.secondeTeam)}
                        width={60}
                        height={60}
                        img={defence}
                        imgHeight={15}
                        imgWidth={15}
                    />
                </div>
            </div>
            <div className={styles.defense_filters}>
                <MobileFieldOptionsSelector img={defence} selectors={selectors}
                    firstActiveFieldParam={activeGateParam}
                    setFirstActiveFieldParam={setActiveGateParam}
                    secondActiveFieldParam={activeDefenceParam}
                    setSecondActiveFieldParam={setActiveDefenceParam}
                />
            </div>
        </div>
    )
}

export default FootballFieldDefenseMobile