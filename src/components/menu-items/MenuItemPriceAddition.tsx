"use client";
import { cn } from "@/lib/utils";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Up from "../icons/Up";

type Props = {
  propName: string;
  addLabel: string;
  sizes: any[];
  setSizes: React.Dispatch<React.SetStateAction<any[]>>;
  setItemState: React.Dispatch<React.SetStateAction<ItemStateType>>;
  itemState: ItemStateType;
};

const MenuItemPriceAddition = ({
  propName,
  addLabel,
  sizes,
  setSizes,
  setItemState,
  itemState,
}: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const addSize = ({ name, price }: Size) => {
    setSizes((prev) => [...prev, { name, price }]);
  };

  function editSize(
    ev: React.ChangeEvent<HTMLInputElement>,
    index: number,
    property: "name" | "price"
  ): void {
    setSizes((prev) => {
      const newSizes = [...prev];
      const a = newSizes[index];
      newSizes[index] = { ...a, [property]: ev.target.value };
      // console.log("newSize", newSizes);
      return newSizes;
    });
  }

  function removeSize(index: number) {
    setSizes((prev) => prev.filter((v, i) => i !== index));
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <div className="flex items-center gap-2 ">
        <span
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "p-0 bg-white rounded-full shadow-md hover:cursor-pointer ",
            { "rotate-180 transition-all": !isOpen },
            "w-4 h-4"
          )}
        >
          <Up
            className={cn("w-4 h-4", { "rotate-180 transition-all": isOpen })}
          />
        </span>

        <span className="text-gray-500 font-semibold border-2 ">
          {propName}
        </span>
        <span>({sizes?.length})</span>
      </div>
      <div className={cn({ hidden: !isOpen })}>
        {sizes?.length > 0 &&
          sizes.map((size: Size, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="relative">
                <label htmlFor="sizename" className="profilelabel">
                  Name
                </label>
                <input
                  id="sizename"
                  type="text"
                  placeholder="Size name"
                  value={size.name}
                  onChange={(ev) => editSize(ev, index, "name")}
                />
              </div>

              <div className="relative">
                <label htmlFor="sizeprice" className="profilelabel">
                  Extra price
                </label>
                <input
                  id="sizeprice"
                  type="text"
                  placeholder="Extra price"
                  value={size.price}
                  onChange={(ev) => editSize(ev, index, "price")}
                />
              </div>
              <div className="">
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="bg-white px-2"
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={(e) => addSize({ name: "", price: 0 })}
          className="bg-white flex items-center justify-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default MenuItemPriceAddition;
