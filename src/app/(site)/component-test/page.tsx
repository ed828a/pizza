import LoadingSpinner from "@/components/icons/LoadingSpinner";
import React from "react";

type Props = {};

const ComponentTestPage = (props: Props) => {
  return (
    <section className="section w-full h-2/3">
      <div className="">
        <LoadingSpinner className="w-24 h-24 text-primary" />
        <h1 className="uppercase mt-4">Loading...</h1>
      </div>
    </section>
  );
};

export default ComponentTestPage;
