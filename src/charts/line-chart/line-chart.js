export function lineChart(candles, canvasCandleRef) {

    const modifiedMatches = candles.map(it => it.close);

    const canvas = canvasCandleRef.current;
    const ctx = canvas?.getContext("2d");

    canvas.width = 150;
    canvas.height = 50;

    // Массив данных для графика

    // Вычисляем максимальное и минимальное значение в массиве данных
    const maxDataValue = Math.max(...modifiedMatches);
    const minDataValue = Math.min(...modifiedMatches);

    // Задаем параметры графика
    const padding = 0;
    const graphHeight = canvas.height - 2 * padding;
    const graphWidth = canvas.width - 2 * padding;
    const xStep = graphWidth / (modifiedMatches.length - 1);
    const yStep = graphHeight / (maxDataValue - minDataValue);

    const firstValue = modifiedMatches[0];
    const lastValue = modifiedMatches[modifiedMatches.length - 1]


    let lineColor = "#3A751F"; // Зеленый по умолчанию

    if (firstValue > lastValue) {
        lineColor = "#C00000"; // Красный, если первое значение больше последнего
    } else if (firstValue === lastValue) {
        lineColor = "#B7A503"; // Зеленый, если значения равны
    }

    ctx.strokeStyle = lineColor;

    ctx.beginPath();
    let isFirstPoint = true;

    for (let i = 0; i < modifiedMatches.length; i++) {
        if (modifiedMatches[i] !== 0) {
            const x = padding + i * xStep;
            const y = canvas.height - padding - (modifiedMatches[i] - minDataValue) * yStep;

            if (isFirstPoint) {
                ctx.moveTo(x, y);
                isFirstPoint = false;
            } else {
                ctx.lineTo(x, y);
            }
        }
    }
    ctx.lineWidth = 3; // Устанавливаем толщину линии в 2 пикселя, но вы можете выбрать любое подходящее значение
    ctx.stroke();
}
