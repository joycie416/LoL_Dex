

import { getChampion } from "@/app/api/server-action";
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

  const data = await getChampion(params.id);

  // console.log("Champion detail :", data);

  return (
    <div className="px-4">
      <h3 className="title text-4xl">{data?.name ?? params.id}</h3>
      <h3 className="text-2xl text-gray-400 my-5">
        {data?.title ?? "Loading..."}
      </h3>
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${params.id}_0.jpg`}
        width={1024}
        height={200}
        alt={params.id}
        className="mx-auto my-5"
      />
      <p className="mb-5">{data ? data?.lore : "Loading..."}</p>
      <div>
        <p className="title text-white text-2xl mb-1">Stats</p>
        <ul className="flex flex-col gap-1 title text-white ml-6">
          <li className="list-disc">Attack: {data?.info?.attack}</li>
          <li className="list-disc">Defense: {data?.info?.defense}</li>
          <li className="list-disc">Magic: {data?.info?.magic}</li>
          <li className="list-disc">Difficulty: {data?.info?.difficulty}</li>
        </ul>
      </div>
    </div>
  );
};

export default ChapionDetailPage;
