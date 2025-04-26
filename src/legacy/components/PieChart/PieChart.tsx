import { FC, useRef, useEffect } from 'react'
import { pieChart } from '../../Charts/PieChart/PieChart'

interface PieChartProps {
    wins: number,
    draws: number,
    losses: number
}

const PieChart:FC<PieChartProps> = ({wins, draws, losses}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        pieChart(canvasRef, wins, draws, losses)
    }, [])

    return (
        <canvas ref={canvasRef} style={{width: '40px', height: '40px'}}/>
    )
}

export default PieChart