export type Defence = {
  defenders: {
    avg_coeff_opponent: number | undefined
    corners_opponent: number | undefined
    offsides_opponent: number | undefined
    xG_sum_opponent: number | undefined
  }
  goalkeeper: {
    bch_opponent: number | undefined
    bchm_opponent: number | undefined
    total_shots_opponent: number | undefined
  }
}
