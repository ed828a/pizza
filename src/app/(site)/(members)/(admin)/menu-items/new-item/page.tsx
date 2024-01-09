import MenuItemDetails from "@/components/menu-items/MenuItemDetails";
import ShowAllMenuItemsLink from "@/components/menu-items/ShowAllMenuItemsLink";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/category";
import React from "react";
import { deoptional } from "zod";

type Props = {};

const NewItemPage = async (props: Props) => {
  const connection = await dbConnect();
  // console.log("NewItemPage connection", connection);

  const categoriesFrmDb = await Category.find();
  const categories: { id: string; name: string }[] = categoriesFrmDb.map(
    (c) => ({
      id: c._id.toString(),
      name: c.name,
    })
  );
  console.log("NewItemPage cateogries", categories);

  return (
    <section className="section">
      <div className="flex flex-col gap-8">
        <ShowAllMenuItemsLink />
        <MenuItemDetails categories={categories} />
      </div>
    </section>
  );
};

export default NewItemPage;
