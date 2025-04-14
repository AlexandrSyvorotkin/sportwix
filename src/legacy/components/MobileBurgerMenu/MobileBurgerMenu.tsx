import React, {FC} from 'react'
import styles from './MobileBurgerMenu.module.scss'

interface MobileBurgerMenuProps {
    onClick: () => void
}

const MobileBurgerMenu:FC<MobileBurgerMenuProps> = ({onClick}) => {
    return (
        <div className={styles.mobile_burger_menu} onClick={onClick}>
            <div className={styles.burger_slice}></div>
            <div className={styles.burger_slice}></div>
            <div className={styles.burger_slice}></div>
        </div>
    )
}

export default MobileBurgerMenu