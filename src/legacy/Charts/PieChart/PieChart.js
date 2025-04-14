export function pieChart(canvasRef, wins, draws, losses) {

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    canvas.width = 40;
    canvas.height = 40;

    function main() {
        drawPieChart(wins, draws, losses);
        ctx.translate(0.5, 0.5);
    }

    function drawPieChart(wins, draws, losses) {
        const sum = wins + draws + losses;
        const 
          x = (wins / sum) * 2 * Math.PI,
          y = (draws / sum) * 2 * Math.PI,
          z = (losses / sum) * 2 * Math.PI;
      
        sector("green", 0, x);
        sector("yellow", x, x + y);
        sector("red", x + y, x + y + z);
    }

    function sector(clr, start, end) {
        ctx.fillStyle = clr;
        ctx.beginPath();
        ctx.moveTo(20, 20); // Центр круга
        ctx.arc(20, 20, 20, start, end);
        ctx.closePath();
        ctx.fill();
    }

    main();
}


  





