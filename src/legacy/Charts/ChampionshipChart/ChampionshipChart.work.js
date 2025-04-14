import { IMG_PATH } from "../../api/variables";

let mousePos = { x: -1, y: -1 }
const deviceScale = window.devicePixelRatio;

const buffer = document.createElement('canvas');
const bufferCtx = buffer.getContext("2d");
const canvas = document.getElementById("chart");

export function championshipChartWork(championshipData, canvasRef, wrapperRef, chartWidth, chartHeight) {

    let mouse = {
        x: -1,
        y: -1,
        relX: -1,
        relY: -1,
        clickX: -1,
        clickY: -1,
        dragX: -1,
        dragY: -1,
        frameX: -1,
        frameY: -1,
        isDrag: false
    };

    let outerImages = [];

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    let canvasIsReady = false

    const scale = window.devicePixelRatio;


    const images = championshipData.reverse().map(it => it.team_s)

    // console.log(images, 'images')

    function init() {
        // canvas.width = chartWidth * window.innerWidth / 100;
        // canvas.height = chartHeight * window.innerHeight / 100;

        canvas.width = Math.round(canvas.offsetWidth) // * deviceScale);
        canvas.height = Math.round(canvas.offsetHeight) //* deviceScale);

        canvas.imageSmoothingEnabled = true;
        canvas.imageSmoothingQuality = "high";
    }

    

    init()

    // let requestFrame = (function () {
    //     return (
    //        window.requestAnimationFrame ||
    //        window.mozRequestAnimationFrame ||
    //        window.oRequestAnimationFrame ||
    //        window.msRequestAnimationFrame ||
    //        function (func) {
    //           window.setTimeout(func, 1000 / 25);
    //        }
    //     );
    //  })();


    // window.addEventListener("resize", function () {
    //     init();
    //     canvas.width = Math.round(canvas.offsetWidth) // * deviceScale);
    //     canvas.height = Math.round(canvas.offsetHeight)
         
    //     requestFrame(drawChart);
    // });


    console.log(championshipData)
   
    let outerMaxMetric;
    let outerMinMetric;
    let outerScaleX;
    let outerScaleY;
    const notSortedData = championshipData.map(obj => ({ ...obj }));

    let outerSortedData = notSortedData.sort((a, b) => a.score - b.score);  

    function defineChartParams() {
        outerMaxMetric = Math.max(...championshipData.map((item) => item.score));
        outerMinMetric = Math.min(...championshipData.map((item) => item.score));   
        outerScaleX = (canvas.width - 80) / (outerSortedData.length - 1);
        outerScaleY = (canvas.height - 150) / (outerMaxMetric - outerMinMetric);
        return [outerScaleX, outerScaleY, outerMaxMetric, outerMinMetric];
    }



    defineChartParams()

    function preloadImages(teams) {
        let loadedCounter = 0;
        let toBeLoadedNumber = teams.length;
        teams.forEach(function (item) {
            preloadImage(item, function (img) {
                outerImages.push(img);
                loadedCounter++;
                // console.log(outerImages)
                if (loadedCounter === toBeLoadedNumber) {
                    return outerSortedData;
                }
            });
        });

        function preloadImage(item, anImageLoadedCallback) {
            let img = new Image();
            img.onload = anImageLoadedCallback(img);
            ctx.imageSmoothingQuality = "high";
            img.src = `${IMG_PATH}${item.team_img}`;
        }
    }

    preloadImages(outerSortedData)

    let drawLine = (x1, y1, x2, y2) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function clearCanvas() {
        ctx.fillStyle = "#1F1F1F";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawMouseCross() {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.setLineDash([10, 5]);
        drawLine(0, mouse.y, canvas.width, mouse.y);
        drawLine(mouse.x, 0, mouse.x, canvas.height);
        ctx.setLineDash([]);
    }
    canvas.addEventListener('mousemove', (e) => {
        mousePos.x = e.offsetX;
        mousePos.y = e.offsetY;
        clearCanvas()
        drawChart()
    });

    let scaleX = outerScaleX;
    let scaleY = outerScaleY;
    let maxMetric = outerMaxMetric;
    let minMetric = outerMinMetric;


    function drawChart() {

        function drawLines() {
            const lineCoordinates = outerSortedData.map((item, index) => {
                const x = 40 + scaleX * index;
                const y = canvas.height - 40 - scaleY * (item.score - minMetric);
                return { x, y };
            });

            ctx.strokeStyle = "#5C5C5C";

            ctx.beginPath();
            ctx.moveTo(lineCoordinates[0].x, lineCoordinates[0].y);
            lineCoordinates.forEach((coord, index) => {
                if (index > 0) {
                    ctx.lineTo(coord.x, coord.y);
                }
            });
            ctx.stroke();
        }

        drawLines();



        let cursorFound = false;
        let indexUnderCursor = undefined;
        let circleRadius = Math.floor(scaleX / 3.5);
        circleRadius <= 15 && (circleRadius = 15);

        let tooltipParams = { text: "", x: undefined, y: undefined };

        outerSortedData.forEach((item, index) => {
            let isUnderCursor = false;

            const x = 40 + Math.floor(scaleX * index);
            const y = canvas.height - 40 - Math.floor(scaleY * (item.score - minMetric));

            if (!cursorFound) {
                if (x < mousePos.x + circleRadius) {
                    let dist = Math.hypot(mousePos.x - x, mousePos.y - y);
                    if (dist < circleRadius) {
                        cursorFound = true;
                        isUnderCursor = true;
                        indexUnderCursor = index;
                    }
                }
                else {
                    cursorFound = true;
                }
            }

            let currentImage = outerImages[index];
            let scaledImageWidth = scaleX <= 10 ? 10 : scaleX;
            let scaledImageHeight = Math.round((scaledImageWidth / currentImage.width) * currentImage.height);

            function drawImages() {
                ctx.drawImage(
                    currentImage,
                    x - scaledImageWidth / 2,
                    y - scaledImageHeight * 1.41,
                    scaledImageWidth,
                    scaledImageHeight);
            }



            function drawCircles() {

                if (isUnderCursor) {
                    ctx.fillStyle = '#ffffff';
                }
                else {
                    ctx.fillStyle = '#5C5C5C';
                }
                ctx.beginPath();
                ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
                ctx.fill();
            }

            function drawTeamPoints() {
                
                ctx.textAlign = "left";
                ctx.textBaseline = "alphabetic";

                if (isUnderCursor) {
                    ctx.fillStyle = "#5C5C5C"
                } else {
                    ctx.fillStyle = "white";
                }
                ctx.font = (circleRadius) + 'px Arial'
                ctx.fillText(
                    item.score.toFixed(0).toString(),
                    x - circleRadius / 2 - 1, y + circleRadius / 3);
            }

            drawCircles();
            drawImages(currentImage, scaledImageWidth, scaledImageHeight);
            drawTeamPoints()
            if (isUnderCursor) {
                tooltipParams.text = item.team_name;
                tooltipParams.x = x;
                tooltipParams.y = y - circleRadius - scaledImageHeight - 5;
            }

        });

        if (indexUnderCursor !== undefined) {
            drawChartTooltip(
                tooltipParams.text,
                "#111", "#fff",
                tooltipParams.x, tooltipParams.y, 10);
        }
    }

    function drawChartTooltip(
        text = "",
        textColor,
        rectColor,
        rectX,
        rectBottomY,
        rectR = 0
    ) {
        ctx.fillStyle = rectColor;
        ctx.textAlign = "center";
        ctx.font = '16px serif';

        let textMetrics = ctx.measureText(text);

        let textTopX = textMetrics.actualBoundingBoxAscent;
        let textWidth = textMetrics.width;

        let boxXOffset = 10;
        let boxYOffset = 10;

        let rectH = textTopX + boxYOffset * 2;

        let textX = rectX;
        let textY = rectBottomY - boxYOffset;

        let rectW = textWidth + boxXOffset * 2;

        if (rectR === 0) {
            ctx.fillRect(rectX - rectW / 2, rectBottomY - rectH, rectW, rectH);
        }
        else {
            ctx.beginPath();
            ctx.roundRect(rectX - rectW / 2, rectBottomY - rectH, rectW, rectH, rectR);
            ctx.fill();
        }

        if (text.length > 0) {
            ctx.fillStyle = textColor;

            ctx.fillText(text, textX, textY, rectW);
        }
    }


    drawChart()
}
