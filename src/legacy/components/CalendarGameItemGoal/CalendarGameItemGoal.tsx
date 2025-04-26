import classNames from 'classnames'
import {FC, useState} from 'react'
import styles from './CalendarGameItemGoal.module.scss'
import { Goal } from '../../types/types'

interface CalendarGameItemGoal {
    type: 'selected-team' | 'versus-team'
    goal_player: string,
    goal_minute: number
}

const CalendarGameItemGoal:FC<CalendarGameItemGoal> = ({type, goal_player, goal_minute}) => {


    const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false)

    const goalStyles = classNames({
        [styles.goals_versus]: type === 'versus-team',
        [styles.goal_selected]: type === 'selected-team'
    })

    const tooltipStyles = classNames({
        [styles.goals_not_visible]: !isTooltipVisible,
        [styles.goal_tooltip]: isTooltipVisible
    })

    return (
        <div className={goalStyles}
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
        >
            {isTooltipVisible 
                ? <div className={tooltipStyles}>{goal_player} {goal_minute}'</div> 
                : null
            }
        </div>
    )
} 

export default CalendarGameItemGoal