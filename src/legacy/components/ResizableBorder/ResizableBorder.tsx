import React, {FC, useContext} from 'react'
import styles from './ResizableBorder.module.scss'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext'
import classNames from 'classnames'

interface ResizableBorderProps {
    display: string;
    resize: (e: React.MouseEvent<HTMLDivElement>) => void;
    cursor: string;
  }

export const ResizableBorder:FC<ResizableBorderProps> = ({display, resize, cursor}) => {

    const {theme} = useContext(ThemeContext)

    const resizableBorderStyles = classNames({
        [styles.resizable_border_dark]: theme === 'dark',
        [styles.resizable_border_light]: theme === 'light'
    })
    // cursor: `${cursor}`

    return <div 
                className={resizableBorderStyles}
                style={{display: `${display}`}}
                // onMouseDown={resize}
            />
}