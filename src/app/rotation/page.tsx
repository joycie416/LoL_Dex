"use client";

import React, { useEffect, useState } from "react";
import { getChampions } from "../api/server-action";
import Card from "@/components/Card";
import { CHAMPION_NAMES, CType } from "@/types/champions";
import { RType } from "@/types/rotation";

const RotationPage = () => {
  const [rotation, setRotation] = useState<CType[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/rotation", { method: "GET" });
      const rotation: RType = await res.json();
      console.log(rotation);
      // let [freeChampions,freeChampionsForNewPlayers] = [rotation.freeChampionIds, rotation.freeChampionIdsForNewPlayers]);
      // getChampions().then(setData);

      const champions = await getChampions();
      let freeChampions: CType[] = rotation.freeChampionIds.map(
        (key) => champions[CHAMPION_NAMES[key]]
      );
      let freeChampionsForNewPlayers: CType[] = rotation.freeChampionIds.map(
        (key) => champions[CHAMPION_NAMES[key]]
      );

      setRotation([freeChampions, freeChampionsForNewPlayers]);
    };
    fetchData();
  }, []);

  console.log(rotation);
  // const freeChampions = data?.filter((info) => {
  //   return rotation ? rotation[0][1].includes(+info[1].key) : null;
  // });
  // const freeChampionsForNewPlayers = data?.filter((info) => {
  //   return rotation ? rotation[1][1].includes(+info[1].key) : null;
  // });

  return (
    <div className="w-full min-w-fit mb-4">
      <p className="page-title text-2xl ml-4 mb-4">Rotation List</p>
      <p className="page-title text-white text-xl ml-4 mb-4">Free champions</p>
      {/* <div className="grid grid-cols-4 gap-4"> */}
      {!rotation[0] ? (
        <p className="text-gray-400 ml-4">Loading...</p>
      ) : (
        <div className="card-container">
          {rotation[0]?.map((info) => {
            const tmp = {...info}
            return (
              <Card
                type={"champion"}
                name={tmp.id}
                title={tmp.name}
                text={tmp.title}
                key={tmp.name}
              />
            );
          })}
        </div>
      )}
      {/* </div> */}
      <p className="page-title text-white text-xl ml-4 my-4">
        Free champions for new players
      </p>
      {/* <div className="grid grid-cols-4 gap-4"> */}
      {!rotation[1] ? (
        <p className="text-gray-400 ml-4">Loading...</p>
      ) : (
        <div className="card-container">
          {rotation[1]?.map((info) => {
            const tmp = {...info}
            return (
              <Card
                type={"champion"}
                name={tmp.id}
                title={tmp.name}
                text={tmp.title}
                key={tmp.name}
              />
            );
          })}
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default RotationPage;
