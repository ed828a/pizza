import CreateMenuItemLink from "@/components/menu-items/CreateMenuItemLink";
import MenuItemList from "@/components/menu-items/MenuItemList";
import React from "react";

type Props = {};

const MenuItemsPage = (props: Props) => {
  const items: any = [];
  return (
    <section className="section border flex-col">
      <CreateMenuItemLink />
      <MenuItemList menuItems={items} />
    </section>
  );
};

export default MenuItemsPage;
