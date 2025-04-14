import React, { FC, useState, useEffect, useContext } from 'react'
import styles from './FieldDefence.module.scss'
import defence from '../../assets/footballField/defence.svg'
import FootballFieldSelection from '../../ui/Selections/FootballFieldSelection/FootballFieldSelection'
import { useAppSelector } from '../../types/hooks'
import { IMG_PATH } from '../../api/variables'
import line1 from '../../assets/football_filed_arrows/line1.svg'
import line2 from '../../assets/football_filed_arrows/line2.svg'
import FootballFieldCircle from '../FootballFieldCircle/FootballFieldCircle'
import FieldStatSelectTeam from '../../ui/Selections/FieldStatSelectTeam/FieldStatSelectTeam'
import FootballProgressCircle from '../FootballProgressCircle/FootballProgressCircle'
import { calculatePercentage } from '../../utils/calculateCirclePercentage'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'
import field_options from '../../localization/team_detail_info_section/field/field_options.json'
import field_options_variants from '../../localization/team_detail_info_section/field/field_options_variants.json';
import { RootState } from '../../redux/store'
import { useFetchChampionshipInfoQuery } from '../../services/championships-api/championship-api'

interface FieldDefence {
    selectedGamesCount: number,
    activeTimeFrame: {
        gametimeframe_1: number,
        gametimeframe_3: number,
        gametimeframe_5: number,
        gametimeframe_10: number,
        gametimeframe_15: number,
        gametimeframe_all: number
    },
}

type Metric = {
    firstTeam: number | undefined,
    secondeTeam: number | undefined
}

