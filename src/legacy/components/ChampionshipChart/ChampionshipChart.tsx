import React, {useEffect, useRef} from "react";
import { championshipChartWork } from "../../Charts/ChampionshipChart/ChampionshipChart.work";
import { ITeam } from "../../models/ITeam";
import leagueLogo from '../../assets/epllogo.png'
import styles from './ChampionshipChart.module.scss'

interface ChampionshipChartProps {
    championshipChartData: ITeam[]
}


const ChampionshipChart: React.FC<ChampionshipChartProps> = ({championshipChartData}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        championshipChartWork(championshipChartData, canvasRef, wrapperRef,)

    }, [ canvasRef, wrapperRef, championshipChartData]);

    return (
        <div style={{width: '100%', position: 'relative'}}>
            <div className={styles.league_logo}>
                <div className={styles.img_wrapper}>
                    <div className={styles.img_container}>
                        <img src={leagueLogo} alt="" />
                    </div>
                </div>
            </div>
            <canvas ref={canvasRef} style={{width: '100%', height: '100%'}} id="chart"/>
        </div>
    );
};

export default ChampionshipChart;