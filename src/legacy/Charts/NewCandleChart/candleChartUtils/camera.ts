export class Camera {
    left: number;
    right: number;
    top: number;
    bottom: number;
    limit: number;
    sizeX: number;
    sizeY: number;

    constructor() {
        this.left = 60;
        this.right = 60;
        this.top = 30;
        this.bottom = 30;

        this.limit = 100;

        this.sizeX = -1;
        this.sizeY = -1;
    }

    updateSize(canvas: { width: number; height: number }) {
        this.sizeX = canvas.width - this.left - this.right;
        this.sizeY = canvas.height - this.top - this.bottom;
    }
}
