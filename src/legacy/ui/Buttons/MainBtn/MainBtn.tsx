import React, { FC } from 'react'
import styles from './MainBtn.module.scss'

interface MainBtn {
    children: string
    onClick: any
}

const MainBtn:FC<MainBtn> = ({children, onClick}) => {
    return (
        <button className={styles.main_btn} onClick={onClick}>{children}</button>
    )
}

export default MainBtn
