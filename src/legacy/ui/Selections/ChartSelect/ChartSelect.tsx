import React, {FC, useEffect, useRef} from 'react';
import styles from './ChartSelect.module.scss'

interface metric {
    metric: string,
}

interface ChartSelectProps {
    metrics: metric[],
    filterChart: (param:string) => void,
    onClose: () => void,
    topPosition: number,
    activeParam?: string
}

const ChartSelect:FC<ChartSelectProps> = ({metrics, filterChart, onClose, topPosition}) => {

    
    const ref = useRef<HTMLDivElement>(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            onClose()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])


    return (
        <div className={styles.chart_select} ref={ref} style={{top: topPosition}} onClick={() => onClose()}>
            {metrics.map( metric =>
                <div key={metric.metric} className={styles.select_metric} onClick={() => filterChart(metric.metric)}>{metric.metric}</div>
            )}
        </div>
    );
};

export default ChartSelect;