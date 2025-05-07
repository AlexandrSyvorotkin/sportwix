import PanelBtn from "@ui/panel-btn/panel-btn"
import ChampionshipTableIcon from '@assets/icons/championship-table.svg?react'
import ChampionshipTableCoachesIcon from '@assets/icons/championmship-table-coaches.svg?react'
import ComparePlayersIcon from '@assets/icons/compare-players.svg?react'
import FavouriteListIcon from '@assets/icons/favourite-list.svg?react'
import { useMemo } from "react"


const ChampionshipTablePanel = () => {

    const rightTableBtns = useMemo(() => [
        {
            id: 1,
            icon: <ChampionshipTableIcon />,
            onClick: () => null,
            disabled: true
        },
        {
            id: 2,
            icon: <ChampionshipTableCoachesIcon />,
            onClick: () => null,
            disabled: true
        },
        {
            id: 3,
            icon: <ComparePlayersIcon />,
            onClick: () => null,
            disabled: true
        }, {
            id: 4,
            icon: <FavouriteListIcon />,
            onClick: () => null,
            disabled: true
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
