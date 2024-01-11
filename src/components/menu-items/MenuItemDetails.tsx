"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import MenuItemImageUpload from "./MenuItemImageUpload";
import MenuItemForm from "./MenuItemForm";
import { disableSubmitMenuItems } from "@/lib/utils";

type Props = {
  categories: { id: string; name: string }[];
  originalMenuItem?: MenuItemType;
};

const MenuItemDetails = ({ categories, originalMenuItem }: Props) => {
  const init = originalMenuItem ? originalMenuItem : null;
  console.log("init", init);
  const [menuItem, setMenuItem] = useState<MenuItemType | null>(init);
  useEffect(() => {
    if (init) {
      setMenuItem((prev: any) => ({
        ...prev,
        sizes: [...init.sizes],
        extraIngredients: [...init.extraIngredients],
      }));
    }
  }, [init]);

  console.log("MenuItemDetails menuItem", menuItem);

  let disabledSubmit: boolean;
  if (originalMenuItem) {
    disabledSubmit = disableSubmitMenuItems(menuItem, originalMenuItem);
    console.log("disableSubmit case 1", disabledSubmit);
  } else {
    if (menuItem) {
      disabledSubmit =
        menuItem.name?.length === 0 ||
        menuItem.image?.length === 0 ||
        menuItem.description?.length === 0 ||
        menuItem.category?.length === 0 ||
        menuItem.basePrice?.length === 0;
      console.log("disableSubmit case 2", disabledSubmit);
    } else {
      disabledSubmit = true;
    }
  }

  console.log("disableSubmit", disabledSubmit);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMenuItem((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log("MenuItemDetails originalMenuItem", originalMenuItem);

  return (
    <div className=" ">
      <div className="flex flex-col sm:flex-row gap-4">
        <MenuItemImageUpload menuItem={menuItem} setMenuItem={setMenuItem} />
        <MenuItemForm
          menuItem={menuItem}
          setMenuItem={setMenuItem}
          categories={categories}
          disableSubmit={disabledSubmit}
        />
      </div>
    </div>
  );
};

export default MenuItemDetails;
