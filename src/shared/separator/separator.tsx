import { cn } from '../lib/utils'

const Separator = ({ className }: { className?: string }) => {
  return <div className={cn('h-[1px] bg-grey', className)} />
}

export { Separator }
