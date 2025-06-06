const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="lg:w-[1600px] lg:w-[1200px] md:w-[660px] sm:w-[330px]">{children}</div>
    </div>
  )
}

export { Container }
