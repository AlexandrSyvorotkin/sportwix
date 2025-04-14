import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import styles from './TeamParameter.module.scss'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext'
import classNames from 'classnames'
import ParamTooltip from '../ParamTooltip/ParamTooltip'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext'

type title =  {
    ru: string,
    eng: string,
    ru_tip: string,
    eng_tip: string
}
interface TeamPerameterProps {
    first_selected_param?: number,
    second_selected_param?: number,
    visible: boolean,
    type: number,
    title: title,
    activeGameTimeFrame: number,
    setFirstSelectedTeamParams?: any,
    setSecondSelectedTeamMetrics?: any
}

const TeamParameter: FC<TeamPerameterProps> = ({first_selected_param, second_selected_param, visible, type, title, activeGameTimeFrame, setFirstSelectedTeamParams, setSecondSelectedTeamMetrics }) => {


    const {language} = useContext(LanguageContext)
    const {theme} = useContext(ThemeContext)

    function backgound(a: number | undefined, b: number | undefined, type: number) {
        if (a === undefined || b === undefined) {
            return '';
        }
    
        const absA = Math.abs(a);
        const absB = Math.abs(b);

              
        if (type === 1) {
            if ( a === b ) {
                return '#EFFF3C'
            }
            if (a > b) {
                return '#469A1F';
            } else {
                return '#ED392F';
            }
        } else if (type == 2) {
            if ( a === b ) {
                return '#EFFF3C'
            }
            if (a > b) {
                return '#ED392F';
            } else {
                return '#469A1F';
            }
        }
    }

    const deviceWidth = window.innerWidth

    function getColor(a: number | undefined, b: number | undefined, type: number) {
        if (deviceWidth < 576) {
            if (a === undefined || b === undefined) {
                return '';
            }
        
            const absA = Math.abs(a);
            const absB = Math.abs(b);
    
                  
            if (type === 1) {
                if ( a === b ) {
                    return '#EFFF3C'
                }
                if (a > b) {
                    return '#469A1F';
                } else {
                    return '#ED392F';
                }
            } else if (type == 2) {
                if ( a === b ) {
                    return '#EFFF3C'
                }
                if (a > b) {
                    return '#ED392F';
                } else {
                    return '#469A1F';
                }
            }
        } else {
            if (theme === 'dark') {
                return 'white'
            } else if (theme === 'light') {
                return '#333333'
            }
        }
    }

    

    const getPercent = (a: number | undefined, b: number | undefined, percentFromA: boolean = true) => {
        if (a === undefined || b === undefined) {
            return 0;
        }
    
        const absA = Math.abs(a);
        const absB = Math.abs(b);
        const sum = absA + absB;
    
        if (sum === 0) {
            return 0;
        }
    
        if (percentFromA) {
            const percent = (absA / sum) * 100;
            return percent;
        } else {
            const percent = (absB / sum) * 100;
            return percent;
        }
    }
    
    const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false)

    const paramRef = useRef(null)

    const param = document.getElementById('param')?.getBoundingClientRect()

    if (!visible) {
        return null
    }

    
    const textColor = theme === 'dark' ? 'white' : '#333333'

    return (
        <div className={styles.param_metric}>
            <div className={styles.chart} style={{ justifyContent: 'flex-end' }}>
                <div className={styles.possible_metric}>
                    <div className={styles.chart_left} style={{ width: `${getPercent(first_selected_param, second_selected_param, true)}%`, right: 0, background: `${backgound(first_selected_param, second_selected_param, type)}` }} />
                    <div className={styles.half_border}/>
                </div>
            </div>
            <div className={styles.param_metric_stats}>
                <div className={styles.param_item} style={{color: `${getColor(first_selected_param, second_selected_param, type)}`}}>{first_selected_param?.toFixed(1)}</div>
                <div className={styles.param_item_tooltiped} style={{color: textColor}}  id='param'
                    onMouseEnter={() => setIsTooltipVisible(true)}
                    onMouseLeave={() => setIsTooltipVisible(false)}
                >
                    {isTooltipVisible && <ParamTooltip isVisible={isTooltipVisible} tooltipText={language === 'Eng' ? title.eng_tip : title.ru_tip} position={{top: '60'}}/>}
                    {language === 'Eng' ? title.eng : title.ru}</div>
                
                <div className={styles.param_item} style={{color: `${getColor(second_selected_param, first_selected_param, type)}`}}>{second_selected_param?.toFixed(1)}</div>
            </div>
            <div className={styles.chart} style={{ justifyContent: 'flex-start' }}>
                <div className={styles.possible_metric}>
                    <div className={styles.chart_left} style={{ width: `${getPercent(first_selected_param, second_selected_param, false)}%`, left: 0, background: `${backgound(second_selected_param, first_selected_param, type)}` }} />
                    <div className={styles.half_border}/>
                </div>
            </div>
        </div>
    )
}

export default TeamParameter