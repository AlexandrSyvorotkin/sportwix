import React, {FC} from 'react';
import styles from './TeamLogoHistogram.module.scss'

interface TeamLogoHistogramProps {
    logo: string,
    testImg?: string,
    circleTest?: string
}

const TeamLogoHistogram:FC<TeamLogoHistogramProps> = ({logo, testImg, circleTest}) => {
    return (
        <div className={styles.team_logo_histogram}>
            <div className={styles.img_container}>
                <img src={logo} alt=""/>
            </div>
            <div className={styles.img_container}>
                <img src={testImg} alt=""/>
            </div>
            <div className={styles.img_container}>
                <img src={circleTest} alt=""/>
            </div>
        </div>
    );
};

export default TeamLogoHistogram;