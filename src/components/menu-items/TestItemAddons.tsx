"use client";
import React, { useState } from "react";
import AddonItem from "../share/AddonItem";
import Up from "../icons/Up";
import Down from "../icons/Down";
import { Button } from "../ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

type Props = {
  addonName: string;
  addonLabel: string;
  addons: AddonType[];
  setAddons: React.Dispatch<React.SetStateAction<AddonType[]>>;
};

const TestItemAddons = ({
  addonName,
  addonLabel,
  addons,
  setAddons,
}: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  //   const [addons, setAddons] = useState<AddonType[]>([]);
  //   let addonsArray: AddonType[] = [];

  const addAddon = ({ name, price }: AddonType) => {
    setAddons((prev: AddonType[]) => [...prev, { name, price }]);
  };

  function editAddon(
    ev: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void {
    setAddons((prev: AddonType[]) => {
      const newSizes = [...prev];
      const a = newSizes[index];
      newSizes[index] = { ...a, [ev.target.name]: ev.target.value };
      console.log("newSize", newSizes);
      return newSizes;
    });
    console.log(ev.target.name, ev.target.value);
  }

  function removeAddon(index: number) {
    //@ts-expect-error
    setAddons((prev: any) => prev.filter((v, i: number) => i !== index));
  }

  console.log("MenuItemAddons called", addons);

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <div className="flex items-center gap-2 ">
        <span
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-0 bg-white rounded-full shadow-md hover:cursor-pointer "
        >
          {isOpen ? <Up className="w-4 h-4" /> : <Down className="w-4 h-4" />}
        </span>

        <span className="text-gray-500 font-semibold border-2 ">
          {addonName}
        </span>
        <span>({addons?.length})</span>
      </div>
      <div className={cn({ hidden: !isOpen })}>
        {addons &&
          addons?.length > 0 &&
          addons.map((size: AddonType, index) => (
            <AddonItem
              key={index + size.name + size.price}
              addon={size}
              className="flex items-center gap-2"
              setAddons={setAddons}
              index={index}
            />
          ))}
        <Button
          type="button"
          onClick={(e) => addAddon({ name: "", price: "0" })}
          className="flex items-center justify-center gap-2 border border-primary hover:text-primary hover:bg-inherit"
        >
          <PlusIcon className="w-4 h-4" />
          <span>{addonLabel}</span>
        </Button>
      </div>
    </div>
  );
};

export default TestItemAddons;
