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

  console.log("TestContent menuItem", menuItem);

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

      <TestItemAddons
        addonName={"size"}
        addonLabel={"Size"}
        // addons={addons}
        // setAddons={setAddons}
        // addAddon={addAddon}
        // editAddon={editAddon}
        // removeAddon={removeAddon}
        // isOpen={isOpen}
        // setIsOpen={setIsOpen}
        setMenuItem={setMenuItem}
      />

      <TestItemAddons
        addonName={"extra"}
        addonLabel={"Extra"}
        // addons={addons}
        // setAddons={setAddons}
        // addAddon={addAddon}
        // editAddon={editAddon}
        // removeAddon={removeAddon}
        // isOpen={isOpen}
        // setIsOpen={setIsOpen}
        setMenuItem={setMenuItem}
      />
    </div>
  );
};

export default TestContent;
