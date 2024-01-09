"use client";

import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

type Props = {
  menuItem: MenuItemType | null;
  setMenuItem: React.Dispatch<React.SetStateAction<MenuItemType | null>>;
};

const MenuItemImageUpload = ({ menuItem, setMenuItem }: Props) => {
  const handleMenuItemImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    // console.log(e);

    const files = e.target.files;
    if (files && files.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/cloudinary/upload", {
          method: "POST",
          body: data,
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        });

        if (response.ok) {
          const imageLink = await response.json();
          console.log("handleImageChange server returned result", imageLink);
          setMenuItem((prev: any) => ({ ...prev, image: imageLink.image }));
          resolve(imageLink.image);
        } else {
          reject({ message: "uploading image failed" });
        }
      });

      const result = await toast.promise(uploadPromise, {
        pending: "Uploading...",
        success: "Uploading completed.",
        error: "Uploading failed.",
      });

      console.log("handleMenuItemImageChange result", result);
    }
  };

  return (
    <div>
      {" "}
      <div className="p-4">
        <div className="flex flex-col justify-between ">
          <div className="flex flex-col items-center">
            <Image
              src={
                menuItem?.image ? menuItem.image : "/images/default_picture.png"
              }
              width={180}
              height={180}
              alt="avatar"
              className="rounded-lg mb-2 "
            />
            <label className="w-full">
              <input
                id="image"
                name="image"
                type="file"
                className="hidden"
                onChange={handleMenuItemImageChange}
              />
              <span className="block border border-gray-300 hover:border-primary rounded-lg p-2 text-center text-gray-400 hover:text-primary cursor-pointer">
                Edit
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemImageUpload;
