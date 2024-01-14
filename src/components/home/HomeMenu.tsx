import dbConnect from "@/lib/dbConnect";
import MenuItem from "@/models/MenuItem";
import Image from "next/image";
import React from "react";
import SectionHeader from "../menu/SectionHeader";
import MenuItemComponent from "../menu/MenuItemComponent";

type Props = {};

const HomeMenu = async (props: Props) => {
  await dbConnect();
  const bestSellersFrmDB = await MenuItem.find({ bestSeller: true });
  const bestSellers = bestSellersFrmDB.map((m: any) => ({
    id: m._id.toString(),
    name: m.name,
    image: m.image,
    description: m.description,
    category: m.category.toString(),
    basePrice: m.basePrice,
    bestSeller: m.bestSeller,
    sizes: m.sizes.map((s: any) => ({
      id: s._id.toString(),
      name: s.name,
      price: s.price,
    })),
    extraIngredients: m.extraIngredients.map((s: any) => ({
      id: s._id.toString(),
      name: s.name,
      price: s.price,
    })),
  }));

  //   console.log("bestSellers", bestSellers);

  return (
    <div>
      <div className="text-center relative left-0 right-0 w-full justify-start ">
        <div className="absolute -left-4 -top-[70px] text-left -z-10">
          <Image
            src="/images/sallad_right.png"
            width={109}
            height={189}
            alt="sallad"
          />
        </div>
        <div className="absolute -top-[100px] -right-4 -z-10">
          <Image
            src="/images/sallad_left.png"
            width={107}
            height={195}
            alt="sallad"
          />
        </div>
      </div>
      <SectionHeader subHeader="check out" mainHeader="Our Best Sellers" />
      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 mt-16">
        {bestSellers.length > 0 &&
          bestSellers.map((item: any) => (
            <MenuItemComponent key={item._id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default HomeMenu;
