import CreateMenuItemLink from "@/components/menu-items/CreateMenuItemLink";
import MenuItemList from "@/components/menu-items/MenuItemList";
import Pagination from "@/components/menu-items/Pagination";
import dbConnect from "@/lib/dbConnect";
import MenuItem from "@/models/MenuItem";
import React from "react";

type Props = {
  searchParams?: { query?: string; page?: string };
};

const MenuItemsPage = async ({ searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 9;
  const skip = (currentPage - 1) * limit;

  await dbConnect();
  const [totalCount, menuItems] = await Promise.all([
    MenuItem.countDocuments(),
    MenuItem.find().skip(skip).limit(9),
  ]);

  console.log("MenuItemsPage totalCount", totalCount);
  const totalPages = Math.ceil(Number(totalCount) / limit);
  console.log("MenuItemsPage totalPages:", totalPages);

  const items = menuItems.map((m) => ({
    id: m._id.toString(),
    name: m.name,
    image: m.image,
    description: m.description,
    category: m.category,
    basePrice: m.basePrice,
    sizes: m.sizes,
    extraIngredients: m.extraIngredients,
    bestSeller: m.bestSeller,
  }));

  return (
    <section className="section flex-col">
      <CreateMenuItemLink />
      <MenuItemList menuItems={items} />
      <Pagination totalPages={totalPages} />
    </section>
  );
};

export default MenuItemsPage;
