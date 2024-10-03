

import { getChampion } from "@/app/api/server-action";
import CarouselContainer from "@/components/_/Carousel";
import { Metadata } from "next";
import Image from "next/image";

type Params = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({ params }: Params) => {
  const id = params.id;
  const data = await getChampion(id);
  return {
    title: data?.name ?? id,
    description: data?.name,
    image: `https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${id}.png`,
  };
};

const ChapionDetailPage = async ({ params }: Params) => {
  const id = params.id
  const data = await getChampion(id);

  // console.log("Champion detail :", data);

  return (
    <div className="px-4 mb-4">
      <h3 className="title text-4xl mb-1">{data?.name ?? id}</h3>
      <h3 className="text-2xl text-gray-400 mb-5">
        {data?.title ?? "Loading..."}
      </h3>
      <CarouselContainer id={id} skins={data?.skins}/>
      <p className="lore my-5">{data ? data?.lore : "Loading..."}</p>
      <div>
        <p className="page-title text-white text-2xl mb-1">Stats</p>
        <ul className="flex flex-col gap-1 text-white ml-6">
          <li className="list-disc">공격력: {data?.info?.attack}</li>
          <li className="list-disc">방어력: {data?.info?.defense}</li>
          <li className="list-disc">마법력: {data?.info?.magic}</li>
          <li className="list-disc">난이도: {data?.info?.difficulty}</li>
        </ul>
      </div>
    </div>
  );
};

export default ChapionDetailPage;
