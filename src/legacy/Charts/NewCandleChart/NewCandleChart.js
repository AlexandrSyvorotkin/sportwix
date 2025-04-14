import { IMG_PATH } from "../../api/variables";
import clearCanvas from "./candleChartUtils/clearCanvas/clearCanvas";
import defineChartParams from "./candleChartUtils/defineChartParams/defineChartParams";
import drawCircle from "./candleChartUtils/drawCircle/drawCircle";
import drawLine from "./candleChartUtils/drawLine/drawLine";
import drawMouseCross from "./candleChartUtils/drawMouseCross/drawMouseCross";
import { mouse, MouseActions } from './candleChartUtils/mouse';
import { Camera } from "./candleChartUtils/camera";

import {handleMouseDown, handleMouseMove, handleMouseOut} from "./candleChartUtils/eventHandlers/eventHandlers";
import { handleMouseUp } from "./candleChartUtils/eventHandlers/eventHandlers";

import RulerLine from "./candleChartUtils/RulerLine";
import drawNews from "./candleChartUtils/drawNews/drawNews";
import drawSeasonsBorderText from "./candleChartUtils/drawSeasonsBorderText/drawSeasonsBorderText";
import drawSeasonsBars from "./candleChartUtils/drawSeasonsBars/drawSeasonsBars";



// Функция для обработки событий
function handleChartEvents() {
    const singleChart = document.getElementById('single_chart');
    if (singleChart) {
        singleChart.addEventListener("mousedown", () => handleMouseDown(singleChart)); // ++ 
        singleChart.addEventListener("mouseup", () => handleMouseUp(singleChart)); // ++
    }
}

// Создаем экземпляр MutationObserver
const observer = new MutationObserver(function(mutationsList) {
    mutationsList.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            // Если есть изменения в дочерних элементах
            handleChartEvents();
        }
    });
});

// Настройка наблюдения за изменениями в DOM
observer.observe(document.body, { subtree: true, childList: true });


// canvas.addEventListener("mousedown", () => handleMouseDown(canvas)); // ++ 
// canvas.addEventListener("mouseup", () => handleMouseUp(canvas)); // ++
// canvas.addEventListener("mousemove", (e) => handleMouseMove(e, chartConstants, canvas.width, canvas.height, camera));
// canvas.addEventListener("mouseout",() => handleMouseOut(chartConstants, drawChart, ctx, canvas, colors.bkg))


// const deviceScale = window.devicePixelRatio;
// const buffer = document.createElement('canvas');
// const browserScale = Math.round((window.outerWidth - 15) / window.innerWidth * 100) / 100;
// const canvas = document.getElementById('single_chart')
// const canvas = document.getElementById(canvasCandleRef)
// const ctx = canvas?.getContext("2d");
const chartConstants = {
    mouseCrossVisible: false
}

let alphaChannel = 1;

const colorsPalette = {
    ligthTheme: {
        red: "hwb(350 20% 5%)",
        yellow: "hwb(50 10% 15%)",
        green: "hwb(160 0% 50%)",
        text: "black",
        axis: "#818BA6",
        bkg: "white"
    },
    darkTheme: {
        red: "hwb(5 20% 0%)",
        yellow: "hwb(50 0% 15%)",
        green: "hwb(100 0% 45%)",
        text: "white",
        axis: "#333",
        bkg: "#1F1F1F"
    },
    colors: {
        colorDraw: `rgba(239, 255, 60, ${alphaChannel})`,
        colorWin: `rgba(70, 154, 31, ${alphaChannel})`,
        colorLose: `rgba(237, 57, 47, ${alphaChannel})`,
    }
}


