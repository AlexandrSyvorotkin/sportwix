import { Dispatch, FC, SetStateAction } from "react"
import styles from './sparkline-season-result.module.scss'

interface SparkLineSeasonResultBarProps {
    wins: number,
    draws: number,
    losses: number,
    setIsAlternativeResultsVisible: Dispatch<SetStateAction<boolean>>,
    height?: number,
    width?: number,
    isDopInfo: boolean
}

const SparkLineSeasonResultBar:FC<SparkLineSeasonResultBarProps> = ({wins, draws, losses, height, width, isDopInfo}) => {

    const totalGames = wins + draws + losses
    const winsPercentage = Math.round((wins / totalGames) * 100)
    const drawsPercentage = Math.round((draws / totalGames) * 100)
    const lossesPercentage = Math.round((losses / totalGames) * 100)


    let language = 'Ru'

    const win = language === 'Eng' ? 'W' : 'В'
    const loss = language === 'Eng' ? 'L' : 'П'
    const draw = language === 'Eng' ? 'D' : 'Н'
    
    const padding = isDopInfo ? '10px' : '0px'

    return (
        <div className={styles.bar_wrapper} id='season-bar' style={{padding: padding}}>
            {isDopInfo ?
                <>
                    <div className={styles.season_result_percentage}>
            <div style={{height: `${height}px`, color: '#C00000'}}>{loss}</div>
                <div style={{height: `${height}px`,  color: '#B7A503'}}>{draw}</div>
                <div style={{height: `${height}px`, color: '#3A751F'}}>{win}</div>
            </div>
            <div className={styles.season_result_percentage}  style={{width: width}}>
                <div style={{height: `${height}px`, color: '#C00000'}}>{losses}</div>
                <div style={{height: `${height}px`,  color: '#B7A503'}}>{draws}</div>
                <div style={{height: `${height}px`, color: '#3A751F'}}>{wins}</div>
            </div>
                </>
            : null
            }

            <div className={styles.season_result_percentage} style={{width: width}}>
                <div  className={styles.metric_percentage} style={{height: `${height}px`, background: '#C00000', width: `${lossesPercentage}%`, borderRadius: '12px 0 0 12px'}}/>
                <div  className={styles.metric_percentage} style={{height: `${height}px`,  background: '#B7A503', width: `${drawsPercentage}%`}}/>
                <div  className={styles.metric_percentage} style={{height: `${height}px`, background: '#3A751F', width: `${winsPercentage}%`, borderRadius: '0 12px 12px 0'}}/>
            </div>
        </div>
    )
}

export { SparkLineSeasonResultBar }
