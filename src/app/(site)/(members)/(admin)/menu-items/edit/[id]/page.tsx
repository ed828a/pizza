import MenuItemDetails from "@/components/menu-items/MenuItemDetails";
import MenuItemEditWrapper from "@/components/menu-items/MenuItemEditWrapper";
import ShowAllMenuItemsLink from "@/components/menu-items/ShowAllMenuItemsLink";
import dbConnect from "@/lib/dbConnect";
import MenuItem from "@/models/MenuItem";
import Category from "@/models/category";
import React from "react";

type Props = {
  params: { id: string };
};

const MenuItemDetailsPage = async ({ params }: Props) => {
  console.log("params", params);
  const { id } = params;

  await dbConnect();

  const [categoriesFrmDB, menuFrmDB] = await Promise.all([
    Category.find(),
    MenuItem.findById(id),
  ]);

  const categories: { id: string; name: string }[] = categoriesFrmDB.map(
    (c) => ({
      id: c._id.toString(),
      name: c.name,
    })
  );

  const menu = {
    id: id,
    name: menuFrmDB.name,
    image: menuFrmDB.image,
    description: menuFrmDB.description,
    category: menuFrmDB.category.toString(),
    basePrice: menuFrmDB.basePrice,
    bestSeller: menuFrmDB.bestSeller,
    sizes: menuFrmDB.sizes.map((s: any) => ({
      id: s._id.toString(),
      name: s.name,
      price: s.price,
    })),
    extraIngredients: menuFrmDB.extraIngredients.map((s: any) => ({
      id: s._id.toString(),
      name: s.name,
      price: s.price,
    })),
  };
  console.log("MenuItemDetailsPage cateogries", categories);
  console.log("MenuItemDetailsPage menu", menu);

  return (
    <section className="section">
      <div className="flex flex-col gap-8">
        <ShowAllMenuItemsLink />
        <MenuItemDetails categories={categories} originalMenuItem={menu} />
      </div>
    </section>
  );
};

export default MenuItemDetailsPage;
