"use client";

import React, { useState } from "react";
import LabelInput from "../share/LabelInput";
import { useFormState } from "react-dom";
import LabelSelect from "../share/LabelSelect";
import { createOrUpdateMenuItemAction } from "@/lib/menuItemsActions";
import MenuItemAddons from "./MenuItemAddons";
import LabelCheckbox from "../share/LabelCheckbox";
import { Button } from "../ui/button";
import LabelMoneyInput from "../share/LabelMoneyInput";

type Props = {
  menuItem: MenuItemType | null;
  setMenuItem: React.Dispatch<React.SetStateAction<MenuItemType | null>>;
  categories: { id: string; name: string }[];
  disableSubmit: boolean;
};

const MenuItemForm = ({
  menuItem,
  setMenuItem,
  categories,
  disableSubmit,
}: Props) => {
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredients, setExtraIngredients] = useState(
    menuItem?.extraIngredients || []
  );

  const createOrUpdateMenuItemActionWithId = createOrUpdateMenuItemAction.bind(
    null,
    menuItem?.id
  );

  const [state, dispatch] = useFormState(
    createOrUpdateMenuItemActionWithId,
    {}
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuItem((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addAddon = ({ name, price }: AddonType) => {
    setSizes((prev: AddonType[]) => [...prev, { name, price }]);
  };

  function editAddon(
    ev: React.ChangeEvent<HTMLInputElement>,
    index: number
    // property: "name" | "price"
  ): void {
    setSizes((prev: AddonType[]) => {
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
    setSizes((prev: any) => prev.filter((v, i: number) => i !== index));
  }

  console.log("MenuItemForm sizes", sizes);
  console.log("extraIngredients", extraIngredients);
  return (
    <div className="grow flex justify-center items-center">
      <form action={dispatch}>
        <div className="flex flex-col gap-4 pl-2">
          <LabelInput
            label="Name"
            id="name"
            name="name"
            type="text"
            value={menuItem?.name || ""}
            handleChange={handleChange}
            placeholder="name of menu item"
          />
          <LabelInput
            label="Description"
            id="description"
            name="description"
            type="text"
            value={menuItem?.description}
            handleChange={handleChange}
          />
          <LabelSelect
            label="Category"
            id="category"
            name="category"
            value={menuItem?.category}
            handleChange={(e) =>
              setMenuItem((prev: any) => ({
                ...prev,
                category: e.target.value,
              }))
            }
            opions={categories}
            className="block w-full my-4 rounded-xl border p-2 border-gray-300 bg-gray-100"
          />
          <LabelMoneyInput
            label="Base Price"
            id="basePrice"
            name="basePrice"
            type="text"
            value={
              menuItem && menuItem.basePrice
                ? menuItem.basePrice.toString()
                : ""
            }
            // value={menuItem?.basePrice || 0}
            handleChange={handleChange}
          />
          <div className="w-[400px]">
            <MenuItemAddons
              propName="Sizes"
              addLabel="Add item size"
              addons={sizes}
              setAddons={setSizes}
            />
            {/* <MenuItemAddons
              propName="Extra Ingredients"
              addLabel="Add more ingredients"
              addons={extraIngredients}
              setAddons={setExtraIngredients}
            /> */}
          </div>
          <LabelCheckbox
            label="Best Seller"
            id="bestSeller"
            name="bestSeller"
            type="checkbox"
            className="accent-primary"
            checked={menuItem?.bestSeller}
            handleChange={(e) =>
              setMenuItem((prev: any) => ({
                ...prev,
                bestSeller: e.target.checked,
              }))
            }
          />

          <div className="mt-4">
            <Button
              className="mb-4 capitalize border border-primary hover:text-primary hover:bg-inherit w-full"
              type="submit"
              disabled={disableSubmit}
            >
              {menuItem?.id ? "create" : "update"}
            </Button>

            {/* <DeleteButton
              label="Delete this menu item"
              onDelete={handleDelete}
            /> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default MenuItemForm;
