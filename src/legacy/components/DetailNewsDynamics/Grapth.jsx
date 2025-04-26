import React, { useEffect, useRef } from 'react';

const Graph = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 50;

    // Функция для рисования графика
    const drawGraph = () => {
      // Очистка canvas перед перерисовкой
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Отрисовка фона (прозрачный)
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Данные точек для графика (координаты x, y)
      const data = [
        { x: 10, y: 20 },
        { x: 20, y: 15 },
        { x: 30, y: 10 },
        { x: 40, y: 25 },
        { x: 50, y: 40 },
        { x: 60, y: 35 },
        { x: 70, y: 30 },
        { x: 80, y: 20 },
        { x: 90, y: 15 },
        { x: 95, y: 45 }
      ];

      // Отрисовка точек
      ctx.fillStyle = 'green'; // Цвет точек
      ctx.strokeStyle = 'green'; // Цвет линии
      ctx.lineWidth = 1; // Ширина линии

      ctx.beginPath();
      ctx.moveTo(data[0].x, data[0].y);

      for (let i = 1; i < data.length; i++) {
        ctx.lineTo(data[i].x, data[i].y);
        ctx.moveTo(data[i].x, data[i].y);
        ctx.arc(data[i].x, data[i].y, 2, 0, Math.PI * 2); // Рисование круга (точки)
      }

      ctx.stroke();
      ctx.fill();
    };

    // Вызов функции для отрисовки графика
    drawGraph();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Graph;
