import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useRef } from 'react';
import styles from '../ChartSelect/ChartSelect.module.scss'
import arrow from '../../../assets/Arrow.png'
import { LanguageContext } from '../../../context/LanguageContext/LanguageContext';


type metric = {
    param: {
        ru: string,
        eng: string
    },
    filterFunc: () => void,
    id: number
}

interface CandleChartSelectProps {
    candleMetrics: metric[],
    onClose: () => void,
    topPosition: number,
    rightPosition?: number
    activeParam: number,
    isOpen: boolean,
    btnId?: string,
    position: any,
    left?: number
    
}

const CandleChartSelect: FC<CandleChartSelectProps> = ({ candleMetrics, onClose, topPosition, activeParam, isOpen, btnId, rightPosition, position, left}) => {

   

    const {language} = useContext(LanguageContext)

    const ref = useRef<HTMLDivElement>(null)

    // const handleClickOutside = (event: MouseEvent) => {
    //     // if (!controlBtn?.contains(event.target as Node)) {
    //         if (ref.current && !ref.current.contains(event.target as Node)) {
    //             onClose()
    //         }
    //     // }
    // }

    // const handleClickOutside = (event: MouseEvent) => {
    //     if (ref.current && !ref.current.contains(event.target as Node)) {
    //         onClose()
    //     }
    // }
    
    //TODO: доделать селекторы правильно

    const controlBtn = document.getElementById(`${btnId}`)
    // console.log(controlBtn)

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
          const { target } = event;
            if (!controlBtn?.contains(target as Node)) {
                if (target instanceof Node && !ref.current?.contains(target)) {
                    onClose();
                }
            }

        };
      
        window.addEventListener('click', handleClick);
      }, [controlBtn, ref, onClose]);
;

    // useEffect(() => {
    //     return () => {
    //         onClose()
    //     }
    // }, [])


    return (
        <>  
            {isOpen && <div className={styles.chart_select} ref={ref} style={{ top: topPosition, right: rightPosition, position: position, left: left }}>
                {candleMetrics.map(metric =>
                    <div key={metric.param.eng} className={styles.select_metric} onClick={metric.filterFunc}>
                        <span>{activeParam === metric.id
                            ?
                            <div className={styles.active_indicator}></div>
                            :
                            ' '}
                        </span>
                        <span>{language === 'Eng' ? metric.param.eng : metric.param.ru}</span>
                    </div>
                )}
            </div>}
        </>
    );
};

export default CandleChartSelect;
