import React, { FC, useState, useEffect, useContext } from "react";
import styles from './FieldAttack.module.scss'
import attack from '../../assets/footballField/attack.svg'
import FootballFieldSelection from "../../ui/Selections/FootballFieldSelection/FootballFieldSelection";
import FootballFieldCircle from "../FootballFieldCircle/FootballFieldCircle";
import { useAppSelector } from '../../types/hooks'
import FootballProgressCircle from "../FootballProgressCircle/FootballProgressCircle";
import { calculatePercentage } from "../../utils/calculateCirclePercentage";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import field_options from '../../localization/team_detail_info_section/field/field_options.json'
import field_options_variants from '../../localization/team_detail_info_section/field/field_options_variants.json'
import { RootState } from "../../redux/store";

type Metrics = {
    firstTeam: number | undefined,
    secondTeam: number | undefined
}

interface FieldAttackProps {
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

const FieldAttack: FC<FieldAttackProps> = ({ selectedGamesCount, activeTimeFrame }) => {

    const { language } = useContext(LanguageContext)

    const selectors = [
        {
            id: 2,
            title: language === 'Eng' ? field_options_variants.attack_options.attack.title.eng : field_options_variants.attack_options.attack.title.ru,
            parameters: [
                {
                    id: 1,
                    title: language === 'Eng' ? field_options_variants.attack_options.attack.xG.eng : field_options_variants.attack_options.attack.xG.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.attack_options.attack.xG.eng_tip : field_options_variants.attack_options.attack.xG.ru_tip
                },
                {
                    id: 2,
                    title: language === 'Eng' ? field_options_variants.attack_options.attack.corners.eng : field_options_variants.attack_options.attack.corners.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.attack_options.attack.corners.eng_tip : field_options_variants.attack_options.attack.corners.ru_tip
                },
                {
                    id: 3,
                    title: language === 'Eng' ? field_options_variants.attack_options.attack.offsides.eng : field_options_variants.attack_options.attack.offsides.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.attack_options.attack.offsides.eng_tip : field_options_variants.attack_options.attack.offsides.ru_tip
                },
                {
                    id: 4,
                    title: language === 'Eng' ? field_options_variants.attack_options.attack.win_coefficient.eng : field_options_variants.attack_options.attack.win_coefficient.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.attack_options.attack.win_coefficient.eng_tip : field_options_variants.attack_options.attack.win_coefficient.ru_tip
                },
            ]
        },
        {
            id: 1,
            title: language === 'Eng' ? field_options_variants.attack_options.goal_attack.title.eng : field_options_variants.attack_options.goal_attack.title.ru,
            parameters: [
                {
                    id: 1,
                    title: language === 'Eng' ? field_options_variants.attack_options.goal_attack.total_shots.eng : field_options_variants.attack_options.goal_attack.total_shots.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.attack_options.goal_attack.total_shots.eng_tip : field_options_variants.attack_options.goal_attack.total_shots.ru_tip
                },
                {
                    id: 2,
                    title: language === 'Eng' ? field_options_variants.attack_options.goal_attack.bch.eng : field_options_variants.attack_options.goal_attack.bch.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.attack_options.goal_attack.bch.eng_tip : field_options_variants.attack_options.goal_attack.bch.ru_tip
                },
                {
                    id: 3,
                    title: language === 'Eng' ? field_options_variants.attack_options.goal_attack.bchm.eng : field_options_variants.attack_options.goal_attack.bchm.ru,
                    tooltipText: language === 'Eng' ? field_options_variants.attack_options.goal_attack.bchm.eng_tip : field_options_variants.attack_options.goal_attack.bchm.ru_tip
                },
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
            return language === 'Eng' ? field_options_variants.attack_options.attack.xG.eng_short : field_options_variants.attack_options.attack.xG.ru_short
        }
        if (activeParam === 2) {
            return language === 'Eng' ? field_options_variants.attack_options.attack.corners.eng_short : field_options_variants.attack_options.attack.corners.ru_short
        }
        if (activeParam === 3) {
            return language === 'Eng' ? field_options_variants.attack_options.attack.offsides.eng_short : field_options_variants.attack_options.attack.offsides.ru_short
        }
        if (activeParam === 4) {
            return language === 'Eng' ? field_options_variants.attack_options.attack.win_coefficient.eng_short : field_options_variants.attack_options.attack.win_coefficient.ru_short
        }
    }

    const activeAttackGoalParam = function (activeParam: number) {
        if (activeParam === 1) {
            return language === 'Eng' ? field_options_variants.attack_options.goal_attack.total_shots.eng_short : field_options_variants.attack_options.goal_attack.total_shots.ru_short
        }
        if (activeParam === 2) {
            return language === 'Eng' ? field_options_variants.attack_options.goal_attack.bch.eng_short : field_options_variants.attack_options.goal_attack.bch.ru_short
        }
        if (activeParam === 3) {
            return language === 'Eng' ? field_options_variants.attack_options.goal_attack.bchm.eng_short : field_options_variants.attack_options.goal_attack.bchm.ru_short
        }
    }

    // console.log(goalAttackParams)

    const fieldH2h = useAppSelector((state: RootState) => state.tournamentSlice.h2h.isH2h.field)
    const fieldParams = useAppSelector((state: RootState) => state.tournamentSlice.h2h.fieldParams)

    useEffect(() => {
        if (activeTimeFrame.gametimeframe_1 === 1) {
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

        if (activeTimeFrame.gametimeframe_1 === 2) {
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

        if (activeTimeFrame.gametimeframe_1 === 3) {
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

        if (activeTimeFrame.gametimeframe_3 === 1) {
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

        if (activeTimeFrame.gametimeframe_3 === 2) {
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

        if (activeTimeFrame.gametimeframe_3 === 3) {
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

        if (activeTimeFrame.gametimeframe_5 === 1) {
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

        if (activeTimeFrame.gametimeframe_5 === 2) {
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

        if (activeTimeFrame.gametimeframe_5 === 3) {
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

        if (activeTimeFrame.gametimeframe_10 === 1) {
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

        if (activeTimeFrame.gametimeframe_10 === 2) {
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

        if (activeTimeFrame.gametimeframe_10 === 3) {
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

        if (activeTimeFrame.gametimeframe_15 === 1) {
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

        if (activeTimeFrame.gametimeframe_15 === 2) {
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

        if (activeTimeFrame.gametimeframe_15 === 1) {
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

        if (activeTimeFrame.gametimeframe_all === 1) {
            if (selectedGamesCount === 38) {
                if (activeAttackParams === 1) {
                    if (fieldH2h) {
                        setAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.attacking.forward.xG_sum,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.attacking.forward.xG_sum
                        })
                    } else if (!fieldH2h) {
                        setAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.forward.xG_sum,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.forward.xG_sum
                        })
                    }
                } else if (activeAttackParams === 2) {
                    if (fieldH2h) {
                        setAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.attacking.forward.corners,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.attacking.forward.corners
                        })
                    } else if (!fieldH2h) {
                        setAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.forward.corners,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.forward.corners
                        })
                    }
                } else if (activeAttackParams === 3) {
                    if (fieldH2h) {
                        setAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.attacking.forward.offsides,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.attacking.forward.offsides
                        })
                    } else if (!fieldH2h) {
                        setAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.forward.offsides,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.forward.offsides
                        })
                    }
                }
                else if (activeAttackParams === 4) {
                    if (fieldH2h) {
                        setAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.attacking.forward.avg_coeff,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.attacking.forward.avg_coeff
                        })
                    } else if (!fieldH2h) {
                        setAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.forward.avg_coeff,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.forward.avg_coeff
                        })
                    }
                }
            }
        }

        if (activeTimeFrame.gametimeframe_all === 2) {
            if (selectedGamesCount === 38) {
                if (activeAttackParams === 1) {
                    if (fieldH2h) {
                        setAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_2.attacking.forward.xG_sum,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_2.attacking.forward.xG_sum
                        })
                    } else if (!fieldH2h) {
                        setAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.attacking.forward.xG_sum,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.attacking.forward.xG_sum
                        })
                    }
                } else if (activeAttackParams === 2) {
                    if (fieldH2h) {
                        setAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_2.attacking.forward.corners,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_2.attacking.forward.corners
                        })
                    } else if (!fieldH2h) {
                        setAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.attacking.forward.corners,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.attacking.forward.corners
                        })
                    }
                } else if (activeAttackParams === 3) {
                    if (fieldH2h) {
                        setAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_2.attacking.forward.offsides,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_2.attacking.forward.offsides
                        })
                    } else if (!fieldH2h) {
                        setAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.attacking.forward.offsides,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.attacking.forward.offsides
                        })
                    }
                }
                else if (activeAttackParams === 4) {
                    if (fieldH2h) {
                        setAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.attacking.forward.avg_coeff,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.attacking.forward.avg_coeff
                        })
                    } else if (!fieldH2h) {
                        setAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.forward.avg_coeff,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.forward.avg_coeff
                        })
                    }
                }
            }
        }

        if (activeTimeFrame.gametimeframe_all === 3) {
            if (selectedGamesCount === 38) {
                if (activeAttackParams === 1) {
                    if (fieldH2h) {
                        setAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.full_time.attacking.forward.xG_sum,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.full_time.attacking.forward.xG_sum
                        })
                    } else if (!fieldH2h) {
                        setAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.attacking.forward.xG_sum,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.attacking.forward.xG_sum
                        })
                    }
                } else if (activeAttackParams === 2) {
                    if (fieldH2h) {
                        setAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.full_time.attacking.forward.corners,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.full_time.attacking.forward.corners
                        })
                    } else if (!fieldH2h) {
                        setAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.attacking.forward.corners,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.attacking.forward.corners
                        })
                    }
                } else if (activeAttackParams === 3) {
                    if (fieldH2h) {
                        setAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.full_time.attacking.forward.offsides,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.full_time.attacking.forward.offsides
                        })
                    } else if (!fieldH2h) {
                        setAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.attacking.forward.offsides,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.attacking.forward.offsides
                        })
                    }
                }
                else if (activeAttackParams === 4) {
                    if (fieldH2h) {
                        setAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.attacking.forward.avg_coeff,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.attacking.forward.avg_coeff
                        })
                    } else if (!fieldH2h) {
                        setAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.forward.avg_coeff,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.forward.avg_coeff
                        })
                    }
                }
            }
        }


    }, [activeAttackParams, allFirstTeamFieldMetrics, allSecondTeamFieldMetrcis, selectedGamesCount, activeTimeFrame, fieldH2h, fieldParams])

    useEffect(() => {
        if (activeTimeFrame.gametimeframe_1 === 1) {
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
        if (activeTimeFrame.gametimeframe_1 === 2) {
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

        if (activeTimeFrame.gametimeframe_1 === 3) {
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

        if (activeTimeFrame.gametimeframe_3 === 1) {
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

        if (activeTimeFrame.gametimeframe_3 === 2) {
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

        if (activeTimeFrame.gametimeframe_3 === 3) {
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

        if (activeTimeFrame.gametimeframe_5 === 1) {
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

        if (activeTimeFrame.gametimeframe_5 === 2) {
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
        if (activeTimeFrame.gametimeframe_5 === 3) {
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

        if (activeTimeFrame.gametimeframe_10 === 1) {
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

        if (activeTimeFrame.gametimeframe_10 === 2) {
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

        if (activeTimeFrame.gametimeframe_10 === 3) {
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

        if (activeTimeFrame.gametimeframe_15 === 1) {
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

        if (activeTimeFrame.gametimeframe_15 === 2) {
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

        if (activeTimeFrame.gametimeframe_15 === 3) {
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

        if (activeTimeFrame.gametimeframe_all === 1) {
            if (selectedGamesCount === 38) {
                if (activeGoalAttackParams === 1) {
                    if (fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.attacking.gate_attack.total_shots,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.attacking.gate_attack.total_shots
                        })
                    } else if (!fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.gate_attack.total_shots,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.gate_attack.total_shots
                        })
                    }
                } else if (activeGoalAttackParams === 2) {
                    if (fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.attacking.gate_attack.bch,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.attacking.gate_attack.bch
                        })
                    } else if (!fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.gate_attack.bch,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.gate_attack.bch
                        })
                    }
                } else if (activeGoalAttackParams === 3) {
                    if (fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_1.attacking.gate_attack.bchm,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_1.attacking.gate_attack.bchm
                        })
                    } else if (!fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_1.attacking.gate_attack.bchm,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_1.attacking.gate_attack.bchm
                        })
                    }
                }
            }
        }

        if (activeTimeFrame.gametimeframe_all === 2) {
            if (selectedGamesCount === 38) {
                if (activeGoalAttackParams === 1) {
                    if (fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_2.attacking.gate_attack.total_shots,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_2.attacking.gate_attack.total_shots
                        })
                    } else if (!fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.attacking.gate_attack.total_shots,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.attacking.gate_attack.total_shots
                        })
                    }
                } else if (activeGoalAttackParams === 2) {
                    if (fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_2.attacking.gate_attack.bch,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_2.attacking.gate_attack.bch
                        })
                    } else if (!fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.attacking.gate_attack.bch,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.attacking.gate_attack.bch
                        })
                    }
                } else if (activeGoalAttackParams === 3) {
                    if (fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.time_2.attacking.gate_attack.bchm,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.time_2.attacking.gate_attack.bchm
                        })
                    } else if (!fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.time_2.attacking.gate_attack.bchm,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.time_2.attacking.gate_attack.bchm
                        })
                    }
                }
            }
        }

        if (activeTimeFrame.gametimeframe_all === 3) {
            if (selectedGamesCount === 38) {
                if (activeGoalAttackParams === 1) {
                    if (fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.full_time.attacking.gate_attack.total_shots,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.full_time.attacking.gate_attack.total_shots
                        })
                    } else if (!fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.attacking.gate_attack.total_shots,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.attacking.gate_attack.total_shots
                        })
                    }
                } else if (activeGoalAttackParams === 2) {
                    if (fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.full_time.attacking.gate_attack.bch,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.full_time.attacking.gate_attack.bch
                        })
                    } else if (!fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.attacking.gate_attack.bch,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.attacking.gate_attack.bch
                        })
                    }
                } else if (activeGoalAttackParams === 3) {
                    if (fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: fieldParams.firstTeamH2h?.timeframe_all.full_time.attacking.gate_attack.bchm,
                            secondTeam: fieldParams.secondTeamH2h?.timeframe_all.full_time.attacking.gate_attack.bchm
                        })
                    } else if (!fieldH2h) {
                        setGoalAttackParams({
                            firstTeam: allFirstTeamFieldMetrics?.timeframe_all.average.full_time.attacking.gate_attack.bchm,
                            secondTeam: allSecondTeamFieldMetrcis?.timeframe_all.average.full_time.attacking.gate_attack.bchm
                        })
                    }
                }
            }
        }


    }, [activeGoalAttackParams, allFirstTeamFieldMetrics, allSecondTeamFieldMetrcis, selectedGamesCount, activeTimeFrame, fieldH2h, fieldParams])


    return (
        <div className={styles.attack_wrapper}>
            <div className={styles.attack_header}>
                <span style={{ padding: '10px 10px 0 10px' }}>A: {activeAttackParam(activeAttackParams)} / GA:{activeAttackGoalParam(activeGoalAttackParams)}</span>
                <FootballFieldSelection
                    onClose={() => null}
                    selectors={selectors}
                    typeVariant="attack"
                    firstActiveFieldParam={activeAttackParams}
                    secondActiveFieldParam={activeGoalAttackParams}
                    setFirstActiveFieldParam={setActiveAttackParams}
                    setSecondActiveFieldParam={setActiveGoalAttackParams}
                    ruTitle={field_options.attack.ru}
                    engTitle={field_options.attack.eng}
                />
            </div>
            <div className={styles.attack}>
                <div className={styles.attack_field_elements}>
                    <div className={styles.corner_top_right}></div>
                    <div className={styles.goalkeeper_zone_alt}>
                        <FootballProgressCircle
                            percent={calculatePercentage(goalAttackParams.firstTeam, goalAttackParams.secondTeam)}
                            width={50}
                            height={50}
                            img={attack}
                            imgHeight={20}
                            imgWidth={20}
                        />
                    </div>
                    <div className={styles.corner_bottom_right}></div>
                </div>
                <div className={styles.attack_params}>
                    <FootballProgressCircle
                        percent={calculatePercentage(attackParams.firstTeam, attackParams.secondTeam)}
                        width={80}
                        height={80}
                        img={attack}
                        imgHeight={25}
                        imgWidth={25}
                    />
                </div>
            </div>
        </div>
    )
}

export default FieldAttack