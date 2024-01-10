"use client";

import React, { ChangeEvent, useState } from "react";
import MenuItemImageUpload from "./MenuItemImageUpload";
import MenuItemForm from "./MenuItemForm";
import MenuItemForm2 from "./MenuItemForm2";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMenuItem((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
        {/* <MenuItemForm2
          itemState={menuItem!}
          setItemState={setMenuItem}
          categories={categories}
          handleChange={handleChange}
        /> */}
      </div>
    </div>
  );
};

export default MenuItemDetails;
