import PanelBtn from '@ui/panel-btn/panel-btn'
import Expand from '@assets/icons/expand.svg?react'
import FilterByCups from '@assets/icons/filter-by-cups.svg?react'
import ChartSettings from '@assets/icons/chart-settings.svg?react'
import FilterByTimes from '@assets/icons/filter-by-times.svg?react'
import FilterByGoals from '@assets/icons/filter-by-goals.svg?react'
import FilterBySeasons from '@assets/icons/filter-by-seasons.svg?react'
import FilterByHomeAwayGames from '@assets/icons/filter-by-home-away-games.svg?react'
import Switcher from '@assets/icons/switcher.svg?react'
import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { onExpandSection } from '../../../store/InterfaceSlice/InterfaceSlice'
import { RootState } from 'src/store/store'
import { type PanelBtnProps } from '@ui/panel-btn/panel-btn'
import { switchPageToStartPostition } from '@store/tournament-slice/tournament-slice'
import { CandleChartFilter } from '@features/candle-chart/ui'

const activeColor = '#A266F4'

const ChartFiltersPanel = () => {
  const dispatch = useAppDispatch()
  const expandedSection = useAppSelector(
    (state: RootState) => state.interfaceState.expanded_section
  )
  const isSingleTeamView = useAppSelector(
    (state: RootState) => state.tournamentSlice.isSingleTeamView
  )

  const rightChartBtns: PanelBtnProps[] = useMemo(
    () => [
      {
        icon: (
          <Expand
            className={expandedSection === 'sparkline' ? 'text-[#A266F4]' : 'text-[#FFFFFF]'}
          />
        ),
        onClick: () => dispatch(onExpandSection(expandedSection === 'none' ? 'sparkline' : 'none')),
        disabled: false,
        isActive: expandedSection === 'sparkline',
        tooltipText: 'Expand',
        tooltipSide: 'left',
      },
      {
        icon: <Switcher fill={expandedSection === 'sparkline' ? activeColor : ''} />,
        onClick: () => dispatch(switchPageToStartPostition()),
        disabled: !isSingleTeamView,
        isActive: false,
        tooltipText: 'To sparkline',
        tooltipSide: 'left',
      },
      {
        icon: <CandleChartFilter
          trigger={<FilterBySeasons />}
          content={<div className='text-white'>Фильтр по сезонам</div>}
        />,
        onClick: () => null,
        disabled: !isSingleTeamView,
        isActive: false,
        tooltipText: 'Filter by seasons',
        tooltipSide: 'left',
      },
      {
        icon:<ChartSettings />,
        onClick: () => null,
        disabled: true,
        isActive: false,
        tooltipText: 'Expand',
        tooltipSide: 'left',
      },
      {
        icon:
          <CandleChartFilter
            trigger={<FilterByCups />}
            content={<div className='text-white'>Фильтр по кубкам</div>}
          />,
        onClick: () => null,
        disabled: true,
        isActive: false,
        tooltipText: 'Expand',
        tooltipSide: 'left',
      },
      {
        icon: <CandleChartFilter
        trigger={<FilterByHomeAwayGames />}
        content={<div className='text-white'>Фильтр по домашним/выездным играм</div>}/>,
        onClick: () => null,
        disabled: !isSingleTeamView,
        isActive: false,
        tooltipText: 'Expand',
        tooltipSide: 'left',
      },
      {
        icon: <CandleChartFilter
        trigger={<FilterByTimes />}
        content={<div className='text-white'>Фильтр по таймам</div>}/>,
        onClick: () => null,
        disabled: !isSingleTeamView,
        isActive: false,
        tooltipText: 'Expand',
        tooltipSide: 'left',
      },
      {
        icon: <CandleChartFilter
        trigger={<FilterByGoals />}
        content={<div className='text-white'>Фильтр по голам</div>}/>,
        onClick: () => null,
        disabled: !isSingleTeamView,
        isActive: false,
        tooltipText: 'Expand',
        tooltipSide: 'left',
      },
    ],
    [expandedSection, isSingleTeamView, dispatch]
  )

  return (
    <div className="flex flex-col gap-[5px] p-[7px]">
      {rightChartBtns.map(({ id, ...btnProps }) => (
        <PanelBtn key={id} {...btnProps} />
      ))}
    </div>
  )
}

export { ChartFiltersPanel }