const FieldDefence: FC<FieldDefence> = ({ selectedGamesCount, activeTimeFrame }) => {

    const { language } = useContext(LanguageContext)

    const selectors = [
        {
            id: 1,
            title: language === 'Eng' ? field_options_variants.defense_options.defense_goal.title.eng : field_options_variants.defense_options.defense_goal.title.ru,
            parameters: [
                {
                    id: 1,
                    title: language === 'Eng' ? field_options_variants.defense_options.defense_goal.opponent_shots_on_target.eng : field_options_variants.defense_options.defense_goal.opponent_shots_on_target.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.defense_options.defense_goal.opponent_shots_on_target.eng_tip : field_options_variants.defense_options.defense_goal.opponent_shots_on_target.ru_tip
                },
                {
                    id: 2,
                    title: language === 'Eng' ? field_options_variants.defense_options.defense_goal.opponent_bch.eng : field_options_variants.defense_options.defense_goal.opponent_bch.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.defense_options.defense_goal.opponent_bch.eng_tip : field_options_variants.defense_options.defense_goal.opponent_bch.ru_tip
                },
                {
                    id: 3,
                    title: language === 'Eng' ? field_options_variants.defense_options.defense_goal.opponent_bchm.eng : field_options_variants.defense_options.defense_goal.opponent_bchm.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.defense_options.defense_goal.opponent_bchm.eng_tip : field_options_variants.defense_options.defense_goal.opponent_bchm.ru_tip
                },
            ]
        },
        {
            id: 2,
            title: language === 'Eng' ? field_options_variants.defense_options.defense.title.eng : field_options_variants.defense_options.defense.title.ru,
            parameters: [
                {
                    id: 1,
                    title: language === 'Eng' ? field_options_variants.defense_options.defense.opponent_xG.eng : field_options_variants.defense_options.defense.opponent_xG.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.defense_options.defense.opponent_xG.eng_tip : field_options_variants.defense_options.defense.opponent_xG.ru_tip,
                },
                {
                    id: 2,
                    title: language === 'Eng' ? field_options_variants.defense_options.defense.opponent_corners.eng : field_options_variants.defense_options.defense.opponent_corners.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.defense_options.defense.opponent_corners.eng_tip : field_options_variants.defense_options.defense.opponent_corners.ru_tip,
                },
                {
                    id: 3,
                    title: language === 'Eng' ? field_options_variants.defense_options.defense.opponent_offsides.eng : field_options_variants.defense_options.defense.opponent_offsides.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.defense_options.defense.opponent_offsides.eng_tip : field_options_variants.defense_options.defense.opponent_offsides.ru_tip,
                },
                {
                    id: 4,
                    title: language === 'Eng' ? field_options_variants.defense_options.defense.lose_coefficient.eng : field_options_variants.defense_options.defense.lose_coefficient.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.defense_options.defense.lose_coefficient.eng_tip : field_options_variants.defense_options.defense.lose_coefficient.ru_tip,
                },
            ]
        }
    ]

    const activeDefenceMetric = function (activeParam: number) {
        if (activeParam === 1) {
            return language === 'Eng' ? field_options_variants.defense_options.defense.opponent_xG.eng_short : field_options_variants.defense_options.defense.opponent_xG.ru_short
        }
        if (activeParam === 2) {
            return language === 'Eng' ? field_options_variants.defense_options.defense.opponent_corners.eng_short : field_options_variants.defense_options.defense.opponent_corners.ru_short
        }
        if (activeParam === 3) {
            return language === 'Eng' ? field_options_variants.defense_options.defense.opponent_offsides.eng_short : field_options_variants.defense_options.defense.opponent_offsides.ru_short
        }
        if (activeParam === 4) {
            return language === 'Eng' ? field_options_variants.defense_options.defense.lose_coefficient.eng_short : field_options_variants.defense_options.defense.lose_coefficient.ru_short
        }
    }

    const activeDefenceGoalMetric = function (activeParam: number) {
        if (activeParam === 1) {
            return language === 'Eng' ? field_options_variants.defense_options.defense_goal.opponent_shots_on_target.eng_short : field_options_variants.defense_options.defense_goal.opponent_shots_on_target.ru_short
        }
        if (activeParam === 2) {
            return language === 'Eng' ? field_options_variants.defense_options.defense_goal.opponent_bch.eng_short : field_options_variants.defense_options.defense_goal.opponent_bch.ru_short
        }
        if (activeParam === 3) {
            return language === 'Eng' ? field_options_variants.defense_options.defense_goal.opponent_bchm.eng_short : field_options_variants.defense_options.defense_goal.opponent_bchm.ru_short
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

    const fieldH2h = useAppSelector((state:RootState) => state.tournamentSlice.h2h.isH2h.field)
    const fieldParams = useAppSelector((state: RootState) => state.tournamentSlice.h2h.fieldParams)

    const allFirstTeamFieldMetrics = useAppSelector(state => state.tournamentSlice.firstSelectedTeam?.field)
    const allSecondTeamFieldMetrcis = useAppSelector(state => state.tournamentSlice.secondSelectedTeam?.field)

    // useEffect(() => {
    //     if (isH2h) {
    //         setGateParams({
    //             firstTeam: fieldParams.firstTeamH2h,
    //             secondeTeam: fieldParams.secondTeamH2h
    //         })
    //         setDefenceParams({
    //             firstTeam: fieldParams.firstTeamH2h,
    //             secondeTeam: fieldParams.secondTeamH2h
    //         })
    //     }
    // }, [isH2h])

    const [activeGateParam, setActiveGateParam] = useState(1)
    const [activeDefenceParam, setActiveDefenceParam] = useState(1)


    const firstSelectedTeamImg = useAppSelector(state => state.tournamentSlice.firstSelectedTeam?.team_img)

//    console.log(defenceParams, 'defence params', isH2h, 'is H2h active')

    // console.log(gateParams)
    // console.log(defenceParams)

    useEffect(() => {

        if (activeTimeFrame.gametimeframe_1 === 1) {
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

        if (activeTimeFrame.gametimeframe_1 === 2) {
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

        if (activeTimeFrame.gametimeframe_1 === 3) {
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

        if (activeTimeFrame.gametimeframe_3 === 1) {
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

        if (activeTimeFrame.gametimeframe_3 === 2) {
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

        if (activeTimeFrame.gametimeframe_3 === 3) {
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

        if (activeTimeFrame.gametimeframe_5 === 1) {
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

        if (activeTimeFrame.gametimeframe_5 === 2) {
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


        if (activeTimeFrame.gametimeframe_5 === 3) {
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


        if (activeTimeFrame.gametimeframe_10 === 1) {
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

        if (activeTimeFrame.gametimeframe_10 === 2) {
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

        if (activeTimeFrame.gametimeframe_10 === 3) {
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


        if (activeTimeFrame.gametimeframe_15 === 1) {
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

        if (activeTimeFrame.gametimeframe_15 === 2) {
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

        if (activeTimeFrame.gametimeframe_15 === 3) {
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


        if (activeTimeFrame.gametimeframe_all === 1) {
            if (selectedGamesCount === 38) {
                if (activeDefenceParam === 1) {
                    if (fieldH2h) {
                        setDefenceParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.defense.defenders.xG_sum_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.defense.defenders.xG_sum_opponent
                        })
                    } else if (!fieldH2h) {
                        setDefenceParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.defense.defenders.xG_sum_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.defense.defenders.xG_sum_opponent
                        })
                    }
                } else if (activeDefenceParam === 2) {
                    if (fieldH2h) {
                        setDefenceParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.defense.defenders.corners_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.defense.defenders.corners_opponent
                        })
                    } else if (!fieldH2h) {
                        setDefenceParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.defense.defenders.corners_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.defense.defenders.corners_opponent
                        })
                    }
                } else if (activeDefenceParam === 3) {
                    if (fieldH2h) {
                        setDefenceParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.defense.defenders.offsides_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.defense.defenders.offsides_opponent
                        })
                    } else if (!fieldH2h) {
                        setDefenceParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.average.time_1.defense.defenders.offsides_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.average.time_1.defense.defenders.offsides_opponent
                        })
                    }
                } else if (activeDefenceParam === 4) {
                    setDefenceParams({
                        firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.defense.defenders.avg_coeff_opponent,
                        secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.defense.defenders.avg_coeff_opponent
                    })
                }
            }
        }

        if (activeTimeFrame.gametimeframe_all === 2) {
            if (selectedGamesCount === 38) {
                if (activeDefenceParam === 1) {
                    if (fieldH2h) {
                        setDefenceParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_2.defense.defenders.xG_sum_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.time_2.defense.defenders.xG_sum_opponent
                        })
                    } else if (!fieldH2h) {
                        setDefenceParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.defense.defenders.xG_sum_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.defense.defenders.xG_sum_opponent
                        })
                    }
                } else if (activeDefenceParam === 2) {
                    if (fieldH2h) {
                        setDefenceParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_2.defense.defenders.corners_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.time_2.defense.defenders.corners_opponent
                        })
                    } else if (!fieldH2h) {
                        setDefenceParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.defense.defenders.corners_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.defense.defenders.corners_opponent
                        })
                    }
                } else if (activeDefenceParam === 3) {
                    if (fieldParams) {
                        setDefenceParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_2.defense.defenders.offsides_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.time_2.defense.defenders.offsides_opponent
                        })
                    } else if (!fieldH2h) {
                        setDefenceParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.defense.defenders.offsides_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.defense.defenders.offsides_opponent
                        })
                    }
                } else if (activeDefenceParam === 4) {
                    if (fieldH2h) {
                        setDefenceParams({
                            firstTeam: fieldParams?.firstTeamH2h.timeframe_all.time_2.defense.defenders.avg_coeff_opponent,
                            secondeTeam: fieldParams?.secondTeamH2h.timeframe_all.time_2.defense.defenders.avg_coeff_opponent
                        })
                    } else if (!fieldH2h) {
                        setDefenceParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.defense.defenders.avg_coeff_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.defense.defenders.avg_coeff_opponent
                        })
                    }
                }
            }
        }

        if (activeTimeFrame.gametimeframe_all === 3) {
            if (selectedGamesCount === 38) {
                if (activeDefenceParam === 1) {
                    if (fieldH2h) {
                        setDefenceParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.full_time.defense.defenders.xG_sum_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.full_time.defense.defenders.xG_sum_opponent
                        })
                    } else if (!fieldH2h) {
                        setDefenceParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.defense.defenders.xG_sum_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.defense.defenders.xG_sum_opponent
                        })
                    }
                } else if (activeDefenceParam === 2) {
                    if (fieldH2h) {
                        setDefenceParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.full_time.defense.defenders.corners_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.full_time.defense.defenders.corners_opponent
                        })
                    } else if (!fieldH2h) {
                        setDefenceParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.defense.defenders.corners_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.defense.defenders.corners_opponent
                        })
                    }
                } else if (activeDefenceParam === 3) {
                    if (fieldH2h) {
                        setDefenceParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.full_time.defense.defenders.offsides_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.full_time.defense.defenders.offsides_opponent
                        })
                    } else if (!fieldH2h) {
                        setDefenceParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.defense.defenders.offsides_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.defense.defenders.offsides_opponent
                        })
                    }
                } else if (activeDefenceParam === 4) {
                    if (fieldH2h) {
                        setDefenceParams({
                            firstTeam: fieldParams?.firstTeamH2h.timeframe_all.full_time.defense.defenders.avg_coeff_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.full_time.defense.defenders.avg_coeff_opponent
                        })
                    } else if (!fieldH2h) {
                        setDefenceParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.defense.defenders.avg_coeff_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.defense.defenders.avg_coeff_opponent
                        })
                    }
                }
            }
        }

    }, [activeDefenceParam, allFirstTeamFieldMetrics, allSecondTeamFieldMetrcis, selectedGamesCount, activeTimeFrame, fieldH2h, fieldParams])

    useEffect(() => {

        if (activeTimeFrame.gametimeframe_1 === 1) {
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

        if (activeTimeFrame.gametimeframe_1 === 2) {
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

        if (activeTimeFrame.gametimeframe_1 === 3) {
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

        if (activeTimeFrame.gametimeframe_3 === 1) {
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

        if (activeTimeFrame.gametimeframe_3 === 2) {
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

        if (activeTimeFrame.gametimeframe_3 === 3) {
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

        if (activeTimeFrame.gametimeframe_5 === 1) {
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

        if (activeTimeFrame.gametimeframe_5 === 2) {
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

        if (activeTimeFrame.gametimeframe_5 === 3) {
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


        if (activeTimeFrame.gametimeframe_10 === 1) {
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

        if (activeTimeFrame.gametimeframe_10 === 2) {
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


        if (activeTimeFrame.gametimeframe_10 === 3) {
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


        if (activeTimeFrame.gametimeframe_15 === 1) {
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

        if (activeTimeFrame.gametimeframe_15 === 2) {
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

        if (activeTimeFrame.gametimeframe_15 === 3) {
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


        if (activeTimeFrame.gametimeframe_all === 1) {
            if (selectedGamesCount === 38) {
                if (activeGateParam === 1) {
                    if (fieldH2h) {
                        setGateParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.defense.goalkeeper.total_shots_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.defense.goalkeeper.total_shots_opponent
                        })
                    } else if (!fieldH2h) {
                        setGateParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.defense.goalkeeper.total_shots_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.defense.goalkeeper.total_shots_opponent
                        })
                    }
                } else if (activeGateParam === 2) {
                    if (fieldH2h) {
                        setGateParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.defense.goalkeeper.bch_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.defense.goalkeeper.bch_opponent
                        })
                    } else if (!fieldH2h) {
                        setGateParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.defense.goalkeeper.bch_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.defense.goalkeeper.bch_opponent
                        })
                    }
                } else if (activeGateParam === 3) {
                    if (fieldH2h) {
                        setGateParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.defense.goalkeeper.bchm_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.defense.goalkeeper.bchm_opponent
                        })
                    } else if (!fieldH2h) {
                        setGateParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.defense.goalkeeper.bchm_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.defense.goalkeeper.bchm_opponent
                        })
                    }
                }
            }
        }

        if (activeTimeFrame.gametimeframe_all === 2) {
            if (selectedGamesCount === 38) {
                if (activeGateParam === 1) {
                    if (fieldH2h) {
                        setGateParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_2.defense.goalkeeper.total_shots_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.time_2.defense.goalkeeper.total_shots_opponent
                        })
                    } else if (!fieldH2h) {
                        setGateParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.defense.goalkeeper.total_shots_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.defense.goalkeeper.total_shots_opponent
                        })
                    }
                } else if (activeGateParam === 2) {
                    if (fieldH2h) {
                        setGateParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_2.defense.goalkeeper.bch_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.time_2.defense.goalkeeper.bch_opponent
                        })
                    } else if (!fieldH2h) {
                        setGateParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.defense.goalkeeper.bch_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.defense.goalkeeper.bch_opponent
                        })
                    }
                } else if (activeGateParam === 3) {
                    if (fieldH2h) {
                        setGateParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_2.defense.goalkeeper.bchm_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.time_2.defense.goalkeeper.bchm_opponent
                        })
                    } else if (!fieldH2h) {
                        setGateParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.defense.goalkeeper.bchm_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.defense.goalkeeper.bchm_opponent
                        })
                    }
                }
            }
        }

        if (activeTimeFrame.gametimeframe_all === 3) {
            if (selectedGamesCount === 38) {
                if (activeGateParam === 1) {
                    if (fieldH2h) {
                        setGateParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.full_time.defense.goalkeeper.total_shots_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.full_time.defense.goalkeeper.total_shots_opponent
                        })
                    } else if (!fieldH2h) {
                        setGateParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.defense.goalkeeper.total_shots_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.defense.goalkeeper.total_shots_opponent
                        })
                    }
                } else if (activeGateParam === 2) {
                    if (fieldH2h) {
                        setGateParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.full_time.defense.goalkeeper.bch_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.full_time.defense.goalkeeper.bch_opponent
                        })
                    } else if (!fieldH2h) {
                        setGateParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.defense.goalkeeper.bch_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.defense.goalkeeper.bch_opponent
                        })
                    }
                } else if (activeGateParam === 3) {
                    if (fieldH2h) {
                        setGateParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.full_time.defense.goalkeeper.bchm_opponent,
                            secondeTeam: fieldParams.secondTeamH2h?.timeframe_all.full_time.defense.goalkeeper.bchm_opponent
                        })
                    } else if (!fieldH2h) {
                        setGateParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.defense.goalkeeper.bchm_opponent,
                            secondeTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.defense.goalkeeper.bchm_opponent
                        })
                    }
                }
            }
        }

    }, [activeGateParam, allFirstTeamFieldMetrics, allSecondTeamFieldMetrcis, selectedGamesCount, activeTimeFrame, fieldH2h, fieldParams])


    // console.log(gateParams)
    // console.log(defenceParams)

    const { championshipId, season } = useAppSelector(state => state.tournamentSlice)
    const { data } = useFetchChampionshipInfoQuery({ championshipId, season })


    const topParams = {
        defence: language === 'Eng' ? 'D:' : 'З:',
        goal_defence: language === 'Eng' ? 'GD' : 'ЗВ:'
    }

    return (
        <div className={styles.defence_wrapper}>
            <div className={styles.defence_header}>
                <span style={{ padding: '10px 10px 0 10px' }}>{topParams.defence} {activeDefenceGoalMetric(activeGateParam)} / {topParams.goal_defence} {activeDefenceMetric(activeDefenceParam)}</span>
                <FootballFieldSelection
                    onClose={() => null}
                    selectors={selectors}
                    typeVariant="defense"
                    setFirstActiveFieldParam={setActiveGateParam}
                    firstActiveFieldParam={activeGateParam}
                    secondActiveFieldParam={activeDefenceParam}
                    setSecondActiveFieldParam={setActiveDefenceParam}
                    ruTitle={field_options.defense.ru}
                    engTitle={field_options.defense.eng}
                />
            </div>
            <div className={styles.defence}>
                <div className={styles.defence_field_elements}>
                    <div className={styles.corner_top_left}>
                    </div>
                    <div className={styles.team_logo_wrapper} style={{ top: '10px', left: '18px' }}>
                        <div className={styles.img}>
                            <img src={`${IMG_PATH}${firstSelectedTeamImg}`} alt="" />
                        </div>
                        <img src={line1} alt="" />
                    </div>
                    <div className={styles.team_logo_wrapper} style={{ bottom: '10px', left: '5px' }}>
                        <FieldStatSelectTeam
                            defaultValue={''} selectors={data?.teams}
                        />
                        <img src={line2} alt="" />
                    </div>
                    <div className={styles.goalkeeper_zone}>
                        <FootballProgressCircle
                            percent={calculatePercentage(gateParams.firstTeam, gateParams.secondeTeam)}
                            width={50}
                            height={50}
                            img={defence}
                            imgHeight={20}
                            imgWidth={20}
                        />
                    </div>
                    <div className={styles.corner_bottom_left}>
                    </div>
                </div>
                <div className={styles.defence_params}>
                    <FootballProgressCircle
                        percent={calculatePercentage(defenceParams.firstTeam, defenceParams.secondeTeam)}
                        width={80}
                        height={80}
                        img={defence}
                        imgHeight={25}
                        imgWidth={25}
                    />
                </div>
            </div>
        </div>
    )
}

export default FieldDefence