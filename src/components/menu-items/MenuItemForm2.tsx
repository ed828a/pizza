"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import MenuItemPriceProps from "./MenuItemPriceProps";
// import EditableImage from "../share/EditableImage";
// import { MenuItemType } from "./MenuItemDetailsContent";
import DeleteButton from "../share/DeleteButton";

export type Size = {
  name: string;
  price: number;
};

type Props = {
  itemState: MenuItemType;
  setItemState: React.Dispatch<React.SetStateAction<any>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  //   setLink: (image: string) => void;
  //   handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  //   isNew?: boolean;

  //   handleDelete: () => Promise<void>;
  categories: { id: string; name: string }[];
};

const MenuItemForm2 = ({
  itemState,
  handleChange,
  //   setLink,
  //   handleSubmit,
  //   isNew = false,
  setItemState,
  //   handleDelete,
  categories,
}: Props) => {
  const [sizes, setSizes] = useState(itemState?.sizes);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    itemState?.extraIngredients
  );
  const [category, setCategory] = useState("");
  const [bestSeller, setBestSeller] = useState(false);

  console.log("itemState", itemState);
  console.log("sizes", sizes);
  console.log("extraIngredientPrices", extraIngredientPrices);
  //   console.log("isNew", isNew);

  useEffect(() => {
    setItemState((prev: MenuItemType) => ({
      ...prev,
      sizes,
      extraIngredientPrices,
      category,
      bestSeller,
    }));
  }, [category, extraIngredientPrices, setItemState, sizes, bestSeller]);

  useEffect(() => {
    // if (isNew) return;

    setSizes(itemState?.sizes);
    setExtraIngredientPrices(itemState?.extraIngredients);
    setCategory(itemState?.category);
    setBestSeller(itemState?.bestSeller);
  }, [itemState]);

  //   useEffect(() => {
  //     fetch("/api/categories")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("MenuItemForm data", data);
  //         setCategories(data.categories);
  //       })
  //       .catch((error) => console.log("error", error));
  //   }, []);

  return (
    <div className="">
      <form
        className="mt-8 max-w-lg mx-auto "
        // onSubmit={(ev) => handleSubmit(ev)}
      >
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* <div className="flex justify-center ">
            <EditableImage link={itemState.image} setLink={setLink} />
          </div> */}
          <div className="grow flex flex-col ">
            <div className="relative">
              <label htmlFor="itemname" className="profilelabel capitalize">
                item name
              </label>
              <input
                id="itemname"
                onChange={handleChange}
                value={itemState?.name}
                type="text"
                name="name"
              />
            </div>
            <div className="relative">
              <label htmlFor="description" className="profilelabel">
                Description
              </label>
              <input
                id="description"
                onChange={handleChange}
                value={itemState?.description}
                type="text"
                name="description"
              />
            </div>
            <div className="relative">
              <label htmlFor="category" className="profilelabel">
                Category
              </label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">choose a category</option>
                {categories.length > 0 &&
                  categories.map((c: any) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="relative">
              <label htmlFor="baseprice" className="profilelabel">
                Base Price
              </label>
              <input
                id="baseprice"
                onChange={handleChange}
                value={itemState?.basePrice}
                type="text"
                name="basePrice"
              />
            </div>
            <div className="">
              <MenuItemPriceProps
                propName="Sizes"
                addLabel="Add item size"
                sizes={itemState?.sizes}
                setSizes={setSizes}
                // setItemState={setItemState}
                // itemState={itemState}
              />
              <MenuItemPriceProps
                propName="Extra ingredients"
                addLabel="Add ingredients prices"
                sizes={itemState?.extraIngredients}
                setSizes={setExtraIngredientPrices}
                // setItemState={setItemState}
                // itemState={itemState}
              />
            </div>
            <div className="">
              <label htmlFor="bestSeller" className="flex gap-2">
                <input
                  type="checkbox"
                  name="bestSeller"
                  id="bestSeller"
                  className="accent-primary"
                  checked={bestSeller}
                  onChange={(e) => setBestSeller(e.target.checked)}
                />
                <span className="text-sm">Best Seller</span>
              </label>
            </div>
            <div className="mt-4">
              <button className="mb-4 capitalize" type="submit">
                {true ? "create" : "update"}
              </button>
              <DeleteButton
                label="Delete this menu item"
                // onDelete={handleDelete}
                onDelete={async () => {}}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MenuItemForm2;
