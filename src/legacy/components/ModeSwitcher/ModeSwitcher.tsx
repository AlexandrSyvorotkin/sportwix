import React, {FC} from 'react';
import styles from './ModeSwitcher.module.scss'
import classNames from "classnames";
import ModeSwitcherBtn from "../../ui/ModeSwitcherBtn/ModeSwitcherBtn";
import Dark from '../../assets/mode_switcher/Dark.svg'
import Light from '../../assets/mode_switcher/Light.svg'

interface ModeSwitcherProps {
    mode: string,
    onClick: () => void
}

const ModeSwitcher:FC<ModeSwitcherProps> = ({mode, onClick}) => {

    const modeSwitcherStyles = classNames({
        [styles.mode_switcher]: true,
        [styles.theme_dark]: mode === 'dark',
        [styles.theme_light]: mode === 'light'
    })

    return (
        <div className={modeSwitcherStyles} onClick={onClick}>
            <ModeSwitcherBtn/>
            <img src={mode === 'dark' ? Dark : Light} style={{ transform: 'rotate(90deg)' }} alt=""/>
        </div>
    );
};

export default ModeSwitcher;