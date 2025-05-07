import InformationTableIcon from '@assets/icons/information-table.svg?react'
import ChatIcon from '@assets/icons/chart.svg?react'
import TechSupportIcon from '@assets/icons/tech-support.svg?react'
import EmailIcon from '@assets/icons/email.svg?react'
import UserGuideIcon from '@assets/icons/user-guide.svg?react'
import { useMemo } from 'react'
import PanelBtn from '@ui/panel-btn/panel-btn'

const CommonPanel = () => {

    const rightCommonBtns = useMemo(() => [
        {
            id: 1,
            icon: <InformationTableIcon/>,
            onClick: () => null,
            disabled: true
        },
        {
            id: 2,
            icon: <ChatIcon/>,
            onClick: () => null,
            disabled: true
        },
        {
            id: 3,
            icon: <TechSupportIcon/>,
            onClick: () => null,
            disabled: true
        },
        {
            id: 4,
            icon: <EmailIcon/>,
            onClick: () => null,
            disabled: true
        },
        {
            id: 5,
            icon: <UserGuideIcon/>,
            onClick: () => null,
            disabled: true
        }
    ], [])

    return (
        <div className="flex flex-col gap-[5px] p-[7px]">
            {rightCommonBtns.map(({ id, ...btnProps }) => (
                <PanelBtn key={id} {...btnProps} />
            ))}
        </div>
    )
}

export {CommonPanel}
