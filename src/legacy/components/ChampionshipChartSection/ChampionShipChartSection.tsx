import React, {FC, useState} from 'react';

interface ChampionShipChartSectionProps {
    data: any,
    logo: string,
    expandChart: () => void
}

const ChampionShipChartSection:FC<ChampionShipChartSectionProps> = ({data, logo, expandChart}) => {

    const [metric, setMetric] = useState('points')
    const [chartSelect, setChartSelect] = useState<boolean>(false)

    const metrics = [
        {metric: 'points'},
        {metric: 'xG'},
        {metric: 'xGA'},
        {metric: 'xPts'},
        {metric: 'goals_scored'},
        {metric: 'goal_conceded'},
    ]

    function filterByParam(param: string) {
        setMetric(param)
        setChartSelect(false)
    }

    //TODO: Разобраться почему я это написал
    function openChartSelect() {
        setChartSelect(!chartSelect)
        // setActiveControlPanelItem(!activeControlPanelItem)
    }


    return (
        <>
        </>
    );
};

export default ChampionShipChartSection;