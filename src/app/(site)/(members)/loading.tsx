import LoadingSpinner from "@/components/icons/LoadingSpinner";
import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="">
        <LoadingSpinner className="w-24 h-24 text-primary" />
        <h1 className="uppercase mt-4">Loading...</h1>
      </div>
    </section>
  );
};

export default Loading;
