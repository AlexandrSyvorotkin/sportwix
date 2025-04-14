import React, {FC} from 'react';
import styles from './ModeSwitcherBtn.module.scss'

interface ModeSwitcherBtnProps {
    onClick?: () => void
}

const ModeSwitcherBtn:FC<ModeSwitcherBtnProps> = ({ onClick }) => {
    return (
        <button className={styles.mode_switcher_btn} onClick={onClick}/>
    );
};

export default ModeSwitcherBtn;