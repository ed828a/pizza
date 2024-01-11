// "use client";
import TestContent from "@/components/menu-items/TestContent";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/category";
import React from "react";
import { testMenus, textCategories } from "@/lib/seeding/menus";
import MenuItem from "@/models/MenuItem";

type Props = {};

const TestPage = async (props: Props) => {
  const connection = await dbConnect();
  // console.log("NewItemPage connection", connection);
  const categoriesFrmDb = await Category.find();

  if (categoriesFrmDb?.length === 0) {
    textCategories.forEach(async (c) => {
      await Category.create(c);
    });
    console.log("Categories created.");

    testMenus.forEach(async (m) => {
      await MenuItem.create(m);
    });

    console.log("MenuItems created. ");
  }

  const categories: { id: string; name: string }[] = categoriesFrmDb.map(
    (c) => ({
      id: c._id.toString(),
      name: c.name,
    })
  );
  console.log("TestPage cateogries", categories);
  return (
    <section className="section flex flex-col">
      <h1>Test Page</h1>
      <TestContent categories={categories} />
    </section>
  );
};

export default TestPage;
