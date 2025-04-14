export default function drawNews(x: number, ctx: CanvasRenderingContext2D, mouseX: number, mouseY: number, bottomAxisOffset: number, canvasHeight: number, newsTooltip: any, setMiniNews: any, articles: any) {
    ctx.fillStyle = 'green';

    let newsCircleX = x;
    let newsCircleY = canvasHeight - bottomAxisOffset - 10;

    ctx.beginPath();
    ctx.arc(x, newsCircleY, 5, 0, 2 * Math.PI);
    ctx.fill();

    let dist = Math.hypot(mouseX - newsCircleX, mouseY - newsCircleY);

    //доделать новость

    if (dist < 5) {
        newsTooltip.style.display = 'flex'
        setMiniNews(articles)
    } 
}