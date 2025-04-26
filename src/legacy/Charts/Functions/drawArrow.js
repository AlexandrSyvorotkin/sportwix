export const drawArrow = (ctx, candleUuid, currentUuid) => {
    
    if (candleUuid === currentUuid) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(10, 10); // Начало стрелки
        ctx.lineTo(5, 10); // Правая сторона стрелки
        ctx.lineTo(5, 5); // Вершина стрелки
        ctx.lineTo(5, 10); // Левая сторона стрелки
        ctx.closePath();
        ctx.fill();

        // Нарисовать прямоугольник
        ctx.fillRect(2, 20, 4, 15); // Позиция и размеры прямоугольника
     }
}