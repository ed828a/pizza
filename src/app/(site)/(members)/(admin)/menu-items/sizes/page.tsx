import CreateEditSize from "@/components/categories/CreateEditSize";
import SizesContent from "@/components/categories/SizesContent";
import SizeList from "@/components/menu-items/SizeList";
import dbConnect from "@/lib/dbConnect";
import Size from "@/models/size";
import React from "react";

type Props = {};

const SizePage = async (props: Props) => {
  await dbConnect();
  const sizes = await Size.find();
  const sizeArray = sizes.map((s) => {
    // console.log("s", s);
    return {
      id: s._id.toString() as string,
      name: s.name as string,
      price: s.price as string,
    };
  });
  return (
    <section className="section flex flex-col gap-8">
      <SizesContent sizes={sizeArray} />
    </section>
  );
};

export default SizePage;
