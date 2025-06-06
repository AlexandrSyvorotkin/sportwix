import PanelBtn from '@ui/panel-btn/panel-btn'
import { useMemo } from 'react'

import DiagonalLevels from '@assets/icons/diagonal-levels.svg?react'
import PublishPost from '@assets/icons/publish-post.svg?react'
import LabelSelection from '@assets/icons/label-selection.svg?react'
import Nuler from '@assets/icons/nuler.svg?react'
import PutYourLables from '@assets/icons/put-your-labels.svg?react'
import { type PanelBtnProps } from '@ui/panel-btn/panel-btn'

const ChartFunctionsPanel = () => {
  const leftChartBtns: PanelBtnProps[] = useMemo(
    () => [
      {
        icon: <PublishPost />,
        onClick: () => null,
        disabled: true,
        isActive: false,
        tooltipText: '',
        tooltipSide: 'right',
      },
      {
        icon: <DiagonalLevels />,
        onClick: () => null,
        disabled: true,
        isActive: false,
        tooltipText: 'Уровень',
        tooltipSide: 'right',
      },
      {
        icon: <LabelSelection />,
        onClick: () => null,
        disabled: true,
        isActive: false,
        tooltipText: '',
        tooltipSide: 'right',
      },
      {
        icon: <Nuler />,
        onClick: () => null,
        disabled: true,
        isActive: false,
        tooltipText: 'Линейка',
        tooltipSide: 'right',
      },
      {
        icon: <PutYourLables />,
        onClick: () => null,
        disabled: true,
        isActive: false,
        tooltipText: '',
        tooltipSide: 'right',
      },
    ],
    []
  )

  return (
    <div className="flex flex-col gap-[5px] p-[7px]">
      {leftChartBtns.map(({ id, ...btnProps }) => (
        <PanelBtn key={id} {...btnProps} />
      ))}
    </div>
  )
}

export { ChartFunctionsPanel }
