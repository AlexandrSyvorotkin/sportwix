import PanelBtn from "@ui/panel-btn/panel-btn"
import { useMemo } from "react"

import DiagonalLevels from '@assets/icons/diagonal-levels.svg?react'
import PublishPost from '@assets/icons/publish-post.svg?react'
import LabelSelection from '@assets/icons/label-selection.svg?react'
import Nuler from '@assets/icons/nuler.svg?react'
import PutYourLables from '@assets/icons/put-your-labels.svg?react'

const ChartFunctionsPanel = () => {

    const leftChartBtns = useMemo(() => [
        {
            id: 1,
            icon: <PublishPost />,
            onClick: () => null,
            disabled: true
        },
        {
            id: 2,
            icon: <DiagonalLevels />,
            onClick: () => null,
            disabled: true
        },
        {
            id: 3,
            icon: <LabelSelection />,
            onClick: () => null,
            disabled: true
        },
        {
            id: 4,
            icon: <Nuler />,
            onClick: () => null,
            disabled: true
        },
        {
            id: 5,
            icon: <PutYourLables />,
            onClick: () => null,
            disabled: true
        }
    ], [])
    
    return (
        <div className="flex flex-col gap-[5px] p-[7px]">
            {leftChartBtns.map(({ id, ...btnProps }) => (
                <PanelBtn key={id} {...btnProps} />
            ))}
        </div>
    )
}

export {ChartFunctionsPanel}
