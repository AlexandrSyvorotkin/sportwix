import classNames from 'classnames'
import { FC, useContext } from 'react'
import styles from './ParamTooltip.module.scss'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'

interface ParamTooltipProps {
    tooltipText?: string
    isVisible: boolean,
    position: {
        top: '35' | '60'
    }
}

const ParamTooltip: FC<ParamTooltipProps> = ({ tooltipText, isVisible, position }) => {

    const tooltipStyles = classNames({
        [styles.tooltip]: true,
        [styles.visible]: isVisible
    })

    if (tooltipText?.length === 0) {
        return null
    }

 
    return (
        <div className={tooltipStyles} style={{top: `${position.top}px`}}>{tooltipText}</div>
    )
}

export default ParamTooltip