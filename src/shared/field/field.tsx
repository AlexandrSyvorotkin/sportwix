export function GoalkeeperZone({ side, children }: { side: 'left' | 'right', children?: React.ReactNode }) {
    const getSideStyles = () => {
        switch (side) {
            case 'left':
                return 'w-[100px] h-1/2 border-r border-t border-b border-gray-500 flex justify-center items-center flex-col gap-2.5'
            case 'right':
                return 'w-[100px] h-1/2 border-l border-t border-b border-gray-500 flex justify-center items-center flex-col gap-2.5'
            default:
                return 'w-[100px] h-1/2 border-r border-t border-b border-gray-500 flex justify-center items-center flex-col gap-2.5'
        }
    }

    return (
        <div className={getSideStyles()}>
            {children}
        </div>
    )
}

export function Corner({ side }: { side: 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom' }) {
    const getCornerStyles = () => {
        switch (side) {
            case 'left-top':
                return 'w-8 h-8 border-b border-r border-gray-500 rounded-br-full'
            case 'right-top':
                return 'w-8 h-8 border-b border-l border-gray-500 rounded-bl-full'
            case 'left-bottom':
                return 'w-8 h-8 border-t border-r border-gray-500 rounded-tr-full'
            case 'right-bottom':
                return 'w-8 h-8 border-t border-l border-gray-500 rounded-tl-full'
            default:
                return 'w-8 h-8 border-t border-r border-gray-500 rounded-tr-full'
        }
    }

    return (
        <div className={getCornerStyles()}>
        </div>
    )
}