import { Attacking } from '../Attacking/Attacking'
import { Defence } from '../Defence/Defence'
import { Midfield } from '../Midfield/Midfield'

export type FootballMetricTimeFrame = {
  average: {
    full_time: {
      attacking: Attacking
      defense: Defence
      midfield: Midfield
    }
    time_1: {
      attacking: Attacking
      defense: Defence
      midfield: Midfield
    }
    time_2: {
      attacking: Attacking
      defense: Defence
      midfield: Midfield
    }
  }
  sum: {
    full_time: {
      attacking: Attacking
      defense: Defence
      midfield: Midfield
    }
    time_1: {
      attacking: Attacking
      defense: Defence
      midfield: Midfield
    }
    time_2: {
      attacking: Attacking
      defense: Defence
      midfield: Midfield
    }
  }
}
