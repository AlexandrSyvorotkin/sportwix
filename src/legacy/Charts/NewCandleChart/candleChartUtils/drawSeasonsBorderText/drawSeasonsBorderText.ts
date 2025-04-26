export default function drawSeasonsBorderText(ctx: CanvasRenderingContext2D, candle: any, textColor: string, posX: number, posY: number) {
    const cutLeagueSeason = candle.league_season.slice(2)
    const parts = cutLeagueSeason.split('/');
    const numerator = parts[0];
    const denominator = parts[1].substring(2)
    const resultString = numerator + '/' + denominator;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = textColor;
    ctx.font = '12px serif';
    ctx.fillText(resultString, posX + 5, 20);
    ctx.font = '12px serif';
    // ctx.fillText(`№:${candle.place}`, posY + 5, 40);
    
}