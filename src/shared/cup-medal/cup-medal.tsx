import { cupMedalTypes } from '../lib/helpers'

const defaultStyle =
  'w-10 h-10 rounded-full flex items-center justify-center font-normal text-[18px] leading-[18px] border-solid'

const CUP_STYLES = {
  gold: 'bg-[#EBBB41] border-[#B3891F] text-[#8D6C16] border-[3px]',
  silver: 'bg-[#C0C0C0] border-[#A9A9A9] text-[#808080] border-[3px]',
  bronze: 'bg-[#CD7F32] border-[#A0522D] text-[#8B4513] border-[3px]',
}

const CupMedal = ({
  cupsCount,
  cupMedalType,
}: {
  cupsCount: number
  cupMedalType: cupMedalTypes
}) => {
  return <div className={`${defaultStyle} ${CUP_STYLES[cupMedalType]}`}>{cupsCount}</div>
}

export { CupMedal }
