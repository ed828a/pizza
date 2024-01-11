"use client";
import React, { useEffect, useState } from "react";
import Up from "../icons/Up";
import Down from "../icons/Down";
import { Button } from "../ui/button";
import { PlusIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import AddonItem from "./AddonItem";

type Props = {
  addonName: string;
  addonLabel: string;
  // addons: AddonType[];
  // setAddons: React.Dispatch<React.SetStateAction<AddonType[]>>;
  // addAddon: ({ name, price }: AddonType) => void;
  // editAddon: (ev: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  // removeAddon: (index: number) => void;
  // isOpen: boolean;
  // setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuItem: React.Dispatch<any>;
};

const TestItemAddons = ({
  addonName,
  addonLabel,
  // addons,
  // setAddons,
  // addAddon,
  // editAddon,
  // removeAddon,
  // isOpen,
  // setIsOpen,
  setMenuItem,
}: Props) => {
  const [addons, setAddons] = useState<AddonType[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    setMenuItem((prev: any) => ({ ...prev, [addonName]: addons }));
  }, [addons]);

  console.log("TestItemAddons called", addons);

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
              addon={size}
              addonLabel={addonLabel}
              className="flex gap-2 items-center"
              editAddon={editAddon}
              removeAddon={removeAddon}
              index={index}
              key={index}
            />
          ))}
        <Button
          type="button"
          onClick={(e) => addAddon({ name: "", price: "0" })}
          className="flex items-center justify-center gap-2 border border-primary hover:text-primary hover:bg-inherit"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add more {addonName}</span>
        </Button>
      </div>
    </div>
  );
};

export default TestItemAddons;
