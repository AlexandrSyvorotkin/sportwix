import React, {FC} from 'react';
import styles from './TwoTeamsHistogram.module.scss'
import TeamLogoHistogram from "../Histogram/TeamLogoHistogram/TeamLogoHistogram";

import logo1 from '../../assets/HistogramTest/arsenalLogo.svg'
import logo2 from '../../assets/HistogramTest/MUlogo.svg'

import circle1 from '../../assets/HistogramTest/testCircle.svg'
import circle2 from '../../assets/HistogramTest/TestCircle2.svg'

import face1 from '../../assets/HistogramTest/image 166.svg'
import face2 from '../../assets/HistogramTest/image 167.svg'
import ProgressBar from "../Histogram/HistogramProgressBar/HistogramProgressBar";

const TwoTeamsHistogram:FC = () => {
    return (
        <div className={styles.histogram_wrapper}>
            <div className={styles.histogram_header}>
                <TeamLogoHistogram logo={logo1} circleTest={circle1} testImg={face1}/>
                <div className={styles.scores}>
                    <span>10 Games</span>
                    <span>2:3</span>
                </div>
                <TeamLogoHistogram logo={logo2} circleTest={circle2} testImg={face2}/>
            </div>
            <div className={styles.tabs}>
                <div>Full time</div>
                <div>1 time</div>
                <div>2 time</div>
            </div>
            <div className={styles.statistical_indicators}>
                <div className={styles.statistical_indicators_inner}>
                    <ProgressBar value={7} max={8} color="green" />
                    <span className={styles.indicator}>Голы</span>
                    <ProgressBar value={1} max={2} color="red" type='end'/>
                </div>
                <div className={styles.statistical_indicators_inner}>
                    <ProgressBar value={1} max={2} color="green" />
                    <span className={styles.indicator}>Пропущенные голы</span>
                    <ProgressBar value={1} max={2} color="red" type='end'/>
                </div>
                <div className={styles.statistical_indicators_inner}>
                    <ProgressBar value={1} max={4} color="green" />
                    <span className={styles.indicator}>% Владение</span>
                    <ProgressBar value={1} max={4} color="red" type='end'/>
                </div>
                <div className={styles.statistical_indicators_inner}>
                    <ProgressBar value={1} max={4} color="green" />
                    <span className={styles.indicator}>Атаки</span>
                    <ProgressBar value={1} max={4} color="red" type='end'/>
                </div>
                <div className={styles.statistical_indicators_inner}>
                    <ProgressBar value={1} max={4} color="green" />
                    <span className={styles.indicator}>Удары в створ</span>
                    <ProgressBar value={1} max={4} color="red" type='end'/>
                </div>
                <div className={styles.statistical_indicators_inner}>
                    <ProgressBar value={1} max={4} color="green" />
                    <span className={styles.indicator}>Коэффициент</span>
                    <ProgressBar value={1} max={4} color="red" type='end'/>
                </div>
                <div className={styles.statistical_indicators_inner}>
                    <ProgressBar value={1} max={4} color="green" />
                    <span className={styles.indicator}>xG</span>
                    <ProgressBar value={1} max={4} color="red" type='end'/>
                </div>
                <div className={styles.statistical_indicators_inner}>
                    <ProgressBar value={1} max={4} color="green" />
                    <span className={styles.indicator}>xGA</span>
                    <ProgressBar value={1} max={4} color="red" type='end'/>
                </div>
                <div className={styles.statistical_indicators_inner}>
                    <ProgressBar value={1} max={4} color="green" />
                    <span className={styles.indicator}>Голы</span>
                    <ProgressBar value={1} max={4} color="red" type='end'/>
                </div>
            </div>
        </div>
    );
};

export default TwoTeamsHistogram;