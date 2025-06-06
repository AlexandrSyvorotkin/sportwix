import { FootballMetricTimeFrame } from '../../FootballField/FootballMetricTimeFrame/FootbalMetricTimeFrame'
import { TimeFrameMetrics } from '../../types'

type h2hTeamData = {
  field: {
    timeframe_all: FootballMetricTimeFrame
  }
  metrics: {
    timeframe_all: {
      full_time: TimeFrameMetrics
      time_1: TimeFrameMetrics
      time_2: TimeFrameMetrics
    }
  }
}

export type h2h = {
  result: h2hTeamData[]
}
