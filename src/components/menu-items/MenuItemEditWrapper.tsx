"use client";

import React from "react";

type Props = {
  categories: { id: string; name: string }[];
  originalMenuItem?: {
    id?: string | null | undefined;
    name: string;
    image: string;
    description: string;
    category: string;
    basePrice: number;
    sizes: AddonType[];
    extraIngredients: AddonType[];
    bestSeller: boolean;
  };
};

const MenuItemEditWrapper = ({ categories, originalMenuItem }: Props) => {
  return (
    <div className="section flex-col">
      <h2>MenuItemEditWrapper</h2>
      <div className="text-center overflow-hidden">
        {JSON.stringify(originalMenuItem, null, 2)}
      </div>
    </div>
  );
};

export default MenuItemEditWrapper;
