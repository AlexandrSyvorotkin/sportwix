import { IMG_PATH } from "../../api/variables";
import store from "../../redux/store";

const deviceScale = window.devicePixelRatio;
const buffer = document.createElement('canvas');
const browserScale = Math.round((window.outerWidth - 15) / window.innerWidth * 100) / 100;



export function candleChartMobile(width, height, canvasCandleRef, candles, rulerActive, setCandleParams, seasons, theme, filterByHomeAwayGames, filterByAmountOfGoals, filterCandleChartByTypeOfTime, teams, chartType, team_img, first_team_img, second_team_img) {

   const canvas = document.getElementById(canvasCandleRef)

   const ctx = canvas?.getContext("2d");

   const newsTooltip = document.querySelector('#news_tooltip')



   if (candles.length === 0) return null
   else {

      let outerMaxMetric;
      let outerMinMetric;
      let outerScaleX;
      let outerScaleY;
      let canvasIsReady = false;
      let mouseCrossVisible = false;

      let longTouchTimeout, clickTimeout;


      const lightTheme = {
         red: "hwb(350 20% 5%)",
         yellow: "hwb(50 10% 15%)",
         green: "hwb(160 0% 50%)",
         text: "black",
         axis: "#818BA6",
         bkg: "white"
      }

      const darkTheme = {
         red: "hwb(5 20% 0%)",
         yellow: "hwb(50 0% 15%)",
         green: "hwb(100 0% 45%)",
         text: "white",
         axis: "#333",
         bkg: "#1F1F1F"
      }



      const colors = theme === 'dark' ? darkTheme : lightTheme;

      let rulerLines = [];


      let teamLogo;
      let firstImg
      let secondImg

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

      class rulerLine {
         constructor() {
            //TODO: на данный момент линии будут отрисовываться и за пределами экрана

            //TODO: обновить mouse actions имена
            rulerLines.push(this);

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

            this.initPoint = (point) => {
               point.abs.x = mouse.x;
               point.abs.y = mouse.y;
               point.rel.x = (chart.zeroPosX - mouse.x) / chart.matchWidth;
               point.rel.y = (chart.zeroPosY - mouse.y) / chart.metricHeight;
            };

            this.updatePointAbs = (point) => {
               point.abs.x = chart.zeroPosX - point.rel.x * chart.matchWidth;
               point.abs.y = chart.zeroPosY - point.rel.y * chart.metricHeight;
            };

            this.down = () => {
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
            };

            this.move = () => {
               if (this.p1.abs.x !== undefined && this.p2.abs.x === undefined) {
                  this.initPoint(this.temp);
               }
               if (this.p2.abs.x !== undefined) this.eventController.abort();
            };

            this.display = () => {
               ctx.strokeStyle = "#B279FF";
               ctx.lineWidth = 1;
               ctx.fillStyle = "white";

               if (this.p1.abs.x === undefined) return;

               if (this.p2.abs.x === undefined) {
                  this.updatePointAbs(this.p1);
                  drawLine(
                     this.p1.abs.x,
                     this.p1.abs.y,
                     this.temp.abs.x,
                     this.temp.abs.y
                  );
               }
               else {
                  this.updatePointAbs(this.p1);
                  this.updatePointAbs(this.p2);
                  drawLine(this.p1.abs.x, this.p1.abs.y, this.p2.abs.x, this.p2.abs.y);
                  ctx.lineWidth = 2;
                  drawCircle(this.p2.abs.x, this.p2.abs.y, 3);
               }

               ctx.lineWidth = 2;
               drawCircle(this.p1.abs.x, this.p1.abs.y, 3);
            };

            canvas.addEventListener("mousedown", this.down, {
               signal: this.eventController.signal,
            });
            canvas.addEventListener("mousemove", this.move, {
               signal: this.eventController.signal,
            });
         }
      }

      class SmoothScroll {
         constructor(speed, smooth) {
            this.moving = false;
            this.acceleration = 0;
            this.speed = speed;
            this.smooth = smooth;
            this.ctrlKey = false;

            this.scrolled = (e) => {
               if (e.deltaY) {
                  this.acceleration = Math.round(Math.sign(e.deltaY) * camera.sizeY / 100 * this.speed);
                  // this.ctrlKey = e.ctrlKey;
                  // console.log(acceleration);
                  if (!this.moving) this.update();
               }
               e.preventDefault();
            };

            this.scrolledMobile = (delta) => {
               longTouchTimeout && clearTimeout(longTouchTimeout);
               // isZooming = false
               delta *= 1;
               // console.log("delta:", delta)
               // console.log("camera.sizeY:", camera.sizeY);
               // console.log("this.speed:", this.speed);
               if (!delta) return;
               this.acceleration = Math.round(Math.sign(delta) * camera.sizeY / 100 * this.speed);
               // console.log("this.acceleration", this.acceleration);
               this.ctrlKey = true;
               if (!this.moving) this.update();
            }

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

            // 
            // canvas.removeEventListener("touch-smooth-scroll", this.scrolledMobile);
            canvas.removeEventListener("mousewheel", this.scrolled);
            canvas.removeEventListener("DOMMouseScroll", this.scrolled);

            // canvas.addEventListener("touch-smooth-scroll", this.scrolledMobile);
            canvas.addEventListener("mousewheel", this.scrolled, { passive: false });
            canvas.addEventListener("DOMMouseScroll", this.scrolled, {
               passive: false,
            });
         }
      }

      let tooltipCandleData = undefined;

      class ChartDrawer {
         constructor([candles, maxMetric, minMetric]) {
            this.candles = candles;
            this.minMetric = minMetric;
            this.maxMetric = maxMetric;

            this.rightOffset = 30;
            this.bottomAxisOffset = 28;
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
            // console.log(canvas.width, camera.left, camera.right, candles.length)
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
            drawLine(0, this.zeroPosY, canvas.width - 55, this.zeroPosY);

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

            this.barsHeight = 8;
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
                  (ctx.measureText(chart.candles[0].date.slice(0,9)).width + 20) / chart.matchWidth
               )
               let diapasonsAmt = Math.floor(this.matchesLength / this.scaleAmountX);
               //TODO: Вот тут триггерится ошибка
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

            this.drawSeasonsBars();


         }



         drawSeasonsBars() {

            let alphaChannel = 0.4;
            let colorDraw = `rgba(239, 255, 60, ${alphaChannel})`;
            let colorWin = `rgba(70, 154, 31, ${alphaChannel})`;
            let colorLose = `rgba(237, 57, 47, ${alphaChannel})`;


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

               drawSeasonBarRect(losses.toString(), colorLose);

               // доделать
               ctx.fillStyle = 'white'; // цвет заливки
               ctx.fillRect(x, y, 2, this.barsHeight);

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

         drawCandleTooltip() {
            if (tooltipCandleData === undefined) return;
            setCandleParams({
               params: {
                  high: tooltipCandleData.high,
                  open: tooltipCandleData.open,
                  low: tooltipCandleData.low,
                  close: tooltipCandleData.close,
                  date: tooltipCandleData.date.slice(0,9),
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
                  "" + chart.candles[i].date.slice(0,9),
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
               // noinspection JSUnresolvedFunction
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
                  0,
                  chart.zeroPosY - i * chart.metricHeight * side,
                  canvas.width - chart.rightOffset - 5,
                  chart.zeroPosY - i * chart.metricHeight * side
               );
            } 
         }
      }

      let chart, bkg;

      // console.log(width, height)

      function init() {
         canvas.width = width * window.innerWidth / 100;
         canvas.height = height * window.innerHeight / 100;

         canvas.width = Math.round(canvas.offsetWidth) // * deviceScale);
         canvas.height = Math.round(canvas.offsetHeight)


         camera = new Camera();
         mouse = new Mouse();

         // console.log(canvas.width, canvas.height)


         // start
         const { wholeMetric, metricHeight, zeroPosY, matchWidth, zeroPosX } =
            ChartDrawer.prototype.updateMetrics(candles, outerMinMetric, outerMaxMetric);

         let wantedCandleWidth = 15;

         let wantedCandlesVisibleAmt = undefined;

         if (matchWidth < wantedCandleWidth) {
            wantedCandlesVisibleAmt = Math.floor(canvas.width / wantedCandleWidth);
            let candlesAmountToHide = candles.length - wantedCandlesVisibleAmt;
            let hiddenCandlesResultingWidth = wantedCandleWidth * candlesAmountToHide;
            camera.left -= hiddenCandlesResultingWidth;
         }

         // TODO пересчитать metricHeight для актуального matchWidth (wantedCandleWidth)
         let minCandleY = Infinity;
         for (let i = candles.length - wantedCandlesVisibleAmt; i < candles.length; i++) {
            let candle = candles[i];
            minCandleY = Math.min(candle.low, minCandleY);
         }
         let newMetricHeight = ChartDrawer.prototype.getMetricHeight(wholeMetric);

         // console.log(metricHeight, newMetricHeight);
// 
         // console.log(minCandleY);

         minCandleY = zeroPosY - minCandleY * metricHeight;
         let bottomDelta = Math.round((canvas.height - minCandleY) - 50);
         //console.log(bottomDelta, camera.bottom);
         camera.bottom -= bottomDelta;
         // console.log(camera.bottom);
         // end

         camera.updateSize();

         //new rulerLine();


         // TODO
         
         smoothScroll = new SmoothScroll(3, 36);

         chart = new ChartDrawer([candles, outerMaxMetric, outerMinMetric]);
         bkg = new BkgDrawer();


         initLeagueLogo()
         initFirstTeamImg()
         initSecondTeamImg()
      }

      const MouseActions = {
         Free: 0,
         Draw: 1,
         MouseDrag: 2,
         TouchDrag: 3,
         DoubleTouch: 4
      };
      let smoothScroll;

      let mouse;


      class Mouse {
         constructor() {
            this.x = -1;
            this.y = -1;
            this.relX = -1;
            this.relY = -1;
            this.clickX = -1;
            this.clickY = -1;
            this.frameX = -1;
            this.frameY = -1;
            this.curFrameX = -1;
            this.curFrameY = -1;
            this.deviceX = -1;
            this.deviceY = -1;
            this.action = MouseActions.Free;
            this.touchFocus = false;
         }

         

         calculateMultiTouchCenter(touches, e) {

            const { x: eX, y: eY} = canvas.getBoundingClientRect()
            const { clientX: tX, clientY: tY } = e.touches[0];
            const offsetX = tX - eX;
            const offsetY = tY - eY;

            if (touches.length === 1) return { x: offsetX, y: offsetY };

            let center = { x: 0, y: 0 };

            //TODO: вот тут срабатывает ошибка. поменял с in на of 
            for (const touch of touches) {
               center.x += touch.clientX;
               center.y += touch.clientY;
               // console.log(touch.clientX)
               // console.log(touch.clickY)
            }
            // console.log(center.x, center.y)
            center.x = Math.round(center.x / touches.length);
            center.y = Math.round(center.y / touches.length);
            
            return center;
         }

         updateDevicePos(e) {
            if (e.type.includes("mouse")) {
               this.deviceX = e.clientX;
               this.deviceY = e.clientY;
            }
            else {
               //это не удастся протестировать, но тут я считаю среднюю точку мультипара
               let multiTouch = this.calculateMultiTouchCenter(e.touches, e);
               this.deviceX = multiTouch.x;
               this.deviceY = multiTouch.y;
            }
         }

         // yes
         updateMovementPerFrame() {
            if (this.curFrameX === -1) {
               this.curFrameX = Math.floor(this.deviceX);
               this.curFrameY = Math.floor(this.deviceY);
            }
            else {
               let mousePrevX = this.curFrameX;
               let mousePrevY = this.curFrameY;
               

               this.curFrameX = Math.floor(this.deviceX);
               this.curFrameY = Math.floor(this.deviceY);

               // console.log(this.curFrameX, this.curFrameY)

               this.frameX = this.curFrameX - mousePrevX;
               this.frameY = this.curFrameY - mousePrevY;

               
            }
         }


         // not
         updateRelPos() {
            this.relX = this.x / canvas.width;
            this.relY = this.y / canvas.height;
         }


         // not
         updatePos() {
            if (this.curFrameX === -1) {
               this.x = Math.floor(this.deviceX);
               this.y = Math.floor(this.deviceY);
            }
            else {
               this.x = this.curFrameX;
               this.y = this.curFrameY;
            }
            this.updateRelPos();
         }

         // штука обновляющая параметры тача при отклонении перекрестия
         addMovementToPos() {
            this.x += this.frameX;
            this.y += this.frameY;
            this.updateRelPos();
         }
      }

      class Camera {
         constructor() {
            this.left = 60;
            this.right = 60;
            this.top = 30;
            this.bottom = 30;

            this.limit = 60;

            this.sizeX = -1;
            this.sizeY = -1;
         }

         updateSize() {
            this.sizeX = canvas.width - this.left - this.right;
            this.sizeY = canvas.height - this.top - this.bottom;
         }
      }

      let camera;

      let drawLine = (x1, y1, x2, y2) => {
         ctx.beginPath();
         ctx.moveTo(x1, y1);
         ctx.lineTo(x2, y2);
         ctx.stroke();
      };

      let drawCircle = (x, y, r) => {
         ctx.beginPath();
         ctx.arc(x, y, r, 0, 2 * Math.PI);
         ctx.fill();
         ctx.stroke();
      };

      defineChartParams();
      init();

      window.addEventListener("resize", function () {
         init();
         // canvas.width = Math.round(window.innerWidth);
         // canvas.height = Math.round(window.innerHeight);
         //
         // requestFrame(drawChart);
      });

      let initialDistance;
      let currentDistance;
      let previousDistance;
      let initialScale = 1;
      const minScale = 0.5;
      const maxScale = 3;

      let isZooming = false;

      ["touchmove",/* "mousemove"*/].forEach(function (move) {
         canvas.addEventListener(move, (e) => {
            e.preventDefault();
            const canvasElement = e.target
            const { clientX: tX, clientY: tY } = e.touches[0];
            const { x: eX, y: eY } = canvasElement.getBoundingClientRect();

            offsetX = tX - eX;
            offsetY = tY - eY;

            if (e.touches.length === 2) {
               const t1 = e.touches[0];
               const t2 = e.touches[1];
               currentDistance = getDistance(t1, t2);
               const distanceDelta = previousDistance - currentDistance;
               smoothScroll.scrolledMobile(distanceDelta);
               previousDistance = currentDistance;
            }

            mouse.updateDevicePos(e);

            if (e.type === "mousemove") mouseCrossVisible = true;

            mouse.updateMovementPerFrame(e);

            if (!mouse.touchFocus) {
               mouse.updatePos(e);
            }
            else {
               mouse.addMovementToPos(e);
            }

            //long touch
            if (longTouchTimeout && Math.hypot(mouse.clickX - mouse.x, mouse.clickY - mouse.y) > 20) {
               clearTimeout(longTouchTimeout);
            }

            if (!mouse.touchFocus &&
               (mouse.action === MouseActions.MouseDrag || mouse.action === MouseActions.TouchDrag)) {
               if (camera.left + mouse.frameX > camera.limit) mouse.frameX = 0;
               if (camera.top + mouse.frameY > camera.limit) mouse.frameY = 0;
               if (camera.right - mouse.frameX > camera.limit) mouse.frameX = 0;
               if (camera.bottom - mouse.frameY > camera.limit) mouse.frameY = 0;
               // console.log( "*",  camera.left, camera.right, mouse.frameX)
               camera.left = camera.left + mouse.frameX;
               camera.right = camera.right - mouse.frameX;
               // console.log( "**", camera.left, camera.right, mouse.frameX)
            }

            // console.log(isZooming, 'touchMove')
         });
      });


      

      function getDistance(touch1, touch2) {
         const { clientX: x1, clientY: y1 } = touch1;
         const { clientX: x2, clientY: y2 } = touch2;
         return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
      }

     




      ["touchstart",/* "mousedown"*/].forEach(function (down) {
         canvas.addEventListener(down, (e) => {
            e.preventDefault()
            const canvasElement = e.target
            const { clientX: tX, clientY: tY } = e.touches[0];
            const { x: eX, y: eY } = canvasElement.getBoundingClientRect();
   
            offsetX = tX - eX;
            offsetY = tY - eY;
   
            
   
         
   
            if (e.type === "touchstart") {
               mouse.curFrameX = -1;
               mouse.curFrameY = -1;
            }

            // if (e.touches.length === 2) {
            //    isZooming = true;
            //    const t1 = e.touches[0];
            //    const t2 = e.touches[1];
            //    initialDistance = getDistance(t1, t2);
            //    console.log('doulbe touch')
            // }

           
   
            // longTouchTimeout = setTimeout(function () {
            //    if (e.type === "touchstart") {
            //       mouse.updatePos(e);
            //       mouseCrossVisible = true;
            //       mouse.touchFocus = true;
            //    }
   
            //    console.log("long touch");
            // }, 500);

            if (e.touches.length === 2) {
               isZooming = true;
               const t1 = e.touches[0];
               const t2 = e.touches[1];
               initialDistance = getDistance(t1, t2);
               // console.log('double touch');
           } else {
               // Add a condition to disable crosshair if not zooming
               if (!isZooming) {
                  longTouchTimeout = setTimeout(function () {
                       mouse.updatePos(e);
                       mouseCrossVisible = true;
                       mouse.touchFocus = true;
                     //   console.log("long touch");
                   }, 1000);
               }
         }   

         // console.log(isZooming, 'touchStart')

            mouse.updateDevicePos(e);
   
            clickTimeout = performance.now();
   
            mouse.clickX = mouse.deviceX;
            mouse.clickY = mouse.deviceY;
   
            canvas.style.cursor = "move";
            if (mouse.action === MouseActions.Free) {
               if (e.type === "touchstart") mouse.action = MouseActions.TouchDrag;
               if (e.type === "mousedown") mouse.action = MouseActions.MouseDrag;
            }
         });
      });

      let offsetX = undefined
      let offsetY = undefined;

      // canvas.addEventListener("touchstart", (e) => {

      //    const canvasElement = e.target
      //    const { clientX: tX, clientY: tY } = e.touches[0];
      //    const { x: eX, y: eY } = canvasElement.getBoundingClientRect();

      //    offsetX = tX - eX;
      //    offsetY = tY - eY;

      //    console.log(offsetX, offsetY)
      // });

      ["touchend",/* "mouseup"*/].forEach(function (up) {

         canvas.addEventListener(up, (e) => {
            
            isZooming = false
            if (longTouchTimeout) clearTimeout(longTouchTimeout);

            if (clickTimeout + 100 > performance.now() &&
               Math.hypot(mouse.clickX - mouse.deviceX, mouse.clickY - mouse.deviceY) < 10) {
               if (mouse.touchFocus) {
                  mouseCrossVisible = false;
                  mouse.touchFocus = false;
               }
            }

            if (Math.hypot(mouse.clickX, mouse.clickY, mouse.x, mouse.y) < 10) {
               mouse.touchFocus = false;
               mouseCrossVisible = false;
            }

            canvas.style.cursor = "auto";
            mouse.action = MouseActions.Free;
            // canvas.removeEventListener('touchstart', handleTouchStart)


            // console.log(isZooming, 'touchEnd')
         });
      });

      canvas.addEventListener('contextmenu', function (e) {
         e.preventDefault();
      });

      canvas.addEventListener("mouseout", (e) => {
         mouseCrossVisible = false;
         clearCanvas();
         drawChart();
      });

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

      function clearCanvas() {
         ctx.fillStyle = colors.bkg;
         ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      function drawChart() {
         clearCanvas();
         if (mouseCrossVisible) {
            drawMouseCross();
         }
         smoothScroll.update();

         //сча курсор должен быть не наведен на новость

         chart.draw(); //тут ты подтверждаешь, что курсор на новости

         for (let i = 0; i < rulerLines.length; i++) {
            rulerLines[i].display();
         }

         bkg.drawWholeAxis();

         requestFrame(drawChart);
      }

      function drawMouseCross() {
         ctx.lineWidth = 0.5;
         ctx.strokeStyle = colors.text;
         ctx.setLineDash([5, 5]);
         drawLine(0, mouse.y, canvas.width, mouse.y);
         drawLine(mouse.x, 0, mouse.x, canvas.height);
         ctx.setLineDash([]);
      }

      function defineChartParams() {
         outerMaxMetric = Math.max(
            ...candles.map((item) =>
               Math.max(...[item.open, item.high, item.low, item.close])
            )
         );

         outerMinMetric = Math.min(
            ...candles.map((item) =>
               Math.min(...[item.open, item.high, item.low, item.close])
            )
         );

         outerScaleY = (canvas.height - 250) / (outerMaxMetric - outerMinMetric);
         outerScaleX = (canvas.width - 120) / (candles.length - 1);
         return [
            candles,
            outerScaleX,
            outerScaleY,
            outerMaxMetric,
            outerMinMetric,
         ];
      }

      let alphaChannel = 1;
      let colorDraw = `rgba(239, 255, 60, ${alphaChannel})`;
      let colorWin = `rgba(70, 154, 31, ${alphaChannel})`;
      let colorLose = `rgba(237, 57, 47, ${alphaChannel})`;

      function drawCandle(candle, scaleX, scaleY, pos) {

         //console.log('вызов')

         let ifNeutral = 0;

         let open = candle.open;
         let high = candle.high;
         let low = candle.low;
         let close = candle.close;

         switch (filterByHomeAwayGames) {
            case 'Home':
               alphaChannel = candle.is_home ? 1 : 0.1;
               break;
            case 'Away':
               alphaChannel = !candle.is_home ? 1 : 0.1;
               break;
         }
         switch (filterByAmountOfGoals) {
            case 'Total > 2.5':
               alphaChannel = candle.all_goals >= 3 ? 1 : 0.1;
               break;
            case 'Total < 2.5':
               alphaChannel = candle.all_goals <= 2 ? 1 : 0.1;
               break
         }
         switch (filterCandleChartByTypeOfTime) {
            case '1T':
               alphaChannel = candle.on_time === '1' ? 1 : 0.1;
               break;
            case '2T':
               alphaChannel = candle.on_time === '2' ? 1 : 0.1;
               break
         }

         // switch (FilterByGames) {
         //    case 'Дома':
         //       alphaChannel = candle.is_home ? 1 : 0.1;
         //       break;
         //    case 'В гостях':
         //       alphaChannel = candle.is_home ? 0.1 : 1;
         //       break;
         //    case '2':
         //       alphaChannel = candle.all_goals >= 3 ? 0.1 : 1;
         //       break;
         //    case '1':
         //       alphaChannel = candle.all_goals <= 2 ? 0.1 : 1;
         //       break;
         //    case '1T':
         //       alphaChannel = candle.on_time === '1' ? 1 : 0.1;
         //       break;
         //    case '2T':
         //       alphaChannel = candle.on_time === '2' ? 1 : 0.1;
         //       break;
         //    case '':
         //       alphaChannel = 1;
         //       break;
         //    default:
         //       alphaChannel = 1;
         //       break;
         // }

         colorDraw = `rgba(239, 255, 60, ${alphaChannel})`;
         colorWin = `rgba(70, 154, 31, ${alphaChannel})`;
         colorLose = `rgba(237, 57, 47, ${alphaChannel})`;

         if (candle.is_predicted) {
            colorWin = '#B279FF'
            colorDraw = '#B279FF'
            colorLose = '#B279FF'
         }
         if (close === open) {
            ctx.strokeStyle = colorDraw;
            ifNeutral = 3;
         }
         if (close > open) {
            ctx.strokeStyle = colorWin;
         }
         if (close < open) {
            ctx.strokeStyle = colorLose;
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
            drawLine(pos.x, highY, pos.x, lowY);
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
            drawLine(pos.x, openY, pos.x, closeY);
            isDrawing = true;
         }

         if (candle.is_first_match === true) {
            ctx.strokeStyle = colors.text;
            ctx.lineWidth = 0.5;
            let topY = chart.bottomChartOffset / 2;
            let bottomY = canvas.height - chart.bottomAxisOffset - topY;
            ctx.setLineDash([5, 5]);
            drawLine(pos.x, topY - 50, pos.x, bottomY);
            ctx.setLineDash([]);

            ctx.fillStyle = colors.text;
            ctx.beginPath();
            ctx.arc(pos.x, bottomY - 20, 8, 0, 2 * Math.PI);
            ctx.fill();

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


         // function drawNews() {
         //    if (candle?.articles?.length > 0) {
         //       ctx.fillStyle = 'green';

         //       let newsCircleX = pos.x;
         //       let newsCircleY = canvas.height - chart.bottomAxisOffset - 10;

         //       ctx.beginPath();
         //       ctx.arc(pos.x, newsCircleY, 5, 0, 2 * Math.PI);
         //       ctx.fill();

         //       let dist = Math.hypot(mouse.x - newsCircleX, mouse.y - newsCircleY);

         //       // if (dist < 5) {
         //       //    newsWindow.style.display = 'block'
         //       // }
         //       // else {
         //       //    newsWindow.style.display = 'none'
         //       // }

         //    }
         // }

         // drawNews();

         function drawFirstTeamImg(x, y) {
            if (firstImg.ready) {
               ctx.drawImage(
                  firstImg,
                  x,
                  y,
                  20,
                  20);
            }
         }
         function drawSecondTeamImg(x, y) {
            if (secondImg.ready) {
               ctx.drawImage(
                  secondImg,
                  x,
                  y,
                  20,
                  20);
            }
         }

         if (chartType === 1) {
            if (teams.second_team_name === candle.home_team || teams.second_team_name === candle.away_team) {
               drawFirstTeamImg(pos.x - 10, highY - 25)
            }
         }

         if (chartType === 2) {
            if (teams.first_team_name === candle.home_team || teams.first_team_name === candle.away_team) {
               drawSecondTeamImg(pos.x - 10, highY - 25)
            }
         }

         function drawSeasonsBorderText() {
            const cutLeagueSeason = candle.league_season.slice(2)
            const parts = cutLeagueSeason.split('/');
            const numerator = parts[0];
            const denominator = parts[1].substring(2)
            const resultString = numerator + '/' + denominator;

            if (candle.is_first_match === true && candle.league_season.length > 0) {
               ctx.textAlign = "left";
               ctx.textBaseline = "alphabetic";
               ctx.fillStyle = colors.text;
               ctx.font = '12px serif';
               ctx.fillText(resultString, pos.x + 5, 20);
               ctx.font = '12px serif';
               ctx.fillText(`№:${candle.place}`, pos.x + 5, 40);
            }
         }

         drawSeasonsBorderText();

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
}