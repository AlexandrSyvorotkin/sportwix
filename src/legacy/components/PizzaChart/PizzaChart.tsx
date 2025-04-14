import React, {FC} from 'react';

interface PizzaChartProps {
    data: {percent: number, color: string}[],
    size: number
}

const PizzaChart:FC<PizzaChartProps> = ({ data, size }) => {
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;
    let startAngle = 0;

    const colors = ['#007bff', '#dc3545', '#28a745']; // Ограничиваем количество цветов

    const calculateEndAngle = (percent:number) => {
        return (percent / 100) * 360;
    };

    const renderSlice = (percent:number, index:number) => {
        const endAngle = calculateEndAngle(percent);
        const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

        // Расчет координат концов дуги
        const x1 = centerX + radius * Math.cos((Math.PI / 180) * startAngle);
        const y1 = centerY + radius * Math.sin((Math.PI / 180) * startAngle);
        const x2 = centerX + radius * Math.cos((Math.PI / 180) * endAngle);
        const y2 = centerY + radius * Math.sin((Math.PI / 180) * endAngle);

        // Формируем атрибуты для дуги
        const d = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

        // Обновляем угол начала для следующего кусочка
        startAngle = endAngle;

        return <path key={index} d={d} fill={colors[index % colors.length]} />;
    };

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {data.map((item, index) => renderSlice(item.percent, index))}
        </svg>
    );
};

export default PizzaChart;

