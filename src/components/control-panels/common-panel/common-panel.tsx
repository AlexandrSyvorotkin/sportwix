import InformationTableIcon from '@assets/icons/information-table.svg?react'
import ChatIcon from '@assets/icons/chart.svg?react'
import TechSupportIcon from '@assets/icons/tech-support.svg?react'
import EmailIcon from '@assets/icons/email.svg?react'
import UserGuideIcon from '@assets/icons/user-guide.svg?react'
import { useMemo } from 'react'
import PanelBtn from '@ui/panel-btn/panel-btn'
import { type PanelBtnProps } from '@ui/panel-btn/panel-btn'

const CommonPanel = () => {
  const rightCommonBtns: PanelBtnProps[] = useMemo(
    () => [
      {
        icon: <InformationTableIcon className="text-[#A266F4]" />,
        onClick: () => null,
        disabled: false,
        isActive: true,
        tooltipText: 'Информационная доска',
        tooltipSide: 'left',
      },
      {
        icon: <ChatIcon />,
        onClick: () => null,
        disabled: true,
        isActive: false,
        tooltipText: 'Чат',
        tooltipSide: 'left',
      },
      {
        icon: <TechSupportIcon />,
        onClick: () => null,
        disabled: true,
        isActive: false,
        tooltipText: 'Помощь',
        tooltipSide: 'left',
      },
      {
        icon: <EmailIcon />,
        onClick: () => null,
        disabled: true,
        isActive: false,
        tooltipText: 'Почта',
        tooltipSide: 'left',
      },
      {
        icon: <UserGuideIcon />,
        onClick: () => null,
        disabled: true,
        isActive: false,
        tooltipText: 'Обучение',
        tooltipSide: 'left',
      },
    ],
    []
  )

  return (
    <div className="flex flex-col gap-[5px] p-[7px]">
      {rightCommonBtns.map(({ id, ...btnProps }) => (
        <PanelBtn key={id} {...btnProps} />
      ))}
    </div>
  )
}

export { CommonPanel }
