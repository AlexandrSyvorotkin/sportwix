import React, {FC} from 'react'
import styles from './PlayerRecordTooltip.module.scss'
import classNames from 'classnames'

interface PlayerRecordTooltipProps {
    img: string,
    visible: boolean
}

const PlayerRecordTooltip:FC<PlayerRecordTooltipProps> = ({img, visible}) => {

    const tooltipStyles = classNames({
        [styles.player_redord_tooltip]: true,
        [styles.visible]: visible
    })

    return (
        <div className={tooltipStyles}>
            <img src={img} alt="" />
        </div>
    )
}

export default PlayerRecordTooltip