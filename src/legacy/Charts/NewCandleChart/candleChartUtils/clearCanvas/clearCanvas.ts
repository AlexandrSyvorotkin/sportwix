export default function clearCanvas(ctx: CanvasRenderingContext2D, color: string, canvas: HTMLCanvasElement) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}