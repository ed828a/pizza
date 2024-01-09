"use client";

import React, { ChangeEvent, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import LabelInput from "../share/LabelInput";
import { Button } from "../ui/button";
import { createOrUpdateExtraIngredient } from "@/lib/categoryActions";

type Props = {
  focusedExtraIngredient: {
    id?: string;
    name?: string;
    price?: string;
  };
  setFocusedExtraIngredient: React.Dispatch<React.SetStateAction<{}>>;
};

const CreateExtraIngredient = ({
  focusedExtraIngredient,
  setFocusedExtraIngredient,
}: Props) => {
  console.log("focusedExtraIngredient", focusedExtraIngredient);
  console.log("focusedExtraIngredient.id", focusedExtraIngredient?.id);

  const bindId = focusedExtraIngredient?.id ? focusedExtraIngredient.id : null;
  const createSizeWithId = createOrUpdateExtraIngredient.bind(null, bindId);

  const [state, dispatch] = useFormState(createSizeWithId, {
    isError: false,
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFocusedExtraIngredient((prev) => ({ ...prev, [name]: value }));
  };

  const isNew = !focusedExtraIngredient?.id;

  console.log("CreateEditSize isNew = ", isNew);
  console.log("CreateEditSize focusedSize", focusedExtraIngredient);
  console.log("state", state);

  useEffect(() => {
    if (
      !state.isError &&
      (state.message === "Size has been updated successfully." ||
        state.message === "Size has been created successfully.")
    ) {
      setFocusedExtraIngredient({
        id: "",
        name: "",
        price: "",
      });
      toast.success(state.message);
    }
    if (state.isError) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div>
      <form action={dispatch} className="min-w-[512px]">
        <div className="flex flex-row gap-4 items-end ">
          <LabelInput
            label="name"
            id="name"
            name="name"
            type="text"
            handleChange={handleChange}
            value={(focusedExtraIngredient as any).name || ""}
            className="dark:bg-gray-700"
          />

          <LabelInput
            label="price"
            id="price"
            name="price"
            type="text"
            handleChange={handleChange}
            value={(focusedExtraIngredient as any).price || ""}
            className="dark:bg-gray-700"
          />

          <div className="flex gap-4 ">
            <Button
              type="submit"
              variant={"outline"}
              className="capitalize hover:border-primary text-primary hover:text-primary p-5"
            >
              {isNew ? "create" : "update"}
            </Button>
            <Button
              type="button"
              onClick={() => setFocusedExtraIngredient({})}
              variant={"outline"}
              className="capitalize p-5 hover:border-primary hover:text-primary text-gray-500 "
            >
              cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateExtraIngredient;
