interface FootballProgressCircleProps {
  percent: number;
  icon?: React.ReactNode,
  type: 'small' | 'big'
}

const ProgressCircle = ({ percent, icon, type }:FootballProgressCircleProps) => {
  // const circularProgressRef = useRef<HTMLDivElement>(null);
  // const [percentageCounter, setPercentageCounter] = useState<number>(0);

  // useEffect(() => {
  //   if (circularProgressRef.current && percent > 0) { // Начать анимацию только если percent > 0
  //     let progressStartValue = 0;
  //     const speed = 5;

  //     const progress = setInterval(() => {
  //       progressStartValue++;

  //       if (circularProgressRef.current)
  //         circularProgressRef.current.style.background = `conic-gradient(#DC7700 ${progressStartValue * 3.6}deg, #A266F4 0deg)`;
  //       setPercentageCounter(progressStartValue);
  //       if (progressStartValue >= percent) {
  //         clearInterval(progress);
  //       }
  //     }, speed);
  //   }
  // }, [percent]);

  const percentage = `conic-gradient(#DC7700 ${percent * 3.6}deg, #A266F4 0deg)`

  const minus = (100 - percent).toFixed(1)
  const minusPerc = percent === 0 ? 0 : minus

  const width = type === 'small' ? 50 : 100
  const height = type === 'small' ? 50 : 100

  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
      <div className="bg-transparent text-xs">{minusPerc}%</div>
      <div className="bg-transparent text-xs"></div>
      <div 
        // ref={circularProgressRef}
        className="relative rounded-full flex items-center justify-center"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`, 
          background: percentage
        }}
      >
        <div 
          className="absolute rounded-full bg-[#0d0c0e]"
          style={{
            width: `${width - 10}px`,
            height: `${height - 10}px`
          }}
        />
        {icon}
      </div>
      <div className="text-xs">{percent?.toFixed(1)}%</div>
      <div className="text-xs"></div>
    </div>
  )

};

export { ProgressCircle }

