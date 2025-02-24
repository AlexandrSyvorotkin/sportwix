
import img_1 from "../../assets/community/ImgCommunity1.png";
import img_2 from "../../assets/community/ImgCommunity2.png";
import img_3 from "../../assets/community/ImgCommunity3.png";
import img_4 from "../../assets/community/ImgCommunity4.png";

const COMMUNITY = [
  {
    id: 1,
    title: "@Gfidi23",
    img: img_1,
  },
  {
    id: 2,
    title: "@Gfidi23",
    img: img_2,
  },
  {
    id: 3,
    title: "@Gfidi23",
    img: img_3,
  },
  {
    id: 4,
    title: "@Gfidi23",
    img: img_4,
  },
];
const Community = () => {
  return (
    <div className="mt-[120px] pb-[120px]">
      <div className="flex items-center justify-center w-full flex-col gap-4">
        <h2 className="text-[54px] max-w-[800px] text-center">Следи за спортивными событиями в нашем сообществе</h2>
        <div className="flex items-center justify-center gap-4 mt-[56px]">
          {COMMUNITY.map((item) => (
            <div className="flex flex-col gap-4 w-[389]">
                <div className="w-[389] h-[510]">
                <img src={item.img} alt="" />
              </div>
              <span className="text-[19px] opacity-60">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
