const TeamParameterBar = ({
  percent,
  background,
}: {
  percent: number
  background: string | undefined
}) => {
  return (
    <div className="w-full flex p-3 items-center justify-end sm:flex hidden">
      <div className="relative w-full h-3 rounded-[20px] bg-transparent border border-[#5C5C5C]">
        <div
          className="h-[10px] rounded-[20px] absolute right-0"
          style={{
            width: `${percent}%`,
            background: `${background}`,
          }}
        />
        <div className="h-[26px] w-[5px] border border-[#5C5C5C] bg-[#181818] absolute rounded-[20px] left-1/2 -top-[70%]" />
      </div>
    </div>
  )
}

export { TeamParameterBar }
