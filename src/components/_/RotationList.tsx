"use client";

import { CType } from "@/types/champions";
import { Suspense, useEffect, useState } from "react";
import Card from "../Card";

const RotationList = () => {
  const [rotation, setRotation] = useState<CType[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/rotation", { method: "GET" });
      const { data } = await res.json();

      setRotation(data);
    };
    fetchData();
  }, []);

  // const res = await fetch("/api/rotation", { method: "GET" });
  // const { data: rotation } = await res.json();

  return (
    <>
      <p className="page-title text-white text-xl ml-4 mb-4">Free champions</p>
      {/* <Suspense fallback={<Loading className={"text-gray-400 ml-4"} />}> */}
      <div className="card-container">
        {rotation[0]?.map((info) => {
          const tmp = { ...info };
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
      {/* </Suspense> */}
      <p className="page-title text-white text-xl ml-4 my-4">
        Free champions for new players
      </p>
      <div className="card-container">
        {rotation[1]?.map((info) => {
          const tmp = { ...info };
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
    </>
  );
};

export default RotationList;
