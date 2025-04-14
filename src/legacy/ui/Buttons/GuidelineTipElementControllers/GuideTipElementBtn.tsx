import React, { FC, useState } from 'react'
import styles from './GuideTipElementBtn.module.scss'
import arrowLeftLight from '../../../assets/guideErrows/left/arrow-left-light.svg'
import arrowRightLight from '../../../assets/guideErrows/right/arrow-right-light.svg'
import arrowLeftDark from '../../../assets/guideErrows/left/arrow-left-dark.svg'
import arrowRightDark from '../../../assets/guideErrows/right/arrow-right-dark.svg'

interface GuideTipElementBtnProps {
    onClick: () => void,
    type: "left" | 'right'
}

const GuideTipElementBtn:FC<GuideTipElementBtnProps> = ({onClick, type}) => {

    const [isHover, setIsHover] = useState(false)


    return (
        <button className={styles.btn} onClick={onClick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className={styles.img}>
                <img src={type === 'left' ? (isHover ? arrowLeftLight : arrowLeftDark) : (isHover ? arrowRightLight : arrowRightDark)} alt="" />
            </div>
        </button>
    )
}

export default GuideTipElementBtn