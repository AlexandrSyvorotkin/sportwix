import { Candle } from "../../../../models/Candle";

export default function defineChartParams(candles: Candle[]) {
    
    let outerMaxMetric = Math.max(
    ...candles.map((item) =>
        Math.max(...[item.open, item.high, item.low, item.close])
    )
    );

    let outerMinMetric = Math.min(
    ...candles.map((item) =>
        Math.min(...[item.open, item.high, item.low, item.close])
    )
    );

    return [
        outerMaxMetric,
        outerMinMetric,
    ];
}
