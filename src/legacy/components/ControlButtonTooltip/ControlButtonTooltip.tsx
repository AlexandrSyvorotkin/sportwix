import React, {FC, useContext} from 'react';
import styles from './ControlButtonTooltip.module.scss'
import classNames from "classnames";
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';

interface ControlButtonTooltipProps {
    button_description?: {
        eng: string,
        ru: string
    },
    visible: boolean,
    position?: string,
}

const ControlButtonTooltip:FC<ControlButtonTooltipProps> = ({button_description, visible, position}) => {

    const tooltipStyles = classNames({
        [styles.tooltip_left]: position === 'left',
        [styles.tooltip_right]: position === 'right',
        [styles.position_left]: position === 'left' && visible,
        [styles.position_right]: position === 'right' && visible,
        // [styles.visilble_false]: !visible
    })

    const {language} = useContext(LanguageContext)

    const justifyContentPosition = position === 'left' ? 'flex-end' : 'flex-start'

   
    const description = language === "Eng" ? button_description?.eng : button_description?.ru

    return (
        <div style={{position: 'absolute', display: 'flex', justifyContent: justifyContentPosition, zIndex: 5}}>
            <div className={tooltipStyles}>
                <span>{description}</span>
            </div>
        </div>
    );
};

export default ControlButtonTooltip;

