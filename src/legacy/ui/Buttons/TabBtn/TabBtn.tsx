import React, { useContext } from 'react';
import {FC} from "react/index";
import styles from "./TeamBtn.module.scss";
import classNames from "classnames";
import { ThemeContext } from '../../../context/ThemeContext/ThemeContext';

interface TabBtnProps {
    children?: string,
    onClick: () => void,
    activeTab?: boolean
}

const TabBtn:FC<TabBtnProps> = ({children, onClick, activeTab}) => {

    const {theme} = useContext(ThemeContext)
    const tabStyles = classNames({
        [styles.single_tab]: true,
        [styles.active]: activeTab === true,
        [styles.dark]: theme === 'dark',
        [styles.light]: theme === 'light'

    })

    

    return (
        <button className={tabStyles} onClick={onClick}>{children}</button>
    );
};

export default TabBtn;