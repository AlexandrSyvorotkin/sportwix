export const drawTest = (seasonsLength, ctx, canvas) => {
   
    // Радиус круга
    const radius = 15;

    // Цвет заливки круга
    ctx.fillStyle = "blue";

    // Рисуем круги в цикле
    for (let i = 0; i < seasonsLength; i++) {
        // Горизонтальное расстояние между каждым кругом
        const spacing = canvas.width / seasonsLength - 60;
        // Координаты каждого круга
        const x = 60 + (i * spacing);
        const y = canvas.height - 50;

        // Рисуем каждый круг
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
};


