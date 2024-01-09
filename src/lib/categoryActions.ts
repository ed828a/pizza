"use server";

import { z } from "zod";
import dbConnect from "./dbConnect";
import Category from "@/models/category";
import { revalidatePath } from "next/cache";
import Size from "@/models/size";
import ExtraIngredient from "@/models/extraIngredient";

const categorySchema = z.object({
  name: z.string(),
  // .min(3, { message: "name must be at least 3 characters long." }),
});

export const createOrUpdateCategory = async (
  id: string | null,
  prevState: {
    isError: boolean;
    message: string;
  },
  formData: FormData
) => {
  console.log("createCategory formData", formData);
  const categoryName = formData.get("name");

  console.log("categoryName", categoryName);
  const result = categorySchema.safeParse({ name: categoryName });
  console.log("createCategory result", result);

  if (!result.success) {
    console.log("error", result.error.flatten().fieldErrors);

    return {
      isError: true,
      message: "category name is invalid.",
    };
  }

  console.log("createCategory id", id);

  try {
    await dbConnect();

    let message;
    if (id) {
      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name: categoryName },
        { new: true }
      );
      message = `Category has been updated successfully.`;
    } else {
      const newCategory = await Category.create({ name: categoryName });
      message = `Category has been created successfully.`;
    }

    revalidatePath("/categories");

    return {
      isError: false,
      message,
    };
  } catch (error: any) {
    console.log(error);
    return {
      isError: true,
      message: `${error.message}`,
    };
  }
};

export const deleteOneCategory = async (id: string) => {
  console.log("deleteOneCategory id", id);
  try {
    await dbConnect();
    const result = await Category.findByIdAndDelete(id);
    revalidatePath("/categories");
  } catch (error: any) {
    console.log("error", error.message);
  }
};

const sizeSchema = z.object({
  name: z.string(),
  // .min(3, { message: "name must be at least 3 characters long." }),
  price: z.coerce.number(),
});

export const createOrUpdateSize = async (
  id: string | null,
  prevState: {
    isError: boolean;
    message: string;
  },
  formData: FormData
) => {
  console.log("createOrUpdateSize formData", formData);
  const sizeName = formData.get("name");
  const price = formData.get("price");

  console.log("sizeName", sizeName);
  const result = sizeSchema.safeParse({ name: sizeName, price });
  console.log("createOrUpdateSize result", result);

  if (!result.success) {
    console.log("error", result.error.flatten().fieldErrors);

    return {
      isError: true,
      message: "size name is invalid.",
    };
  }

  console.log("createSize id", id, "price: ", price, "sizeName", sizeName);

  try {
    await dbConnect();

    let message;
    if (id) {
      const updatedSize = await Size.findByIdAndUpdate(
        id,
        { name: sizeName, price: parseInt(price as string) },
        { new: true }
      );
      message = `Size has been updated successfully.`;
    } else {
      const newSize = await Size.create({
        name: sizeName,
        price: parseInt(price as string),
      });
      message = `Size has been created successfully.`;
    }

    revalidatePath("/menu-items/sizes");

    return {
      isError: false,
      message,
    };
  } catch (error: any) {
    console.log(error);
    return {
      isError: true,
      message: `${error.message}`,
    };
  }
};

export const deleteOneSize = async (id: string) => {
  console.log("deleteOneSize id", id);
  try {
    await dbConnect();
    const result = await Size.findByIdAndDelete(id);
    revalidatePath("/menu-items/sizes");
  } catch (error: any) {
    console.log("error", error.message);
  }
};

export const createOrUpdateExtraIngredient = async (
  id: string | null,
  prevState: {
    isError: boolean;
    message: string;
  },
  formData: FormData
) => {
  console.log("createOrUpdateExtraIngredient formData", formData);
  const extraIngredientName = formData.get("name");
  const price = formData.get("price");

  console.log("createOrUpdateExtraIngredient name", extraIngredientName);
  const result = sizeSchema.safeParse({ name: extraIngredientName, price });
  console.log("createOrUpdateExtraIngredient result", result);

  if (!result.success) {
    console.log("error", result.error.flatten().fieldErrors);

    return {
      isError: true,
      message: "ExtraIngredient name is invalid.",
    };
  }

  console.log(
    "createExtraIngredient id",
    id,
    "price: ",
    price,
    "extraIngredientName",
    extraIngredientName
  );

  try {
    await dbConnect();

    let message;
    if (id) {
      const updatedExtraIngredient = await ExtraIngredient.findByIdAndUpdate(
        id,
        { name: extraIngredientName, price: parseInt(price as string) },
        { new: true }
      );
      message = `extraIngredient has been updated successfully.`;
    } else {
      const newExtraIngredient = await ExtraIngredient.create({
        name: extraIngredientName,
        price: parseInt(price as string),
      });
      message = `extraIngredient has been created successfully.`;
    }

    revalidatePath("/menu-items/extra-gredients");

    return {
      isError: false,
      message,
    };
  } catch (error: any) {
    console.log(error);
    return {
      isError: true,
      message: `${error.message}`,
    };
  }
};

export const deleteOneExtraIngredient = async (id: string) => {
  console.log("deleteOneSize id", id);
  try {
    await dbConnect();
    const result = await ExtraIngredient.findByIdAndDelete(id);
    revalidatePath("/menu-items/sizes");
  } catch (error: any) {
    console.log("error", error.message);
  }
};
