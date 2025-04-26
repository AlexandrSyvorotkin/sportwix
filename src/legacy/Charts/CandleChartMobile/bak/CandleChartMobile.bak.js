import { IMG_PATH } from "../../api/variables";
import store from "../../redux/store";

const deviceScale = window.devicePixelRatio;
const buffer = document.createElement('canvas');
const browserScale = Math.round((window.outerWidth - 15) / window.innerWidth * 100) / 100;



export function candleChartTest(canvasCandleRef, candles, rulerActive, setCandleParams, seasons, theme, FilterByGames, teams, chartType, team_img, first_team_img, second_team_img, setMiniNews) {


   const canvas = document.getElementById(canvasCandleRef)

   const ctx = canvas?.getContext("2d");

   const newsTooltip = document.querySelector('#news_tooltip')


   
   if (candles.length === 0) {
      return null
   } else {


      let outerMaxMetric;
      let outerMinMetric;
      let outerScaleX;
      let outerScaleY;
      let canvasIsReady = false;
      let mouseCrossVisible = false;


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
         firstImg.src = imgPath;
         firstImg.onload = () => {
            firstImg.ready = true;
         }
      }
      function initSecondTeamImg() {
         secondImg = new Image();
         const imgPath = `${IMG_PATH}${second_team_img}`;
         secondImg.src = imgPath;
         secondImg.onload = () => {
            secondImg.ready = true;
         }
      }

      class rulerLine {
         constructor() {
            //TODO: на данный момент линии будут отрисовываться и за пределами экрана
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

                     // !!! выключил вызов нового кадра. Перенес вызов кадра в сам drawChart
                     //requestFrame(drawChart);
                  }
                  else {
                     this.moving = false;
                     this.acceleration = 0;
                  }
               }
            };

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
            this.bottomAxisOffset = 40;
            this.bottomChartOffset = 10;
            this.topChartOffset = camera.top;

            camera.top = this.topChartOffset;
            camera.bottom = this.bottomAxisOffset + this.bottomChartOffset;

            this.matchWidth = undefined;
            this.metricHeight = undefined;
            this.zeroPosY = undefined;
            this.zeroPosX = undefined;

            this.minVisibleY = NaN;
            this.maxVisibleY = NaN;

            this.firstVisibleCandleIndex = 0;
            this.lastVisibleCandleIndex = this.candles.length - 1;
         }

         draw() {
            canvasIsReady = false;
            let top = camera.top;
            let left = camera.left;
            let right = camera.right;
            let bottom = camera.bottom;
            let wholeMetric = Math.abs(this.minMetric) + Math.abs(this.maxMetric);
            this.metricHeight = (canvas.height - bottom - top) / wholeMetric;
            this.zeroPosY = Math.round(top + this.metricHeight * this.maxMetric);
            this.matchWidth = (canvas.width - left - right) / (this.candles.length - 1);
            this.zeroPosX = left;

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
                     tooltipCandleData = curCandle;
                  }
                  this.minVisibleY = Math.min(this.minVisibleY, curCandle.low);
                  this.maxVisibleY = Math.max(this.maxVisibleY, curCandle.high);
                  this.firstVisibleCandleIndex = Math.min(this.firstVisibleCandleIndex, i);
                  this.lastVisibleCandleIndex = Math.max(this.lastVisibleCandleIndex, i);
               }
            }

            this.minVisibleY = this.zeroPosY - this.minVisibleY * (this.metricHeight);
            this.maxVisibleY = this.zeroPosY - this.maxVisibleY * (this.metricHeight);

            let bottomDelta = Math.round((canvas.height - this.minVisibleY) - this.bottomAxisOffset - this.bottomChartOffset);
            let topDelta = Math.round(this.maxVisibleY - this.topChartOffset);

            camera.bottom -= bottomDelta / 3;
            camera.top -= topDelta / 3;

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
                  (ctx.measureText(chart.candles[0].date).width + 20) / chart.matchWidth
               );
               // console.log(this.matchesLength, 'length')
               // console.log(this.scaleAmount, 'scale')
               let diapasonsAmt = Math.floor(this.matchesLength / this.scaleAmountX);
               // console.log(diapasonsAmt)
               //TODO: Вот тут тригерится ошибка
               this.additionalScalesArray = new Array(diapasonsAmt);
               // console.log(diapasonsAmt)
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
                  0,
                  chart.zeroPosY - i * chart.metricHeight * side,
                  canvas.width - chart.rightOffset - 5,
                  chart.zeroPosY - i * chart.metricHeight * side
               );
            }
         }
      }

      let chart, bkg;

      function init() {
         // //фиксят баг со свойствами канваса
         //  canvas.width = chartWidth * window.innerWidth / 100;
         //  canvas.height = chartHeight * window.innerHeight / 100;

         //  canvas.width = window.innerWidth / 100;
         //  canvas.height = window.innerHeight / 100;

         canvas.width = Math.round(canvas.offsetWidth) // * deviceScale);
         canvas.height = Math.round(canvas.offsetHeight) //* deviceScale);



         //  canvas.width = Math.round(canvasCandleRef.innerWidth);
         //  canvas.height = Math.round(canvasCandleRef.innerHeight);

         camera = new Camera();
         camera.updateSize();

         if (rulerActive) {
            new rulerLine();
         }

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
         Drag: 2,
      };
      let smoothScroll;

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
         action: MouseActions.Free,
      };

      class Camera {
         constructor() {
            this.left = -350;
            this.right = 30;
            this.top = 30;
            this.bottom = 30;

            this.limit = 50;

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


      // window.addEventListener("resize", function () {
      //    init();
      //    // canvas.width = Math.round(window.innerWidth);s
      //    // canvas.height = Math.round(window.innerHeight);
         
      //    requestFrame(drawChart);
      // });

      ["touchmove", "mousemove"].forEach(function (move) {
         canvas.addEventListener(move, (e) => {
            if (e.type === "mousemove") mouseCrossVisible = true;
      
            let eMouseX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
            let eMouseY = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;
      
            let mousePrevX = mouse.x;
            let mousePrevY = mouse.y;
            //mouse.x = Math.floor(e.offsetX * deviceScale);
            //mouse.y = Math.floor(e.offsetY * deviceScale);
            mouse.x = Math.floor(eMouseX);
            mouse.y = Math.floor(eMouseY);
      
            if (mouse.x !== -1) mouse.frameX = mouse.x - mousePrevX;
            if (mouse.y !== -1) mouse.frameY = mouse.y - mousePrevY;
      
            mouse.relX = mouse.x / canvas.width;
            mouse.relY = mouse.y / canvas.height;
      
            if (longTouchTimeout && Math.hypot(mouse.clickX, mouse.clickY, mouse.x, mouse.y) > 20)
               clearTimeout(longTouchTimeout);
      
            if (mouse.action === MouseActions.MouseDrag || mouse.action === MouseActions.TouchDrag) {
               if (camera.left + mouse.frameX > camera.limit) mouse.frameX = 0;
               if (camera.top + mouse.frameY > camera.limit) mouse.frameY = 0;
               if (camera.right - mouse.frameX > camera.limit) mouse.frameX = 0;
               if (camera.bottom - mouse.frameY > camera.limit) mouse.frameY = 0;
               camera.left = camera.left + mouse.frameX;
               camera.right = camera.right - mouse.frameX;
            }
         });
      });
      
      let longTouchTimeout;
      
      ["touchstart", "mousedown"].forEach(function (down) {
         canvas.addEventListener(down, (e) => {
      
            if (e.type === "touchstart") {
               longTouchTimeout = setTimeout(function () {
                  // console.log("long touch");
               }, 750);
            }
      
            canvas.style.cursor = "move";
            if (mouse.action === MouseActions.Free) {
               // console.log(e.type);
               if (e.type === "touchstart") mouse.action = MouseActions.TouchDrag;
               if (e.type === "mousedown") mouse.action = MouseActions.MouseDrag;
               mouse.clickX = mouse.x;
               mouse.clickY = mouse.y;
            }
         });
      });
      
      ["touchend", "mouseup"].forEach(function (up) {
         canvas.addEventListener(up, (e) => {
      
            if (longTouchTimeout) clearTimeout(longTouchTimeout);
      
            canvas.style.cursor = "auto";
            mouse.action = MouseActions.Free;
         });
      });
      
      canvas.addEventListener('contextmenu', function(e) {
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

         chart.draw();

         for (let i = 0; i < rulerLines.length; i++) {
            rulerLines[i].display();
         }

         bkg.drawWholeAxis();

         // Вызов нового кадра теперь рекурсивный в этой функции.
         // Таким образом у нас анимация идет непрерывно. Это требует больше внимательности к оптимизации,
         // т.е не рисовать ничего впустую, если нет обновлений, но это единственный правильный способ.
         // Я его и собирался реализовать изначально, но запутался в абстракциях немного😅
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

         colorDraw = `rgba(239, 255, 60, ${alphaChannel})`;
         colorWin = `rgba(70, 154, 31, ${alphaChannel})`;
         colorLose = `rgba(237, 57, 47, ${alphaChannel})`;

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

         // новые новости
         function drawNews() {
            if (candle?.articles?.length > 0) {
               ctx.fillStyle = 'green';
      
               let newsCircleX = pos.x;
               let newsCircleY = canvas.height - chart.bottomAxisOffset - 10;
      
               ctx.beginPath();
               ctx.arc(pos.x, newsCircleY, 5, 0, 2 * Math.PI);
               ctx.fill();
      
               let dist = Math.hypot(mouse.x - newsCircleX, mouse.y - newsCircleY);
      
               //доделать новость

               // if (dist < 5) {
               //    newsTooltip.style.display = 'flex'
               //    setMiniNews(candle.articles)
               // } else {
               //    newsTooltip.style.display = 'none'
               //    setMiniNews([])
               // }
            }
         }

         drawNews();


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
               drawSecondTeamImg(pos.x - 10, highY - 25)
            }
         }

         if (chartType === 2) {
            if (teams.first_team_name === candle.home_team || teams.first_team_name === candle.away_team) {
               drawFirstTeamImg(pos.x - 10, highY - 25)
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