export function newCandleChart(canvasCandleRef, candles, rulerActive, setCandleParams, seasons, theme, FilterByGames, teams, chartType, team_img, first_team_img, second_team_img, setMiniNews, width, height, team_images) {
    console.log(FilterByGames)

    const canvas = document.getElementById(canvasCandleRef)
    const ctx = canvas?.getContext("2d");

    const newsTooltip = document.querySelector('#news_tooltip')

    let canvasIsReady = false;

    

    let rulerLines = [];
    let teamLogo;
    let firstImg
    let secondImg
    let tooltipCandleData = undefined;
    let chart, bkg;
    let smoothScroll;
    let camera;

    const colors = theme === 'dark' ? colorsPalette.darkTheme : colorsPalette.ligthTheme;


    function initLeagueLogo() {
        teamLogo = new Image();
        const imgPath = team_img;
        teamLogo.src = imgPath;
        teamLogo.onload = () => {
            teamLogo.ready = true;
        }
    }

    function initFirstTeamImg() {
        firstImg = new Image();
        const imgPath = `${IMG_PATH}${first_team_img}`
        // const imgPath = first_team_img
        firstImg.src = imgPath;
        firstImg.onload = () => {
            firstImg.ready = true;
        }
    }

    function initSecondTeamImg() {
        secondImg = new Image();
        const imgPath = `${IMG_PATH}${second_team_img}`;
        // const imgPath = second_team_img;
        secondImg.src = imgPath;
        secondImg.onload = () => {
            secondImg.ready = true;
        }
    }

    // function initImages(images) {
    //     for (let key in images) {
    //         if (images.hasOwnProperty(key)) {
    //             const img = new Image();
    //             const imgPath = images[key];
    //             img.src = `${IMG_PATH}${imgPath}`;
    //             img.onload = () => {
    //                 img.ready = true;
    //             }
    //         }
    //     }
    // }

    

    

    

    class SmoothScroll {
        constructor(speed, smooth) {
            this.moving = false;
            this.acceleration = 0;
            this.speed = speed;
            this.smooth = smooth;
            this.ctrlKey = false;

            this.scrolled = (e) => {
                e.preventDefault();
                if (e.deltaY) {
                    let normalizedDelta = Math.round(Math.sign(e.deltaY) * camera.sizeY / 100 * this.speed);
                    this.acceleration = normalizedDelta; // * this.speed
                    this.ctrlKey = e.ctrlKey;


                    if (!this.moving) this.update();
                }
            };

            this.update = () => {
                if (
                    (chart.matchWidth < 2 && Math.sign(this.acceleration) > 0) ||
                    (chart.matchWidth > canvas.width / 3 &&
                        Math.sign(this.acceleration) < 0)
                ) {
                    this.moving = false;
                    this.acceleration = 0;
                }
                else {
                    if (Math.abs(this.acceleration) > 1) {
                        // console.log(this.acceleration)
                        this.moving = true;

                        this.acceleration -= this.acceleration / this.smooth;

                        let delta = this.acceleration;

                        let mouseRelToCameraX = (-camera.left + mouse.x) / camera.sizeX;
                        let mouseRelToCameraY = (-camera.top + mouse.y) / camera.sizeY;

                        let to = Math.min(camera.limit, camera.top + delta * mouseRelToCameraY);
                        let bo = Math.min(camera.limit, camera.bottom + delta * (1 - mouseRelToCameraY));
                        let lo = Math.min(camera.limit, camera.left + delta * mouseRelToCameraX);
                        let ro = Math.min(camera.limit, camera.right + delta * (1 - mouseRelToCameraX));

                        if (this.ctrlKey) {
                            camera.top = to;
                            camera.bottom = bo;
                            camera.left = lo;
                            camera.right = ro;
                        }
                        else {
                            let currentRightChartPoint =
                                Math.min(canvas.width - camera.right, canvas.width - chart.rightOffset);

                            let rightChartRelToCameraX = (-camera.left + currentRightChartPoint) / camera.sizeX;

                            camera.left =
                                Math.min(camera.limit, camera.left + delta * rightChartRelToCameraX);
                            camera.right =
                                Math.min(camera.limit, camera.right + delta * (1 - rightChartRelToCameraX));
                        }

                        camera.sizeX = -camera.left + canvas.width - camera.right;
                        camera.sizeY = -camera.top + canvas.height - camera.bottom;

                    }
                    else {
                        this.moving = false;
                        this.acceleration = 0;
                    }
                }
            };

            canvas.removeEventListener("mousewheel", this.scrolled);
            canvas.removeEventListener("DOMMouseScroll", this.scrolled);

            canvas.addEventListener("mousewheel", this.scrolled, { passive: false });
            canvas.addEventListener("DOMMouseScroll", this.scrolled, {
                passive: false,
            });
        }
    }
 

    class ChartDrawer {
        constructor([candles, maxMetric, minMetric]) {
            this.candles = candles;
            this.minMetric = minMetric;
            this.maxMetric = maxMetric;

            this.rightOffset = 30;
            this.bottomAxisOffset = 40;
            this.bottomChartOffset = 10;
            this.topChartOffset = camera.top;

            //camera.top = this.topChartOffset;
            //camera.bottom = this.bottomAxisOffset + this.bottomChartOffset;

            this.wholeMetric = undefined;
            this.matchWidth = undefined;
            this.metricHeight = undefined;
            this.zeroPosY = undefined;
            this.zeroPosX = undefined;

            this.minVisibleY = NaN;
            this.maxVisibleY = NaN;

            this.firstVisibleCandleIndex = 0;
            this.lastVisibleCandleIndex = this.candles.length - 1;
        }

        getWholeMetric(minMetric = this.minMetric, maxMetric = this.maxMetric) {
            return Math.abs(minMetric) + Math.abs(maxMetric);
        }

        getMetricHeight(wholeMetric = this.wholeMetric) {
            return (canvas.height - camera.bottom - camera.top) / wholeMetric;
        }

        getZeroPosY(metricHeight = this.metricHeight, maxMetric = this.maxMetric) {
            return Math.round(camera.top + metricHeight * maxMetric);
        }

        getMatchWidth(candles = this.candles) {
            // console.log(canvas.width, camera.left, camera.right,  candles.length - 1)
            //TODO: чекнуть правильно ли пофиксил ошибку.
            return Math.abs((canvas.width - camera.left - camera.right) / (candles.length - 1));
        };

        updateMetrics(candles, minMetric, maxMetric) {
            if (maxMetric !== undefined) {
                let wholeMetric = this.getWholeMetric(minMetric, maxMetric);
                let metricHeight = this.getMetricHeight(wholeMetric);
                let zeroPosY = this.getZeroPosY(metricHeight, maxMetric);
                let matchWidth = this.getMatchWidth(candles);
                let zeroPosX = camera.left;
                return {
                    wholeMetric: wholeMetric,
                    metricHeight: metricHeight,
                    zeroPosY: zeroPosY,
                    matchWidth: matchWidth,
                    zeroPosX: zeroPosX
                };
            }
            else {
                this.wholeMetric = this.getWholeMetric();
                this.metricHeight = this.getMetricHeight();
                this.zeroPosY = this.getZeroPosY();
                this.matchWidth = this.getMatchWidth();
                this.zeroPosX = camera.left;
            }
        }

        draw() {
            //console.log(this.metricHeight);
            canvasIsReady = false;
            this.updateMetrics();

            ctx.strokeStyle = "#333";
            ctx.lineWidth = 1;
            drawLine(ctx, 0, this.zeroPosY, canvas.width - 55, this.zeroPosY);

            bkg.update();

            bkg.drawAxisY();
            bkg.drawAxisX();

            this.minVisibleY = this.maxMetric;
            this.maxVisibleY = this.minMetric;
            this.firstVisibleCandleIndex = this.candles.length - 1;
            this.lastVisibleCandleIndex = 0;
            let candleWidth = this.matchWidth * 0.75;

            for (let i = 0; i < this.candles.length; i++) {
                let curCandle = this.candles[i];
                let candlePosX = this.zeroPosX + i * this.matchWidth;
                let drawAttempt = drawCandle(curCandle, candleWidth, this.metricHeight, {
                    x: candlePosX,
                    y: this.zeroPosY,
                });
                if (drawAttempt) {
                    if (
                        mouse.x > candlePosX - candleWidth / 2 &&
                        mouse.x < candlePosX + candleWidth / 2
                    ) {

                        //TODO: подумать, должен ли при перетаскивании меняться тултип, если курсор съехал
                        // со свечки, на которой началось перетаскивание.

                        //TODO: когда палец отпускает экран - mouse.action становится Free и тултип один раз обновляется
                        // подумать, нужно ли это

                        if (tooltipCandleData === undefined ||
                            tooltipCandleData.match_uuid !== curCandle.match_uuid &&
                            (mouse.action !== MouseActions.TouchDrag || mouse.touchFocus)) {
                            tooltipCandleData = curCandle;
                            // console.log(tooltipCandleData);
                        }
                    }
                    this.minVisibleY = Math.min(this.minVisibleY, curCandle.low);
                    this.maxVisibleY = Math.max(this.maxVisibleY, curCandle.high);
                    this.firstVisibleCandleIndex = Math.min(this.firstVisibleCandleIndex, i);
                    this.lastVisibleCandleIndex = Math.max(this.lastVisibleCandleIndex, i);
                }
            }

            this.minVisibleY = this.zeroPosY - this.minVisibleY * this.metricHeight;
            this.maxVisibleY = this.zeroPosY - this.maxVisibleY * this.metricHeight;

            let bottomDelta = Math.round((canvas.height - this.minVisibleY) - this.bottomAxisOffset - this.bottomChartOffset);
            let topDelta = Math.round(this.maxVisibleY - this.topChartOffset);

            camera.bottom -= bottomDelta / 5;
            camera.top -= topDelta / 5;

            canvasIsReady = true;
        }

    }

    class BkgDrawer {

        update() {
            this.scaleMinSizeY = 100;
            this.matchesLength = chart.candles.length;

            this.barsHeight = 15;
            this.scaleAmount = Math.max(
                1,
                Math.pow(
                    2,
                    Math.floor(
                        Math.log2(Math.floor(this.scaleMinSizeY / chart.metricHeight))
                    )
                )
            );

            this.topScaleMetric = Math.ceil(chart.zeroPosY / chart.metricHeight);
            this.bottomScaleMetric = Math.ceil(
                (canvas.height - chart.zeroPosY) / chart.metricHeight
            );
            let calculateScaleX = () => {
                ctx.font = "bold 12px serif";
                this.scaleAmountX = Math.ceil(
                    (ctx.measureText(chart.candles[0].date).width + 20) / chart.matchWidth);


                let diapasonsAmt = Math.floor(this.matchesLength / this.scaleAmountX);


                this.additionalScalesArray = new Array(diapasonsAmt);

                this.additionalScalesArray.fill(0);
                let leavedCandles = this.matchesLength % this.scaleAmountX;
                if (leavedCandles === 0) {
                    this.additionalScalesArray[this.additionalScalesArray.length - 1] = -1;
                }
                else {
                    let additionalScaleX = Math.ceil(leavedCandles / diapasonsAmt);
                    let j = 0;
                    for (let i = 0; i <= this.matchesLength; i += this.scaleAmountX) {
                        if (i > 0 && leavedCandles >= 1) {
                            if (leavedCandles <= additionalScaleX) {
                                additionalScaleX = leavedCandles - 1;
                            }
                            this.additionalScalesArray[j] = additionalScaleX;
                            i += additionalScaleX;
                            leavedCandles -= additionalScaleX;
                            j++;
                        }
                    }
                }
            };
            calculateScaleX();
        }

        drawWholeAxis() {
            this.drawCandleTooltip()

            this.drawAxisYOverlay();
            this.drawTextY();

            this.drawAxisXOverlay();
            this.drawTextX();

            this.drawAxisCornerOverlay();

            this.drawLastVisibleCandleOnY();

            // drawSeasonsBars(chart.zeroPosX, seasons, chart, mouse.x, mouse.y, ctx, canvas.height, chart.barsHeight, colorLose, colorDraw, colorWin, this.drawRectWithText)

            this.drawSeasonsBars()

        }

        


        drawSeasonsBars() {
            let seasonOffset = chart.zeroPosX;
            for (let i = 0; i < seasons.length; i++) {
                //let games = seasons[i].games;
                let wins = seasons[i].wins;
                let draws = seasons[i].draws;
                let losses = seasons[i].losses;
                let winsWidth = wins * chart.matchWidth;
                let drawsWidth = draws * chart.matchWidth;
                let lossesWidth = losses * chart.matchWidth;


                let drawSeasonBarRect = (text = "", color) => {
                    let actualText = "";
                    if (mouse.x > x && mouse.x < x + w && mouse.y > y && mouse.y < y + h) {
                        actualText = text;
                    }

                    this.drawRectWithText(
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
                let y = canvas.height - this.barsHeight;
                let w = Math.ceil(lossesWidth);
                let h = this.barsHeight;

                drawSeasonBarRect(losses.toString(), colorsPalette.colors.colorLose);

                // доделать
                ctx.fillStyle = 'white'; // цвет заливки
                ctx.fillRect(x, y, 2, this.barsHeight);

                x += w;
                w = drawsWidth;
                drawSeasonBarRect(draws.toString(), colorsPalette.colors.colorDraw);


                x += w;
                w = winsWidth;
                drawSeasonBarRect(wins.toString(), colorsPalette.colors.colorWin);



                //let seasonWidth = games * chart.matchWidth;
                seasonOffset += winsWidth + lossesWidth + drawsWidth;

            }
        }

        drawCandleTooltip() {
            if (tooltipCandleData === undefined) return;
            setCandleParams({
                params: {
                    high: tooltipCandleData.high,
                    open: tooltipCandleData.open,
                    low: tooltipCandleData.low,
                    close: tooltipCandleData.close,
                    date: tooltipCandleData.date,
                    home_team_img: tooltipCandleData.home_team_img,
                    away_team_img: tooltipCandleData.away_team_img,
                    score: tooltipCandleData.score,
                    home_team: tooltipCandleData.home_team,
                    away_team: tooltipCandleData.away_team,
                    time: tooltipCandleData?.on_time
                }
            })
        }

        drawAxisX() {
            ctx.strokeStyle = colors.axis;
            ctx.lineWidth = 0.5;
            let j = -1;
            for (
                let i = 0;
                i <= this.matchesLength;
                i += this.scaleAmountX + this.additionalScalesArray[j]
            ) {
                drawLine(
                    ctx,
                    chart.zeroPosX + i * chart.matchWidth,
                    0,
                    chart.zeroPosX + i * chart.matchWidth,
                    canvas.height - chart.bottomAxisOffset
                );
                j++;
            }
        }

        drawTextX() {
            let j = -1;
            ctx.textAlign = "center";
            ctx.textBaseline = "alphabetic";
            ctx.fillStyle = colors.text;
            ctx.font = '12px serif';
            for (
                let i = 0;
                i <= this.matchesLength;
                i += this.scaleAmountX + this.additionalScalesArray[j]
            ) {
                ctx.fillText(
                    "" + chart.candles[i].date,
                    chart.zeroPosX + i * chart.matchWidth,
                    canvas.height - chart.bottomAxisOffset + 16
                );
                j++;
            }
        }

        drawAxisY() {
            ctx.strokeStyle = colors.axis;
            ctx.lineWidth = 0.5;
            this.drawOneAxisYSide(this.topScaleMetric, 1);
            this.drawOneAxisYSide(this.bottomScaleMetric, -1);
        }

        drawTextY() {
            ctx.textAlign = "left";
            ctx.textBaseline = "alphabetic";
            ctx.fillStyle = colors.text;
            ctx.font = '12px serif';
            this.drawOneTextYSide(this.topScaleMetric, 1);
            this.drawOneTextYSide(this.bottomScaleMetric, -1);
        }

        drawAxisXOverlay() {
            ctx.fillStyle = colors.bkg;
            let h = canvas.height;
            let w = canvas.width;
            let invOffY = h - chart.bottomAxisOffset;
            ctx.fillRect(0, invOffY, w, chart.bottomAxisOffset);
        }

        drawAxisCornerOverlay() {
            ctx.fillStyle = colors.bkg;
            let h = canvas.height;
            let w = canvas.width;
            let invOffX = w - chart.rightOffset;
            let invOffY = h - chart.bottomAxisOffset;
            ctx.fillRect(
                invOffX,
                invOffY,
                chart.rightOffset,
                chart.bottomAxisOffset
            );
        }

        drawAxisYOverlay() {
            ctx.fillStyle = colors.bkg;
            let h = canvas.height;
            let w = canvas.width;
            let invOffX = w - chart.rightOffset;
            ctx.fillRect(invOffX, 0, chart.rightOffset, h);
        }

        drawLastVisibleCandleOnY() {
            let lastVisibleCandle = chart.candles[chart.lastVisibleCandleIndex]
            let open = lastVisibleCandle.open;
            let close = lastVisibleCandle.close;

            ctx.textAlign = "left";
            ctx.font = '12px serif';
            let text = close.toString();

            let textColor, rectColor;

            if (close === open) {
                textColor = colors.bkg;
                rectColor = colors.yellow;
            }
            if (close > open) {
                textColor = colors.text;
                rectColor = colors.green;
            }
            if (close < open) {
                textColor = colors.text;
                rectColor = colors.red;
            }

            let textMetrics = ctx.measureText(text);

            let textTopX = textMetrics.actualBoundingBoxAscent;
            let textWidth = textMetrics.width;

            let boxXOffset = 10;
            let boxYOffset = 10;

            let textX = canvas.width - chart.rightOffset;
            let textY = Math.ceil(
                chart.zeroPosY - close * chart.metricHeight + textTopX / 2
            );

            let rectH = textTopX + boxYOffset * 2;

            let rectX = textX - boxXOffset;
            let rectY = textY - rectH + boxYOffset;

            let rectW = textWidth + boxXOffset * 2;

            this.drawRectWithText(
                text,
                textColor,
                "center",
                "middle",
                rectColor,
                rectX,
                rectY,
                rectW,
                rectH,
                2
            );
        }

        drawRectWithText(
            text = "",
            textColor,
            textAlign,
            textBase,
            rectColor,
            rectX,
            rectY,
            rectW,
            rectH,
            rectR = 0
        ) {
            ctx.fillStyle = rectColor;


            if (rectR === 0) {
                ctx.fillRect(rectX, rectY, rectW, rectH);
            }
            else {
                ctx.beginPath();
                ctx.roundRect(rectX, rectY, rectW, rectH, rectR);
                ctx.fill();
            }


            if (text.length > 0) {
                ctx.textAlign = textAlign;
                ctx.textBaseline = textBase;
                let textX, textY;
                switch (textAlign) {
                    case "left":
                        textX = rectX;
                        break;
                    case "center":
                        textX = rectX + rectW / 2;
                        break;
                    case "right":
                        textX = rectX + rectW;
                        break;
                }
                switch (textBase) {
                    case "top":
                        textY = rectY;
                        break;
                    case "middle":
                        textY = rectY + rectH / 2;
                        break;
                    case "bottom":
                        textY = rectY + rectH;
                        break;
                }
                ctx.font = '12px serif';

                ctx.fillStyle = textColor;

                ctx.fillText(text, textX, textY, rectW);
            }
        }

        drawOneTextYSide(maxScaleMetric, side) {
            for (let i = 0; i <= maxScaleMetric; i += this.scaleAmount) {
                ctx.fillText(
                    "" + i * side,
                    canvas.width - chart.rightOffset,
                    chart.zeroPosY - i * chart.metricHeight * side + 5
                );
            }
        }

        drawOneAxisYSide(maxScaleMetric, side) {
            for (let i = 0; i <= maxScaleMetric; i += this.scaleAmount) {
                drawLine(
                    ctx,
                    0,
                    chart.zeroPosY - i * chart.metricHeight * side,
                    canvas.width - chart.rightOffset - 5,
                    chart.zeroPosY - i * chart.metricHeight * side
                );
            }
        }
    }
    let requestFrame = (function () {
        return (
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (func) {
                window.setTimeout(func, 1000 / 25);
            }
        );
    })();


    function init() {

        
        // //фиксят баг со свойствами канваса
        canvas.width = width * window.innerWidth / 100;
        canvas.height = height * window.innerHeight / 100;
        //  canvas.width = window.innerWidth / 100;
        //  canvas.height = window.innerHeight / 100;

        canvas.width = Math.round(canvas.offsetWidth) // * deviceScale);
        canvas.height = Math.round(canvas.offsetHeight) //* deviceScale);

        // console.log(canvas.width)
        // console.log(canvas.height)

        //  canvas.width = Math.round(canvasCandleRef.innerWidth);
        //  canvas.height = Math.round(canvasCandleRef.innerHeight);

        camera = new Camera();
        camera.updateSize(canvas);

        chart = new ChartDrawer([candles, outerMaxMetric, outerMinMetric]);
        bkg = new BkgDrawer()

        if (rulerActive) rulerLines.push(new RulerLine({
            canvas, ctx, chart
        }));

    

        smoothScroll = new SmoothScroll(3, 36);


        initLeagueLogo()
        initFirstTeamImg()
        initSecondTeamImg()

    }

    const [outerMaxMetric, outerMinMetric] = defineChartParams(candles, canvas)
    init();



    const eventHandlers = {};

    window.addEventListener("resize", init); 
    // canvas.addEventListener("mousedown", () => handleMouseDown(canvas)); // ++ 
    // canvas.addEventListener("mouseup", () => handleMouseUp(canvas)); // ++
    
    
    function createEventListeners(e) {
        
        
        canvas.addEventListener("mousemove", (e) => handleMouseMove(e, chartConstants, canvas.width, canvas.height, camera, newsTooltip, setMiniNews));
        canvas.addEventListener("mouseout",() => handleMouseOut(chartConstants, drawChart, ctx, canvas, colors.bkg))
        // eventHandlers['mouseup'] = handleMouseUp
        // eventHandlers['mousemove'] = handleMouseMove
        // // eventHandlers['mousedown'] = handleMouseDown
        // eventHandlers['mouseout'] = handleMouseOut
        // eventHandlers['resize'] = init

    }
    createEventListeners()

    // function removeEventListener() {
    //     window.removeEventListener('resize', init)
    //     canvas.removeEventListener('mouseout', handleMouseOut)
    //     canvas.removeEventListener('mousemove', handleMouseMove, {capture: true})
    //     canvas.removeEventListener('mouseup', handleMouseUp)
    //     canvas.removeEventListener('mousedown', handleMouseDown)
    // }

    // removeEventListener()


    function drawChart() {
        clearCanvas(ctx, colors.bkg, canvas)
        if (chartConstants.mouseCrossVisible) {
            drawMouseCross(ctx, colors.text, canvas, mouse.x, mouse.y)
        }
        smoothScroll.update();

        chart.draw();

        for (let i = 0; i < rulerLines.length; i++) {
            rulerLines[i].display();
        }

        bkg.drawWholeAxis();

        requestFrame(drawChart);
    }



    function drawCandle(candle, scaleX, scaleY, pos) {

        let ifNeutral = 0;

        let open = candle.open;
        let high = candle.high;
        let low = candle.low;
        let close = candle.close;

        switch (FilterByGames) {
            case 'Дома':
                alphaChannel = candle.is_home ? 1 : 0.1;
                break;
            case 'В гостях':
                alphaChannel = candle.is_home ? 0.1 : 1;
                break;
            case '2':
                alphaChannel = candle.all_goals >= 3 ? 0.1 : 1;
                break;
            case '1':
                alphaChannel = candle.all_goals <= 2 ? 0.1 : 1;
                break;
            case '1T':
                alphaChannel = candle.on_time === '1' ? 1 : 0.1;
                break;
            case '2T':
                alphaChannel = candle.on_time === '2' ? 1 : 0.1;
                break;
            case '':
                alphaChannel = 1;
                break;
            default:
                alphaChannel = 1;
                break;
        }


        if (close === open) {
            ctx.strokeStyle = colorsPalette.colors.colorDraw;
            ifNeutral = 3;
        }
        if (close > open) {
            ctx.strokeStyle = colorsPalette.colors.colorWin;
        }
        if (close < open) {
            ctx.strokeStyle = colorsPalette.colors.colorLose;
        }

        let highY = pos.y - high * scaleY;
        let lowY = pos.y - low * scaleY;
        let openY = pos.y - open * scaleY;
        let closeY = pos.y - close * scaleY + ifNeutral;
        let leftCandleSideX = pos.x - Math.ceil(scaleX / 2);
        let rightCandleSideX = pos.x + Math.ceil(scaleX / 2);

        let isDrawing = false;

        if (
            pos.x > 0 &&
            pos.x < canvas.width - chart.rightOffset &&
            (
                (highY > 0 && highY < canvas.height - chart.bottomAxisOffset) ||
                (lowY > 0 && lowY < canvas.height - chart.bottomAxisOffset))
        ) {
            ctx.lineWidth = 2;
            drawLine(ctx, pos.x, highY, pos.x, lowY);
            isDrawing = true;
        }

        if (
            scaleX > 2 &&
            rightCandleSideX > 0 &&
            leftCandleSideX < canvas.width - chart.rightOffset &&
            ((openY > 0 && openY < canvas.height - chart.bottomAxisOffset) ||
                (closeY > 0 && closeY < canvas.height - chart.bottomAxisOffset))
        ) {
            ctx.lineWidth = scaleX;
            drawLine(ctx, pos.x, openY, pos.x, closeY);
            isDrawing = true;
        }

        if (candle.is_first_match === true) {
            ctx.strokeStyle = colors.text;
            ctx.lineWidth = 0.5;
            let topY = chart.bottomChartOffset / 2;
            let bottomY = canvas.height - chart.bottomAxisOffset - topY;
            ctx.setLineDash([5, 5]);
            drawLine(ctx, pos.x, topY - 50, pos.x, bottomY);
            ctx.setLineDash([]);

            function drawLeagueLogo() {
                if (teamLogo.ready) {
                    ctx.drawImage(
                        teamLogo,
                        pos.x - 7,
                        bottomY - 28,
                        15,
                        15);
                }
            }

            ctx.fillStyle = colors.text;
            ctx.beginPath();
            ctx.arc(pos.x, bottomY - 20, 12, 0, 2 * Math.PI);
            ctx.fill();

            drawLeagueLogo()
        }

        // if (candle?.articles?.length > 0) {
        //     drawNews(pos.x, ctx, mouse.x, mouse.y, chart.bottomAxisOffset, canvas.height, newsTooltip, setMiniNews, candle?.articles)
        // }
        


        // function drawFirstTeamImg(x, y) {
        //     if (firstImg.ready) {
        //         ctx.drawImage(
        //             firstImg,
        //             x,
        //             y,
        //             20,
        //             20);
        //     }
        // }
        // function drawSecondTeamImg(x, y) {
        //     if (secondImg.ready) {
        //         ctx.drawImage(
        //             secondImg,
        //             x,
        //             y,
        //             20,
        //             20);
        //     }
        // }

        // if (chartType === 1) {
        //     if (teams.second_team_name === candle.home_team || teams.second_team_name === candle.away_team) {
        //         drawSecondTeamImg(pos.x - 10, highY - 25)
        //     }
        // }

        // if (chartType === 2) {
        //     if (teams.first_team_name === candle.home_team || teams.first_team_name === candle.away_team) {
        //         drawFirstTeamImg(pos.x - 10, highY - 25)
        //     }
        // }

        if (candle.is_first_match === true && candle.league_season.length > 0) {
            drawSeasonsBorderText(ctx, candle, colors.text, pos.x, pos.y)
        }
        

        return isDrawing;
    }

    // let lerp = function (start, stop, amt) {
    //    return amt * (stop - start) + start;
    // }

    // let map = function (n, start1, stop1, start2, stop2, withinBounds) {
    //    let newVal = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    //    if (!withinBounds) {
    //       return newVal;
    //    }
    //    if (start2 < stop2) {
    //       return constrain(newVal, start2, stop2);
    //    }
    //    else {
    //       return constrain(newVal, stop2, start2);
    //    }
    // };

    // let constrain = function (n, low, high) {
    //    return Math.max(Math.min(n, high), low);
    // };
    

    drawChart();

}