"use client";

import Card from "@/components/Card";
import { CType } from "@/types/champions";
import { useEffect, useState } from "react";

const RotationPage = () => {
  const [rotation, setRotation] = useState<CType[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/rotation", { method: "GET" });
      const { data } = await res.json();

      setRotation(data);
      setIsLoading(false)
    };
    fetchData();
  }, []);

  return (
    <>
      <p className="page-title text-white text-xl ml-4 mb-4">Free champions</p>
      <div className="card-container">
        {isLoading ? 
        <p className="text-gray-400 ml-4">Loading...</p>
        : rotation[0]?.map((info) => {
          return (
            <Card
              type={"champion"}
              name={info.id}
              title={info.name}
              text={info.title}
              key={info.name}
            />
          );
        })}
      </div>
      <p className="page-title text-white text-xl ml-4 my-4">
        Free champions for new players
      </p>
      <div className="card-container">
        {isLoading ? 
        <p className="text-gray-400 ml-4">Loading...</p>
        : rotation[1]?.map((info) => {
          return (
            <Card
              type={"champion"}
              name={info.id}
              title={info.name}
              text={info.title}
              key={info.name}
            />
          );
        })}
      </div>
    </>
  );
};

export default RotationPage;
