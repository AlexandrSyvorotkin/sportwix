import React, { FC } from 'react';

interface ProgressCircleProps {
    wins: number,
    losses: number,
    draws: number
}

const ProgressCircle:FC<ProgressCircleProps> = ({ wins, losses, draws }) => {

    const clr1 = '#469A1F';
    const clr2 = '#B7A503';
    const clr3 = '#E23123';

    const deg1 = wins * 3.6;
    const deg2 = deg1 + losses * 3.6;

    const styles = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: `repeating-conic-gradient(from 0deg, ${clr1} 0deg ${deg1}deg, ${clr2} ${deg1}deg ${deg2}deg, ${clr3} ${deg2}deg 360deg)`,
    }

    return (
        <div style={styles}/>
    );
};

export default ProgressCircle;
