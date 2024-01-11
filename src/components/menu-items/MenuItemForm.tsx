"use client";

import React from "react";
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
  const createOrUpdateMenuItemActionWithId = createOrUpdateMenuItemAction.bind(
    null,
    menuItem?.id
  );

  const [state, dispatch] = useFormState(createOrUpdateMenuItemActionWithId, {
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenuItem((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log("MenuItemForm menuItem", menuItem);
  console.log("MenuItemForm state", state);
  console.log("MenuItemForm categories", categories);

  return (
    <div className="grow flex justify-center items-center">
      <form
        action={(formData: FormData) => {
          if (menuItem?.image) {
            formData.append("image", menuItem?.image);
          }
          if (menuItem?.sizes && menuItem.sizes.length > 0) {
            formData.append("sizes", JSON.stringify(menuItem.sizes));
          }

          if (
            menuItem?.extraIngredients &&
            menuItem.extraIngredients.length > 0
          ) {
            formData.append(
              "extraIngredients",
              JSON.stringify(menuItem.extraIngredients)
            );
          }

          dispatch(formData);
        }}
      >
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
            value={menuItem?.description || ""}
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
              addonName="sizes"
              addonLabel="Add item size"
              setMenuItem={setMenuItem}
              menuItem={menuItem}
            />

            <MenuItemAddons
              addonName="extraIngredients"
              addonLabel="Add item extra ingredients"
              setMenuItem={setMenuItem}
              menuItem={menuItem}
            />
          </div>
          <LabelCheckbox
            label="Best Seller"
            id="bestSeller"
            name="bestSeller"
            type="checkbox"
            className="accent-primary"
            checked={menuItem?.bestSeller || false}
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
              {menuItem?.id ? "update" : "create"}
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
