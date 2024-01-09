"use client";

import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Up from "../icons/Up";
import Down from "../icons/Down";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type Props = {
  propName: string;
  addLabel: string;
  addons: AddonType[];
  setAddons: React.Dispatch<React.SetStateAction<AddonType[]>>;
};

const MenuItemAddons = ({ propName, addLabel }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [addons, setAddons] = useState<AddonType[]>([]);

  const addAddon = ({ name, price }: AddonType) => {
    setAddons((prev: AddonType[]) => [...prev, { name, price }]);
  };

  function editAddon(
    ev: React.ChangeEvent<HTMLInputElement>,
    index: number
    // property: "name" | "price"
  ): void {
    // setAddons((prev: AddonType[]) => {
    //   const newSizes = [...prev];
    //   const a = newSizes[index];
    //   newSizes[index] = { ...a, [ev.target.name]: ev.target.value };
    //   // console.log("newSize", newSizes);
    //   return newSizes;
    // });
    const newAddons = [...addons];
    newAddons[index] = {
      ...newAddons[index],
      [ev.target.name]: ev.target.value,
    };
    setAddons((prev) => newAddons);
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
          {propName}
        </span>
        <span>({addons?.length})</span>
      </div>
      <div className={cn({ hidden: !isOpen })}>
        {addons &&
          addons?.length > 0 &&
          addons.map((size: AddonType, index) => (
            <div
              key={index + size.name + size.price}
              className="flex items-center gap-2"
            >
              <div className="relative">
                <label
                  htmlFor="sizename"
                  className="text-gray-400 text-sm absolute top-0 left-2"
                >
                  Name
                </label>
                <input
                  id="sizename"
                  name="name"
                  type="text"
                  placeholder="Addon name"
                  value={size.name}
                  onChange={(ev) => editAddon(ev, index)}
                  className="block w-full my-4 rounded-xl border p-2 border-gray-300 bg-gray-100"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="sizeprice"
                  className="text-gray-400 text-sm absolute top-0 left-2"
                >
                  Extra price
                </label>
                <input
                  id="sizeprice"
                  name="price"
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={(ev) => editAddon(ev, index)}
                  className="block w-full my-4 rounded-xl border p-2 border-gray-300 bg-gray-100"
                />
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => removeAddon(index)}
                  className="bg-gray-100 w-10 p-1 rounded-lg border border-gray-300 hover:border-primary "
                >
                  <TrashIcon className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        <Button
          type="button"
          onClick={(e) => addAddon({ name: "", price: "0" })}
          className="flex items-center justify-center gap-2 border border-primary hover:text-primary hover:bg-inherit"
        >
          <PlusIcon className="w-4 h-4" />
          <span>{addLabel}</span>
        </Button>
      </div>
    </div>
  );
};

export default MenuItemAddons;
