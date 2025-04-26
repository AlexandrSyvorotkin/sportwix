import React, {FC} from 'react'
import styles from './SubsribeBtn.module.scss'

interface SubscribeBtnProps {
    children: string
}

const SubscribeBtn:FC<SubscribeBtnProps> = ({children}) => {
    return (
        <button className={styles.subscribe_btn}>
            {children}
        </button>
    )
}

export default SubscribeBtn;