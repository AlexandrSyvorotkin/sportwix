const buffer = document.createElement('canvas');

const browserScale = Math.round((window.outerWidth - 15) / window.innerWidth * 100) / 100;

const deviceScale = window.devicePixelRatio;

export function candlesMiniChart(candles, canvasCandleRef, theme) {


	const canvas = canvasCandleRef.current;
	const ctx = canvas?.getContext("2d");

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



	//  class SmoothScroll {
	//     constructor(speed, smooth) {
	//        this.moving = false;
	//        this.acceleration = 0;
	//        this.speed = speed;
	//        this.smooth = smooth;
	//        this.ctrlKey = false;

	//        this.scrolled = (e) => {
	//           e.preventDefault();
	//           if (e.deltaY) {
	//              let normalizedDelta = Math.round(Math.sign(e.deltaY) * camera.sizeY / 100 * this.speed);
	//              this.acceleration = normalizedDelta; // * this.speed

	//              this.ctrlKey = e.ctrlKey;

	//              if (!this.moving) this.update();
	//           }
	//        };

	//        this.update = () => {
	//           if (
	//              (chart.matchWidth < 2 && Math.sign(this.acceleration) > 0) ||
	//              (chart.matchWidth > canvas.width / 3 &&
	//               Math.sign(this.acceleration) < 0)
	//           ) {
	//              this.moving = false;
	//              this.acceleration = 0;
	//           }
	//           else {
	//              if (Math.abs(this.acceleration) > 1) {
	//                 this.moving = true;

	//                 this.acceleration -= this.acceleration / this.smooth;

	//                 let delta = this.acceleration;

	//                 let mouseRelToCameraX = (-camera.left + mouse.x) / camera.sizeX;
	//                 let mouseRelToCameraY = (-camera.top + mouse.y) / camera.sizeY;

	//                 let to = Math.min(camera.limit, camera.top + delta * mouseRelToCameraY);
	//                 let bo = Math.min(camera.limit, camera.bottom + delta * (1 - mouseRelToCameraY));
	//                 let lo = Math.min(camera.limit, camera.left + delta * mouseRelToCameraX);
	//                 let ro = Math.min(camera.limit, camera.right + delta * (1 - mouseRelToCameraX));

	//                 if (this.ctrlKey) {
	//                    camera.top = to;
	//                    camera.bottom = bo;
	//                    camera.left = lo;
	//                    camera.right = ro;
	//                 }
	//                 else {
	//                    let currentRightChartPoint =
	//                       Math.min(canvas.width - camera.right, canvas.width - chart.rightOffset);

	//                    let rightChartRelToCameraX = (-camera.left + currentRightChartPoint) / camera.sizeX;

	//                    camera.left =
	//                       Math.min(camera.limit, camera.left + delta * rightChartRelToCameraX);
	//                    camera.right =
	//                       Math.min(camera.limit, camera.right + delta * (1 - rightChartRelToCameraX));
	//                 }

	//                 camera.sizeX = -camera.left + canvas.width - camera.right;
	//                 camera.sizeY = -camera.top + canvas.height - camera.bottom;

	//                 // !!! выключил вызов нового кадра. Перенес вызов кадра в сам drawChart
	//                 //requestFrame(drawChart);
	//              }
	//              else {
	//                 this.moving = false;
	//                 this.acceleration = 0;
	//              }
	//           }
	//        };

	//        canvas.addEventListener("mousewheel", this.scrolled, {passive: false});
	//        canvas.addEventListener("DOMMouseScroll", this.scrolled, {
	//           passive: false,
	//        });
	//     }
	//  }

	let tooltipCandleData = undefined;

	class ChartDrawer {
		constructor([matches, maxMetric, minMetric]) {
			this.matches = matches;
			this.minMetric = minMetric;
			this.maxMetric = maxMetric;

			this.rightOffset = 10;
			this.bottomAxisOffset = 10;
			this.bottomChartOffset = 0;
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
			this.lastVisibleCandleIndex = this.matches.length - 1;
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
			this.matchWidth = (canvas.width - left - right) / (this.matches.length - 1);
			this.zeroPosX = left;

			ctx.strokeStyle = "#333";
			ctx.lineWidth = 1;
			//    drawLine(0, this.zeroPosY, canvas.width - 55, this.zeroPosY);

			//    bkg.update();

			//    bkg.drawAxisY();
			//    bkg.drawAxisX();

			this.minVisibleY = this.maxMetric;
			this.maxVisibleY = this.minMetric;
			this.firstVisibleCandleIndex = this.matches.length - 1;
			this.lastVisibleCandleIndex = 0;

			let candleWidth = this.matchWidth * 0.75;

			for (let i = 0; i < this.matches.length; i++) {
				let curCandle = this.matches[i];
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

		// update() {
		//    this.scaleMinSizeY = 100;
		//    this.matchesLength = chart.matches.length;

		//    this.barsHeight = 20;
		//    this.scaleAmount = Math.max(
		//       1,
		//       Math.pow(
		//          2,
		//          Math.floor(
		//             Math.log2(Math.floor(this.scaleMinSizeY / chart.metricHeight))
		//          )
		//       )
		//    );

		//    this.topScaleMetric = Math.ceil(chart.zeroPosY / chart.metricHeight);
		//    this.bottomScaleMetric = Math.ceil(
		//       (canvas.height - chart.zeroPosY) / chart.metricHeight
		//    );

		//    let calculateScaleX = () => {
		//       ctx.font = "bold 12px serif";
		//       this.scaleAmountX = Math.ceil(
		//          (ctx.measureText(chart.matches[0].date).width + 20) / chart.matchWidth
		//       );
		//       let diapasonsAmt = Math.floor(this.matchesLength / this.scaleAmountX);
		//       this.additionalScalesArray = new Array(diapasonsAmt);
		//       this.additionalScalesArray.fill(0);
		//       let leavedCandles = this.matchesLength % this.scaleAmountX;
		//       if (leavedCandles === 0) {
		//          this.additionalScalesArray[this.additionalScalesArray.length - 1] = -1;
		//       }
		//       else {
		//          let additionalScaleX = Math.ceil(leavedCandles / diapasonsAmt);
		//          let j = 0;
		//          for (let i = 0; i <= this.matchesLength; i += this.scaleAmountX) {
		//             if (i > 0 && leavedCandles >= 1) {
		//                if (leavedCandles <= additionalScaleX) {
		//                   additionalScaleX = leavedCandles - 1;
		//                }
		//                this.additionalScalesArray[j] = additionalScaleX;
		//                i += additionalScaleX;
		//                leavedCandles -= additionalScaleX;
		//                j++;
		//             }
		//          }
		//       }
		//    };
		//    calculateScaleX();
		// }

		drawWholeAxis() {

			//    this.drawAxisYOverlay();
			//    this.drawTextY();

			//    this.drawAxisXOverlay();
			//    this.drawTextX();

			//    this.drawAxisCornerOverlay();

			//    this.drawLastVisibleCandleOnY();

			//    this.drawSeasonsBars();

		}

		drawSeasonsBars() {

			let alphaChannel = 0.4;
			let colorDraw = `rgba(239, 255, 60, ${alphaChannel})`;
			let colorWin = `rgba(70, 154, 31, ${alphaChannel})`;
			let colorLose = `rgba(237, 57, 47, ${alphaChannel})`;


			let seasonOffset = chart.zeroPosX;
			for (let i = 0; i < 1; i++) {
				//let games = seasons[i].games;
				let wins = 14 //seasons[i].wins;
				let draws = 8 //seasons[i].draws;
				let losses = 16 //seasons[i].losses;
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
				let h = this.barsHeight - 5;

				drawSeasonBarRect(losses.toString(), colorLose);

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
					"" + chart.matches[i].date,
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
			let lastVisibleCandle = chart.matches[chart.lastVisibleCandleIndex]
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
		canvas.width = 400
		canvas.height = 150;

		camera = new Camera();
		// camera.updateSize();

		// smoothScroll = new SmoothScroll(3, 36);

		chart = new ChartDrawer([candles.matches, outerMaxMetric, outerMinMetric]);
		// bkg = new BkgDrawer();
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
			this.left = 15;
			this.right = 15;
			this.top = 15;
			this.bottom = 15;

			this.limit = 300;

			this.sizeX = -1;
			this.sizeY = -1;
		}

		// updateSize() {
		//    this.sizeX = canvas.width - this.left - this.right;
		//    this.sizeY = canvas.height - this.top - this.bottom;
		// }
	}

	let camera;

	let drawLine = (x1, y1, x2, y2) => {
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	};

	defineChartParams();
	init();

	window.addEventListener("resize", function () {
		init();
		// canvas.width = Math.round(window.innerWidth * deviceScale);
		// canvas.height = Math.round(window.innerHeight * deviceScale);
		//
		// requestFrame(drawChart);
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
		// smoothScroll.update();

		chart.draw();

		// chart.drawTeamLogoChart(team_img, 20, 20)
		// bkg.drawSeasonsBars()

		// Вызов нового кадра теперь рекурсивный в этой функции.
		// Таким образом у нас анимация идет непрерывно. Это требует больше внимательности к оптимизации,
		// т.е не рисовать ничего впустую, если нет обновлений, но это единственный правильный способ.
		// Я его и собирался реализовать изначально, но запутался в абстракциях немного😅
		requestFrame(drawChart);

	}

	function defineChartParams() {
		outerMaxMetric = Math.max(
			...candles.matches.map((item) =>
				Math.max(...[item.open, item.high, item.low, item.close])
			)
		);

		outerMinMetric = Math.min(
			...candles.matches.map((item) =>
				Math.min(...[item.open, item.high, item.low, item.close])
			)
		);

		outerScaleX = (canvas.width - 120) / (candles.matches.length - 1);
		outerScaleY = (canvas.height - 250) / (outerMaxMetric - outerMinMetric);
		return [
			candles.matches,
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


		colorDraw = `rgba(239, 255, 60, ${alphaChannel})`;
		colorWin = `rgba(70, 154, 31, ${alphaChannel})`;
		colorLose = `rgba(237, 57, 47, ${alphaChannel})`;
		let isDrawing = false;
		if (high === 0 && low === 0 && open === 0 && close === 0) {

		} else {
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

			if (candle.is_last_match === true) {
				ctx.strokeStyle = colors.text;
				ctx.lineWidth = 0.5;
				let topY = chart.bottomChartOffset / 2;
				let bottomY = canvas.height - chart.bottomAxisOffset - topY;
				ctx.setLineDash([5, 5]);
				drawLine(pos.x, topY, pos.x, bottomY);
				ctx.setLineDash([]);

				ctx.fillStyle = colors.text;
				ctx.beginPath();
				ctx.arc(pos.x, bottomY, 8, 0, 2 * Math.PI);
				ctx.fill();
			}

		}

		function drawSeasonsBorderText() {
			if (candle.is_last_match === true && candle.league_season.length > 0) {
				ctx.textAlign = "left";
				ctx.textBaseline = "alphabetic";
				ctx.fillStyle = colors.text;
				ctx.font = '12px serif';
				ctx.fillText(candle.league_season, pos.x + 5, 30);
				ctx.fillText(`место в чемпионате: ${candle.place}`, pos.x + 70, 30);
			}
		}

		drawSeasonsBorderText();

		return isDrawing;
	}

	drawChart();

}