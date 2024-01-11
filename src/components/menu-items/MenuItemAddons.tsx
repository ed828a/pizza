"use client";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import Up from "../icons/Up";
import Down from "../icons/Down";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import AddonItem from "./AddonItem";

type Props = {
  addonName: string;
  addonLabel: string;
  setMenuItem: React.Dispatch<any>;
  menuItem: MenuItemType | null;
};

const MenuItemAddons = ({
  addonName,
  addonLabel,
  setMenuItem,
  menuItem,
}: Props) => {
  // console.log("MenuItemAddons menuItem", menuItem);
  // console.log("addonName", addonName);
  let init: AddonType[] = [];
  if (addonName === "sizes" && menuItem && menuItem.sizes.length > 0) {
    init = menuItem.sizes;
  } else if (
    addonName === "extraIngredients" &&
    menuItem &&
    menuItem.extraIngredients.length > 0
  ) {
    init = menuItem.extraIngredients;
  }

  const [addons, setAddons] = useState<AddonType[]>(init);
  const [isOpen, setIsOpen] = useState(true);

  // console.log("MenuItemAddons init", init);
  // console.log("MenuItemAddons addons", addons);

  useEffect(() => {
    setMenuItem((prev: any) => ({ ...prev, [addonName]: addons }));
  }, [addons]);

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
          <Up
            className={cn("w-4 h-4 transition-all duration-500", {
              "rotate-180": !isOpen,
            })}
          />

          {/* {isOpen ? (
            <Up className="w-4 h-4 transition-all duration-500" />
          ) : (
            <Up className="w-4 h-4 rotate-180 transition-all duration-500" />
          )} */}
        </span>

        <span className="text-gray-500 font-semibold border-2 capitalize ">
          {addonName}
        </span>
        <span>({addons?.length})</span>
      </div>
      <div className={cn("transition-all", { hidden: !isOpen })}>
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
          <span>add more {addonName}</span>
        </Button>
      </div>
    </div>
  );
};

export default MenuItemAddons;
