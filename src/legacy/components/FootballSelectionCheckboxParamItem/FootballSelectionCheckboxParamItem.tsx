import { FC, useContext, useState } from 'react';
import styles from './FootballSelectionCheckboxParamItem.module.scss'
import { relative } from 'path';
import ParamTooltip from '../ParamTooltip/ParamTooltip';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';

interface FootballSelectionCheckboxParamItemProps {
    chooseActiveFieldParam: any,
    secondActiveFieldParam: any,
    id: any,
    handleCheckboxChange: any,
    tooltipText: any,
    title: any
}
 
const FootballSelectionCheckboxParamItem:FC<FootballSelectionCheckboxParamItemProps> = ({chooseActiveFieldParam, secondActiveFieldParam, id, handleCheckboxChange, tooltipText, title}) => {

    const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false)
    const {language} = useContext(LanguageContext)

    return (
        <div className={styles.checkbox_param} onClick={chooseActiveFieldParam} style={{position: "relative"}}
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
        >
            <ParamTooltip isVisible={isTooltipVisible} tooltipText={tooltipText} position={{top: '35'}}/>
            <input type='checkbox' className={styles.checkbox} checked={secondActiveFieldParam === id ? true : false} onChange={handleCheckboxChange} />
            <label style={{ cursor: "pointer" }}>{title}</label>
        </div>
    )
}

export default FootballSelectionCheckboxParamItem