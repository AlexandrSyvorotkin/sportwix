import React, { FC } from 'react';
import styles from './FootballFieldCircle.module.scss'

interface FootballFieldCircle {
    percentage: number,
    circleWidth: number,
    img?: string
    radius: number,
    strokeWidth: number
    imgWidth: number,
    imgHeight: number,
    left: number,
    top: number
}

const FootballFieldCircle: FC<FootballFieldCircle> = ({ percentage, circleWidth, img, radius, strokeWidth, imgWidth, imgHeight, left, top}) => {


    const dashArray = radius * Math.PI * 2
    const dashOffset = dashArray - (dashArray * percentage) / 100

    return (
        <div style={{position: 'relative'}}>
            <svg
                width={circleWidth}
                height={circleWidth}
                viewBox={`0 0 ${circleWidth} ${circleWidth}`}
                >
                <circle
                    cx={circleWidth / 2} 
                    cy={circleWidth / 2} 
                    strokeWidth={strokeWidth}
                    r={radius}
                    className={styles.circle_bkg}
                />
                 <circle
                    cx={circleWidth / 2} 
                    cy={circleWidth / 2} 
                    strokeWidth={strokeWidth}
                    r={radius}
                    className={styles.circle_progress}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset
                    }}
                    transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
                />
            </svg>
            <div className={styles.img_wrapper} style={{width: imgWidth, height: imgHeight, top: top, left: left}}>
                <img src={img} alt="" />
            </div>
        </div>
    );
};

export default FootballFieldCircle;
