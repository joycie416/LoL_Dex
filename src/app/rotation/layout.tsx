"use client";

import React, { ReactNode } from "react";

const RotationPage = ({children}: {children: ReactNode}) => {

  return (
    <div className="w-full min-w-fit mb-4">
      <p className="page-title text-2xl ml-4 mb-4">Rotation List</p>
      {children}
    </div>
  );
};

export default RotationPage;
