import React, {CSSProperties, FC} from "react";

interface ProgressBarProps {
    value: number,
    max: number,
    color: string,
    type?: string
}

const ProgressBar:FC<ProgressBarProps> = ({value, max, color, type}) => {

    const percentage = (value / max) * 100;

    const containerStyle: CSSProperties = {
        width: "20%",
        height: "12px",
        backgroundColor: "transparent",
        position: "relative",
        display: type === 'end' ? 'flex' : '',
        justifyContent: type === 'end' ? 'flex-end' : ''
    };

    const fillerStyle: CSSProperties = {
        width: `${percentage}%`,
        height: "100%",
        backgroundColor: color,
        transition: "width .2s ease-in-out"
    };

    return (
        <div style={containerStyle}>
            <div style={fillerStyle}/>
        </div>
    );
}

export default ProgressBar;
