import { FC } from "react"
import styles from './NextMatchLine.module.scss'

type lineType = '1/8to1/4' | '1/4to1/2' | '1/2toFinal' | "1/2toFinalHalfGrid"
type lineSide = 'left' | 'right'
type position = 'top' | 'bottom'

interface nextMatchLineProps {
    lineType: lineType,
    lineSide: lineSide,
    position: position,
    isMatchConnected?: boolean
}

const NextMatchLine:FC<nextMatchLineProps> = ({lineType, position, lineSide, isMatchConnected}) => {

    const getLineClass = (lineType: lineType) => {
        switch (lineType) {
            case '1/8to1/4':
                return styles.line1_8to1_4
            case '1/4to1/2':
                return styles.line1_4to1_2
            case '1/2toFinal':
                return styles.line1_2toFinal
            case '1/2toFinalHalfGrid': 
                return styles.line1_2toFinal_hald_grid
            
        }
    }

    const color = isMatchConnected ? '#B279FF' : 'grey' 

    const getLineSidePosition = (lineSide: lineSide) => {
        switch (lineSide) {
            case 'left':
                return styles.left
            case 'right':
                return styles.right
        }
    }

	return (
		<div className={getLineClass(lineType)} style={{backgroundColor: color}}>
            {position === 'top' ? 
                <>
                    <div className={styles.top_left} style={{backgroundColor: color}}></div>
                    <div className={styles.bottom_left} style={{backgroundColor: color}}></div>
                </>
            : 
                <>
                    <div className={styles.right_top} style={{backgroundColor: color}}></div>
                    <div className={styles.left_bottom} style={{backgroundColor: color}}></div>
                </>
            }
        </div>
	)
}

export default NextMatchLine