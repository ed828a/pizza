import LoadingSpinner from "@/components/icons/LoadingSpinner";
import React from "react";

type Props = {};

const RootLoading = (props: Props) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <LoadingSpinner className="text-primary w-28" />
      <h1 className="uppercase">Loading...</h1>
    </div>
  );
};

export default RootLoading;
