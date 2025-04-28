export type Attacking = {
    forward: {
        avg_coeff?: number;
        corners?: number;
        offsides?: number
        xG_sum?: number
    },
    gate_attack: {
        bch: number | undefined
        bchm: number | undefined
        total_shots: number | undefined
    }
}