"use client";

import React, { useState } from "react";
import CreateEditCategory from "./CreateEditCategory";
import { Button } from "../ui/button";
import { deleteOneCategory } from "@/lib/categoryActions";
import DeleteDialog from "../share/DeleteDialog";

type Props = {
  categories: any[];
};

function CategoriesContent({ categories }: Props) {
  // console.log("CategoriesContent categories", categories);

  const [focusedCategory, setFocusedCategory] = useState({});
  // console.log("focusedCategory", focusedCategory);

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openModal = () => {
    setIsOpenDialog(true);
  };

  const closeModal = () => {
    setIsOpenDialog(false);
  };

  const deleteAction = async () => {
    console.log("deleteId", deleteId);
    if (deleteId) {
      await deleteOneCategory(deleteId);
    }
    closeModal();
    setDeleteId(null);
  };

  return (
    <div>
      <CreateEditCategory
        focusedCategory={focusedCategory}
        setFocusedCategory={setFocusedCategory}
      />
      <div className="mt-16">
        <h5 className="text-gray-500 capitalize">Available categories</h5>
        <div className="flex flex-col gap-4">
          {categories.length > 0 &&
            categories.map((category) => (
              <div
                key={category.id}
                className="flex justify-between bg-gray-300 px-4 py-2 rounded-lg dark:bg-inherit dark:border  "
              >
                <h3>{category.name}</h3>
                <div className="flex gap-4">
                  <Button
                    onClick={() =>
                      setFocusedCategory({
                        id: category.id,
                        name: category.name,
                      })
                    }
                    type="button"
                    className="bg-gray-300 border text-gray-700 hover:border-primary hover:text-primary hover:bg-inherit hover:dark:bg-inherit"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      setDeleteId(category.id);
                      openModal();
                    }}
                    className="bg-gray-300 border text-gray-700 hover:border-primary hover:text-primary hover:bg-inherit hover:dark:bg-inherit"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <DeleteDialog
        isOpen={isOpenDialog}
        closeModal={closeModal}
        deleteAction={deleteAction}
      />
    </div>
  );
}

export default CategoriesContent;
