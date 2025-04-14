export default function drawSeasonsBars (zeroPosX: number, seasons: any, chart: any, mouseX: number, mouseY: number, ctx: CanvasRenderingContext2D, height: number, barsHeight: any, colorLose: string, colorDraw: string, colorWin: string, drawRectWithText: any) {
    let seasonOffset = zeroPosX;
    for (let i = 0; i < seasons.length; i++) {
        //let games = seasons[i].games;
        let wins = seasons[i].wins;
        let draws = seasons[i].draws;
        let losses = seasons[i].losses;
        let winsWidth = wins * chart.matchWidth;
        let drawsWidth = draws * chart.matchWidth;
        let lossesWidth = losses * chart.matchWidth;

        // console.log(drawRectWithText)


        let drawSeasonBarRect = (text = "", color: string) => {
            let actualText = "";
            if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
                actualText = text;
            }

            drawRectWithText(
                actualText,
                "white",
                "center",
                "middle",
                color,
                x,
                y,
                w,
                h
            );
        };

        let x = Math.floor(seasonOffset);
        let y = height - barsHeight;
        let w = Math.ceil(lossesWidth);
        let h = barsHeight;

        drawSeasonBarRect(losses.toString(), colorLose);

        // доделать
        ctx.fillStyle = 'white'; // цвет заливки
        ctx.fillRect(x, y, 2, barsHeight);

        x += w;
        w = drawsWidth;
        drawSeasonBarRect(draws.toString(), colorDraw);


        x += w;
        w = winsWidth;
        drawSeasonBarRect(wins.toString(), colorWin);



        //let seasonWidth = games * chart.matchWidth;
        seasonOffset += winsWidth + lossesWidth + drawsWidth;

    }
}