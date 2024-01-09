"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createOrUpdateCategory } from "@/lib/categoryActions";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

type Props = {
  focusedCategory: {
    id?: string;
    name?: string;
  };
  setFocusedCategory: React.Dispatch<React.SetStateAction<{}>>;
};

const CreateEditCategory = ({ focusedCategory, setFocusedCategory }: Props) => {
  console.log("focusedCategory", focusedCategory);
  console.log("focusedCategory.id", focusedCategory.id);

  const bindId = focusedCategory.id ? focusedCategory.id : null;
  const createCategoryWithId = createOrUpdateCategory.bind(null, bindId);

  const [state, dispatch] = useFormState(createCategoryWithId, {
    isError: false,
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFocusedCategory((prev) => ({ ...prev, [name]: value }));
  };

  const isNew = !focusedCategory.id;

  console.log("CreateEditCategory isNew = ", isNew);
  console.log("CreateEditCategory categoryState", focusedCategory);
  console.log("state", state);

  useEffect(() => {
    if (
      !state.isError &&
      state.message === "Category has been created successfully."
    ) {
      setFocusedCategory({
        id: "",
        name: "",
      });
    }
    if (state.isError) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div>
      <form action={dispatch} className="min-w-[512px]">
        <label htmlFor="name" className="text-sm text-gray-500 capitalize">
          {`${isNew ? "New " : " "}category name`}
        </label>
        <div className="flex flex-col sm:flex-row gap-4 ">
          <Input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            value={(focusedCategory as any).name || ""}
            className="dark:bg-gray-700"
          />
          <div className="flex gap-4 ">
            <Button
              type="submit"
              variant={"outline"}
              className="capitalize hover:border-primary text-primary hover:text-primary"
            >
              {isNew ? "create" : "update"}
            </Button>
            <Button
              type="button"
              onClick={() => setFocusedCategory({})}
              variant={"outline"}
              className="capitalize"
            >
              cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEditCategory;
