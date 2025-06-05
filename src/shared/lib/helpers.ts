export type cupMedalTypes = 'gold' | 'silver' | 'bronze'


export function getTeamParameterBarBackgound(a: number | undefined, b: number | undefined, type: number) {
    if (a === undefined || b === undefined) {
        return '';
    }

    if (type === 1) {
        if (a === b) {
            return '#EFFF3C'
        }
        if (a > b) {
            return '#469A1F';
        } else {
            return '#ED392F';
        }
    } else if (type == 2) {
        if (a === b) {
            return '#EFFF3C'
        }
        if (a > b) {
            return '#ED392F';
        } else {
            return '#469A1F';
        }
    }
}

export const getTeamParameterBarPercent = (a: number | undefined, b: number | undefined, percentFromA: boolean = true) => {
    if (a === undefined || b === undefined) {
        return 0;
    }

    const absA = Math.abs(a);
    const absB = Math.abs(b);
    const sum = absA + absB;

    if (sum === 0) {
        return 0;
    }

    if (percentFromA) {
        const percent = (absA / sum) * 100;
        return percent;
    } else {
        const percent = (absB / sum) * 100;
        return percent;
    }
}