import { candleSeasons } from '../types/candleSeason'
import { Candle } from './Candle'

export interface ICandle {
  candles: Candle
  seasons: candleSeasons
}
