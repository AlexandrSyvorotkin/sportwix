import PanelBtn from "@ui/panel-btn/panel-btn"
import ChampionshipTableIcon from '@assets/icons/championship-table.svg?react'
import ChampionshipTableCoachesIcon from '@assets/icons/championmship-table-coaches.svg?react'
import FavouriteListIcon from '@assets/icons/favourite.svg?react'
import ComparePlayersIcon from '@assets/icons/compare-players.svg?react'
import { useMemo } from "react"
import { type PanelBtnProps } from "@ui/panel-btn/panel-btn";


const ChampionshipTablePanel = () => {

    const rightTableBtns: PanelBtnProps[] = useMemo(() => [
        {
            icon: <ChampionshipTableIcon />,
            onClick: () => null,
            disabled: true,
            isActive: false,
            tooltipText: 'Инвертировать таблицу',
            tooltipSide: 'left'
        },
        {
            icon: <ChampionshipTableCoachesIcon />,
            onClick: () => null,
            disabled: true,
            isActive: false,
            tooltipText: 'Сравненить тренеров',
            tooltipSide: 'left'
        },
        {
            icon: <ComparePlayersIcon />,
            onClick: () => null,
            disabled: true,
            isActive: false,
            tooltipText: 'Сравнить игроков',
            tooltipSide: 'left'
        },
        {
            icon: <FavouriteListIcon />,
            onClick: () => null,
            disabled: true,
            isActive: false,
            tooltipText: 'Избранные',
            tooltipSide: 'left'
        }
    ], [])

    return (
        <div className="flex flex-col gap-5 p-[7px]">
            {rightTableBtns.map(({ id, ...btnProps }) => (
                <PanelBtn key={id} {...btnProps} />
            ))}
        </div>
    )
}

export {ChampionshipTablePanel}
