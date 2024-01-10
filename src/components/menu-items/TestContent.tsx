"use client";

import React, { useState } from "react";
import LabelSelect from "../share/LabelSelect";
import TestItemAddons from "./TestItemAddons";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import Up from "../icons/Up";
import Down from "../icons/Down";
import { cn } from "@/lib/utils";
import { TrashIcon } from "@radix-ui/react-icons";

type Props = {
  categories?: { id: string; name: string }[];
};

const TestContent = ({ categories }: Props) => {
  const [menuItem, setMenuItem] = useState<any>({});
  const [addons, setAddons] = useState<AddonType[]>([]);
  const [isOpen, setIsOpen] = useState(true);

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

  console.log("addons", addons);

  return (
    <div className="w-80">
      {categories && (
        <div className="">
          <LabelSelect
            label="Category"
            id="category"
            name="category"
            value={menuItem.category}
            handleChange={(e) =>
              setMenuItem((prev: any) => ({
                ...prev,
                category: e.target.value,
              }))
            }
            opions={categories}
            className="block w-full my-4 rounded-xl border p-2 border-gray-300 bg-gray-100"
          />
        </div>
      )}

      <div className="bg-gray-200 p-2 rounded-md mb-2">
        <div className="flex items-center gap-2 ">
          <span
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-0 bg-white rounded-full shadow-md hover:cursor-pointer "
          >
            {isOpen ? <Up className="w-4 h-4" /> : <Down className="w-4 h-4" />}
          </span>

          <span className="text-gray-500 font-semibold border-2 ">Size</span>
          <span>({addons?.length})</span>
        </div>
        <div className={cn({ hidden: !isOpen })}>
          {addons &&
            addons?.length > 0 &&
            addons.map((size: AddonType, index) => (
              <div key={index} className="flex gap-2">
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
                    onChange={(e) => {
                      editAddon(e, index);
                    }}
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
                    onChange={(e) => {
                      editAddon(e, index);
                    }}
                    className="block w-full my-4 rounded-xl border p-2 border-gray-300 bg-gray-100"
                  />
                </div>
                <div className="relative">
                  <button
                    type="button"
                    //   onClick={() => removeAddon(index)}
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
            <span>Add more size</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestContent;
