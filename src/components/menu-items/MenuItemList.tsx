import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  menuItems: any[];
};

const MenuItemList = ({ menuItems }: Props) => {
  // console.log("menuItems", menuItems);
  return (
    <div className="min-w-[300px] sm:min-w-[600px] md:min-w-[720px] lg:min-w-[980px]">
      <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {menuItems.length > 0
          ? menuItems.map((item: any) => (
              <Link
                key={item.id}
                href={`/menu-items/edit/${item.id}`}
                className="bg-gray-200 p-4 rounded-lg hover:bg-white hover:shadow-lg hover:shadow-gray-500 transition-all"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt="item image"
                    width={100}
                    height={100}
                    className="rounded-lg mx-auto w-full h-auto"
                    priority
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};

export default MenuItemList;
