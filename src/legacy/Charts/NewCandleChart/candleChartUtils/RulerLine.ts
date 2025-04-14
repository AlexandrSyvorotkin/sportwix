import { mouse, MouseActions } from './mouse';
import drawLine from './drawLine/drawLine';
import drawCircle from './drawCircle/drawCircle';
// import { ChartDrawer } from '../NewCandleChart';

type AxisCoord = number | undefined;

interface PointCoords {
  x: AxisCoord;
  y: AxisCoord;
}

interface Point {
  rel: PointCoords;
  abs: PointCoords;
}

interface Params {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  chart: any;
}

class RulerLine {
  private eventController: AbortController;
  private p1: Point;
  private p2: Point;
  private temp: Point;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private chart: any;

  constructor({ canvas, ctx, chart }: Params) {

    console.log("RULER LINE", chart, canvas, ctx)
    //TODO: на данный момент линии будут отрисовываться и за пределами экрана
    this.canvas = canvas;
    this.ctx = ctx;
    this.chart = chart;

    this.eventController = new AbortController();
    mouse.action = MouseActions.Draw;

    this.p1 = {
      rel: { x: undefined, y: undefined },
      abs: { x: undefined, y: undefined },
    };
    this.p2 = {
      rel: { x: undefined, y: undefined },
      abs: { x: undefined, y: undefined },
    };
    this.temp = {
      rel: { x: undefined, y: undefined },
      abs: { x: undefined, y: undefined },
    };

    this.move = this.move.bind(this);
    this.down = this.down.bind(this);
    this.display = this.display.bind(this);

    canvas.addEventListener("mousedown", this.down, {
        signal: this.eventController.signal,
    });
    canvas.addEventListener("mousemove", this.move, {
        signal: this.eventController.signal,
    });
  }

  private initPoint(point: Point): void {
    const { chart } = this;
    console.log(mouse.x);
    point.abs.x = mouse.x;
    point.abs.y = mouse.y;
    
    point.rel.x = (chart.zeroPosX - mouse.x) / chart.matchWidth;
    point.rel.y = (chart.zeroPosY - mouse.y) / chart.metricHeight;
  }

  private updatePointAbs(point: Point): void {
    console.log(point)
    const { chart } = this;
    if (point === undefined) throw new Error("point не инициализрован");
    // @ts-ignore
    point.abs.x = chart.zeroPosX - point.rel.x * chart.matchWidth;
    // @ts-ignore
    point.abs.y = chart.zeroPosY - point.rel.y * chart.metricHeight; 
  }

  public display (): void {
    const { ctx, p1, p2, temp } = this;

    ctx.strokeStyle = "#B279FF";
    ctx.lineWidth = 1;
    ctx.fillStyle = "white";

    if (this.p1.abs.x !== undefined) {
      // console.log("%СТочки НЕПРАВЛИЛЬНЫЕ!!!!!", "color: red; font-size; 30px;")
      return;
    }

    if (p2.abs.x === undefined) {

        this.updatePointAbs(this.p1);
        //@ts-ignore
        drawLine(ctx, p1.abs.x, p1.abs.y, temp.abs.x, temp.abs.y)
    }
    else {
        this.updatePointAbs(this.p1);
        this.updatePointAbs(this.p2);
        // @ts-ignore
        drawLine(ctx, p1.abs.x, p1.abs.y, p2.abs.x, p2.abs.y);
        ctx.lineWidth = 2;
        // @ts-ignore
        drawCircle(ctx, p2.abs.x, p2.abs.y, 3)
    }

    ctx.lineWidth = 2;
    // @ts-ignore
    drawCircle(ctx, p1.abs.x, p1.abs.y, 3);
  }

  private down(): void {
    if (this.p1.abs.x === undefined) {
      this.initPoint(this.p1);
      this.display();
    }
    else {
      if (this.p2.abs.x === undefined) {
        this.initPoint(this.p2);

        mouse.action = MouseActions.Free;
        this.display();
        this.eventController.abort();
      }
    }
  }

  private move() {
    const { p1, p2 } = this;
    console.log(p1, p2);
    if (p1.abs.x !== undefined && p2.abs.x === undefined) this.initPoint(this.temp);
    if (p2.abs.x !== undefined) this.eventController.abort();
  };

}


export default RulerLine;
