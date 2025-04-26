import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './FootballProgressCircle.module.scss';
import { before } from 'node:test';
import { IMG_PATH } from '../../api/variables';
import { useActionData } from 'react-router-dom';

interface FootballProgressCircleProps {
    percent: number;
    width: number,
    height: number
    img: string,
    imgWidth: number,
    imgHeight: number
}

const FootballProgressCircle: FC<FootballProgressCircleProps> = ({ percent, width, height, img, imgHeight, imgWidth}) => {
    const circularProgressRef = useRef<HTMLDivElement>(null);
    const [percentageCounter, setPercentageCounter] = useState<number>(0);

    useEffect(() => {
        if (circularProgressRef.current && percent > 0) { // Начать анимацию только если percent > 0
            let progressStartValue = 0;
            let speed = 5;

            let progress = setInterval(() => {
                progressStartValue++;

                if (circularProgressRef.current)
                circularProgressRef.current.style.background = `conic-gradient(#DC7700 ${progressStartValue * 3.6}deg, #A266F4 0deg)`;
                setPercentageCounter(progressStartValue);
                if (progressStartValue >= percent) {
                    clearInterval(progress);
                }
            }, speed);
        }
    }, [percent]);
    
    const percentage = `conic-gradient(#DC7700 ${percent * 3.6}deg, #A266F4 0deg)`
    
   
    
    let minus = (100 - percent).toFixed(1)
    const minusPerc = percent === 0 ? 0 : minus

    return (
        <>  
            <div style={{background: "transparent", fontSize: '12px'}}>{minusPerc}%</div>
            <div style={{background: "transparent", fontSize: '12px'}}></div>
                <div className={styles.circular_progress} style={{width: width, height: height, background: percentage}} >
                    <div className={styles.img_wrapper} style={{width: imgWidth, height: imgHeight}}>
                        <img src={`${IMG_PATH}${img}`} alt="" />
                    </div>
                </div>
            <div style={{fontSize: '12px'}}>{percent?.toFixed(1)}%</div>
            <div style={{fontSize: '12px'}}></div>
        </>
    )

};

export default FootballProgressCircle;

