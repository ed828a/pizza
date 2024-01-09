import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  menuItems: any[];
};

const MenuItemList = ({ menuItems }: Props) => {
  return (
    <div className="min-w-[320px] sm:min-w-[640px] md:min-w-[768px] lg:min-w-[1024px] border">
      <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {menuItems.length > 0
          ? menuItems.map((item: any) => (
              <Link
                key={item.name}
                href={`/menu-items/edit/${item._id}`}
                className="bg-gray-200 p-4 rounded-lg hover:bg-white hover:shadow-lg hover:shadow-gray-500 transition-all"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt="item image"
                    width={100}
                    height={100}
                    className="rounded-lg mx-auto"
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
