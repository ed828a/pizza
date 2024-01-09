"use client";

import { deleteOneExtraIngredient } from "@/lib/categoryActions";
import React, { useState } from "react";
import DeleteDialog from "../share/DeleteDialog";
import { Button } from "../ui/button";
import CreateExtraIngredient from "./CreateExtraIngredient";
import LeftArrow from "../icons/LeftArrow";
import Link from "next/link";

type Props = {
  extraIngredients: { id: string; name: string; price: string }[];
};

const ExtraGredientsContent = ({ extraIngredients }: Props) => {
  const [extraIngredient, setExtraIngredient] = useState({});

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
      await deleteOneExtraIngredient(deleteId);
    }
    closeModal();
    setDeleteId(null);
  };
  return (
    <div className="">
      <Link href={"/menu-items/new-item"} className="self-end mr-8 h-4">
        <LeftArrow className="text-primary w-10 h-6 ml-auto -mb-8 " />
      </Link>
      <CreateExtraIngredient
        focusedExtraIngredient={extraIngredient}
        setFocusedExtraIngredient={setExtraIngredient}
      />
      <div className="mt-16">
        <h5 className="text-gray-500 capitalize">Available Extra Ingredient</h5>
        <div className="flex flex-col gap-4">
          {extraIngredients.length > 0 &&
            extraIngredients
              .sort((a, b) => parseFloat(a.price) - parseFloat(b.price)) // b-a: ascending, a-b: descending
              .map((size) => (
                <div
                  key={size.id}
                  className="grid grid-cols-3 place-items-start items-center bg-gray-100 px-4 py-2 rounded-lg dark:bg-inherit dark:border  "
                >
                  <h3>{size.name}</h3>
                  <h3>${size.price}.00</h3>
                  <div className="flex gap-4 w-full justify-end">
                    <Button
                      onClick={() =>
                        setExtraIngredient({
                          id: size.id,
                          name: size.name,
                          price: size.price,
                        })
                      }
                      type="button"
                      className="bg-gray-100 border text-gray-700 hover:border-primary hover:text-primary hover:bg-inherit hover:dark:bg-inherit w-24"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setDeleteId(size.id);
                        openModal();
                      }}
                      className="bg-gray-100 border text-gray-700 hover:border-primary hover:text-primary hover:bg-inherit hover:dark:bg-inherit w-24"
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
};

export default ExtraGredientsContent;
