import MainButton from "../../ui/button/main-button";

const Platform = () => {
  return (
    <div className="mt-[120px] pb-[120px] flex flex-col items-center justify-center">
      <div className="w-[1616px] h-[534px] bg-[#111012] rounded-[16px] relative overflow-hidden flex flex-col items-center justify-center">
        {/* Сетка и градиенты */}
        <div className="absolute inset-0">
          {/* Сама сетка */}
          <div className="w-full h-full grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] grid-rows-[repeat(auto-fill,minmax(100px,1fr))]">
            {Array(200)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="border border-white/[0.03]"></div>
              ))}
          </div>

          {/* Градиенты по бокам */}
          <div className="absolute inset-y-0 left-0 w-[800px] bg-gradient-to-r from-[#111012] to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-[800px] bg-gradient-to-l from-[#111012] to-transparent"></div>
        </div>

        <div className="absolute w-full h-[300px] -top-[-400px] z-0">
          <div className="w-full h-full bg-[radial-gradient(60%_50%_at_50%_50%,#6366F1_0%,rgba(106,45,191,0.15)_60%,rgba(106,45,191,0)_80%)]"></div>
        </div>

        {/* Контент */}
        <div className="relative flex flex-col items-center gap-8">
          <h2 className="text-[54px] text-center max-w-[800px]">
            Всегда можно найти свою идею на платформе SportWix.com

          </h2>
          <MainButton className="py-[22px] px-[57px] flex items-center gap-2 mt-[52px]">Перейти к платформе</MainButton>
        </div>
      </div>
    </div>
  );
};

export default Platform;
