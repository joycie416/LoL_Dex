"use client";

import React, { useEffect, useState } from "react";
import { getChampions, getRotation } from "../api/server-action";
import Card from "@/components/Card";
import { CType } from "@/types/champions";

const RotationPage = () => {
  const [rotation, setRotation] = useState<[string, number[]][] | null>([]);
  const [data, setData] = useState<[string, CType][] | null>([]);

  const fetchData = async () => {
    getRotation().then(setRotation);
    getChampions().then(setData);
  };

  useEffect(() => {
    //   const rotation = await getRotation();
    // // console.log(rotation)
    // const data = await getChampions();

    fetchData();
  }, []);

  const freeChampions = data?.filter((info) => {
    return rotation ? rotation[0][1].includes(+info[1].key) : null;
  });
  const freeChampionsForNewPlayers = data?.filter((info) => {
    return rotation ? rotation[1][1].includes(+info[1].key) : null;
  });

  return (
    <div className="w-full min-w-fit mb-4">
      <p className="page-title text-2xl ml-4 mb-4">Rotation List</p>
      <p className="page-title text-white text-xl ml-4 mb-4">Free champions</p>
      {/* <div className="grid grid-cols-4 gap-4"> */}
      {!(freeChampions ? freeChampions[0] : null) ? (
        <p className="text-gray-400 ml-4">Loading...</p>
      ) : (
        <div className="card-container">
          {freeChampions?.map((info) => {
            const [name, content] = info;
            return (
              <Card
                type={"champion"}
                name={name}
                title={content.name}
                text={content.title}
                key={name}
              />
            );
          })}
        </div>
      )}
      {/* </div> */}
      <p className="page-title text-white text-xl ml-4 my-4">Free champions for new players</p>
      {/* <div className="grid grid-cols-4 gap-4"> */}
      {!(freeChampionsForNewPlayers ? freeChampionsForNewPlayers[0] : null) ? (
        <p className="text-gray-400 ml-4">Loading...</p>
      ) : (
        <div className="card-container">
          {freeChampionsForNewPlayers?.map((info) => {
            const [name, content] = info;
            return (
              <Card
                type={"champion"}
                name={name}
                title={content.name}
                text={content.title}
                key={name}
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
