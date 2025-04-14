import { MouseActions } from "../mouse";
import { mouse } from "../mouse";
// import { Camera } from "../camera";
import clearCanvas from "../clearCanvas/clearCanvas";

export function handleMouseDown (canvas: HTMLCanvasElement) {
    canvas.style.cursor = 'move'
    if (mouse.action === MouseActions.Free) {
        mouse.action = MouseActions.Drag;
        mouse.clickX = mouse.x;
        mouse.clickY = mouse.y;
    }
}

export function handleMouseUp (canvas: HTMLCanvasElement) {
    canvas.style.cursor = "auto";
    mouse.action = MouseActions.Free;
}

export function handleMouseOut (chartConstants: any, drawChart:() => void, ctx: CanvasRenderingContext2D, canvas: any, color: string) {
    chartConstants.mouseCrossVisible = false
    clearCanvas(ctx, color, canvas)
    drawChart();
}

export function handleMouseMove (e: any, chartConstants: any, width: any, height: any, camera: any, newsTooltip: any, setMiniNews:any) {
    chartConstants.mouseCrossVisible = true;
    newsTooltip.style.display = 'none'
    setMiniNews([])
    // let mousePrevX = mouse.x;
    // let mousePrevY = mouse.y;
    let { x: mousePrevX, y: mousePrevY } = mouse
    mouse.x = Math.floor(e.offsetX) // * deviceScale);
    mouse.y = Math.floor(e.offsetY) // * deviceScale);

    if (mouse.x !== -1) mouse.frameX = mouse.x - mousePrevX;
    if (mouse.y !== -1) mouse.frameY = mouse.y - mousePrevY;

    mouse.relX = mouse.x / width;
    mouse.relY = mouse.y / height;

    if (mouse.action === MouseActions.Drag) {
        if (camera.left + mouse.frameX > camera.limit) mouse.frameX = 0;
        if (camera.top + mouse.frameY > camera.limit) mouse.frameY = 0;
        if (camera.right - mouse.frameX > camera.limit) mouse.frameX = 0;
        if (camera.bottom - mouse.frameY > camera.limit) mouse.frameY = 0;
        camera.left = camera.left + mouse.frameX;
        //camera.top = camera.top + mouse.frameY;
        camera.right = camera.right - mouse.frameX;
        //camera.bottom = camera.bottom - mouse.frameY;
    }

}