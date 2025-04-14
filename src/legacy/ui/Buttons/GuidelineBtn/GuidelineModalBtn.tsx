import React, { FC } from 'react'
import styles from './GuidelineModalBtn.module.scss'

interface GuidelineModalBtnProps {
    children: string,
    onClick: () => void
}

const GuidelineModalBtn:FC<GuidelineModalBtnProps> = ({children, onClick}) => {
    return (
        <button className={styles.btn} onClick={onClick}>
            {children}
        </button>
    )
}

export default GuidelineModalBtn