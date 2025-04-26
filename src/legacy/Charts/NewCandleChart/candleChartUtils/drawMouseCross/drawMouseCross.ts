import drawLine from "../drawLine/drawLine";

export default function drawMouseCross(ctx: CanvasRenderingContext2D, color: string, canvas: HTMLCanvasElement, x: number, y: number) {
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = color;
    ctx.setLineDash([5, 5]);
    // drawLine(ctx, 0, mouse.y, canvas.width, mouse.y);
    // drawLine(ctx, mouse.x, 0, mouse.x, canvas.height);
    drawLine(ctx, 0, y, canvas.width, y);
    drawLine(ctx, x, 0, x, canvas.height);
    ctx.setLineDash([]);
}