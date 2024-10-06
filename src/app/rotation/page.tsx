"use client";

import React, { Suspense } from "react";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import RotationList from "@/components/_/RotationList";

const Rotation = dynamic(() => import("@/components/_/RotationList"), {
  loading: () => <Loading className={"text-gray-400 ml-4"}/>,
  ssr:false
})

const RotationPage = () => {

  return (
    <div className="w-full min-w-fit mb-4">
      <p className="page-title text-2xl ml-4 mb-4">Rotation List</p>
      {/* <Suspense fallback={<Loading className={"text-gray-400 ml-4"} />}> */}
        <RotationList/>
        {/* <Rotation/> */}
      {/* </Suspense> */}
    </div>
  );
};

export default RotationPage;
