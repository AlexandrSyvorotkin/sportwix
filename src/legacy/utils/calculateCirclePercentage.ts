export const calculatePercentage = (first_param: number | undefined, second_param: number | undefined) => {
    if (first_param === undefined || second_param === undefined) {
        return 0;
    }

    if (first_param === 0 && second_param === 0) {
        return 0
    }


    const sum = first_param + second_param
    const percentage = (second_param / sum) * 100
    return percentage
}