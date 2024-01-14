import MenuItemComponent from "@/components/menu/MenuItemComponent";
import MenuList from "@/components/menu/MenuList";
import SectionHeader from "@/components/menu/SectionHeader";
import dbConnect from "@/lib/dbConnect";
import MenuItem from "@/models/MenuItem";
import Category from "@/models/category";
import React from "react";

type Props = {
  searchParams?: { query?: string; page?: string };
};

const MenuPage = async ({ searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 9;
  const skip = (currentPage - 1) * limit;
  await dbConnect();
  const [categoriesFrmDB, menuItemsFrmDB] = await Promise.all([
    Category.find(),
    MenuItem.find(),
  ]);

  const categories = categoriesFrmDB.map((c) => ({
    id: c._id.toString(),
    name: c.name,
  }));

  const menuItems = menuItemsFrmDB.map((m: any) => ({
    id: m._id.toString(),
    name: m.name,
    image: m.image,
    description: m.description,
    category: m.category.toString(),
    basePrice: m.basePrice,
    bestSeller: m.bestSeller,
    sizes: m.sizes.map((s: any) => ({
      id: s._id.toString(),
      name: s.name,
      price: s.price,
    })),
    extraIngredients: m.extraIngredients.map((s: any) => ({
      id: s._id.toString(),
      name: s.name,
      price: s.price,
    })),
  }));

  console.log("MenuPage menuItems", menuItems);
  console.log("MenuPage categories", categories);

  return (
    <section className="section">
      <div>
        {categories.length > 0 &&
          categories.map((c: any) => (
            <div className="" key={c.id}>
              <div className="text-center">
                <SectionHeader mainHeader={c.name} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 mb-12">
                {menuItems
                  .filter((item: any) => item.category === c.id)
                  .map((item: any) => (
                    <MenuItemComponent key={item.id} item={item} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default MenuPage;
