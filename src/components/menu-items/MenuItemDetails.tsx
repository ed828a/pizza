"use client";

import React, { useState } from "react";
import MenuItemImageUpload from "./MenuItemImageUpload";
import MenuItemForm from "./MenuItemForm";

type Props = {
  categories: { id: string; name: string }[];
  originalMenuItem?: MenuItemType;
};

const MenuItemDetails = ({ categories, originalMenuItem }: Props) => {
  const init = originalMenuItem ? originalMenuItem : null;
  const [menuItem, setMenuItem] = useState<MenuItemType | null>(init);

  const enableSubmit =
    menuItem?.name !== originalMenuItem?.name ||
    menuItem?.image !== originalMenuItem?.image ||
    menuItem?.description !== originalMenuItem?.description ||
    menuItem?.category !== originalMenuItem?.category ||
    menuItem?.basePrice !== originalMenuItem?.basePrice ||
    menuItem?.bestSeller !== originalMenuItem?.bestSeller ||
    menuItem?.sizes !== originalMenuItem?.sizes ||
    menuItem?.extraIngredients !== originalMenuItem?.extraIngredients;

  console.log("enableSubmit", enableSubmit);

  return (
    <div className=" ">
      <div className="flex flex-col sm:flex-row gap-4">
        <MenuItemImageUpload menuItem={menuItem} setMenuItem={setMenuItem} />
        <MenuItemForm
          menuItem={menuItem}
          setMenuItem={setMenuItem}
          categories={categories}
          disableSubmit={!enableSubmit}
        />
      </div>
    </div>
  );
};

export default MenuItemDetails;
