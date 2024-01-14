"use server";
import { z } from "zod";
import dbConnect from "./dbConnect";
import MenuItem from "@/models/MenuItem";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOrUpdateMenuItemAction(
  id: string | null | undefined,
  prevState: { message: string },
  formData: FormData
) {
  // Test it out:
  console.log("createOrUpdateMenuItemAction formData", formData);
  const rawFormData = Object.fromEntries(formData.entries());
  console.log("createOrUpdateMenuItemAction rawFormData", rawFormData);

  const name = formData.get("name");
  const image = formData.get("image");
  const description = formData.get("description");
  const category = formData.get("category");
  const basePrice = formData.get("basePrice");
  const bestSeller = formData.get("bestSeller") === "on";

  const sizesString = formData.get("sizes");
  console.log("sizeString type", typeof sizesString);
  let sizes = [];
  if (typeof sizesString === "string") {
    sizes = JSON.parse(sizesString);
  }

  const extraIngredientsString = formData.get("extraIngredients");
  let extraIngredients = [];
  if (typeof extraIngredientsString === "string") {
    extraIngredients = JSON.parse(extraIngredientsString);
  }

  const page = JSON.parse(formData.get("page") as string);

  console.log({
    id,
    name,
    image,
    description,
    category,
    basePrice,
    bestSeller,
    sizes,
    extraIngredients,
    page,
  });

  let message = "no error";

  try {
    await dbConnect();

    if (id) {
      const updateMenuItem = await MenuItem.findByIdAndUpdate(
        id,
        {
          name,
          image,
          description,
          category,
          basePrice,
          sizes,
          extraIngredients,
          bestSeller,
        },
        { new: true }
      );
      console.log(
        "createOrUpdateMenuItemAction updateMenuItem",
        updateMenuItem
      );
      message = "Menu Item has been successfully updated";
    } else {
      const createdMenuItem = await MenuItem.create({
        name,
        image,
        description,
        category,
        basePrice,
        sizes,
        extraIngredients,
        bestSeller,
      });
      console.log(
        "createOrUpdateMenuItemAction createdMenuItem",
        createdMenuItem
      );
      message = "Menu Item has been successfully updated";
    }
  } catch (error) {
    console.log("error", error);

    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to update profile.",
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/menu-items");
  const callback = page ? (page as string) : "";
  console.log("createOrUpdateMenuItemAction callback", callback);
  redirect(`/menu-items?page=${callback}`); // this is from throw exceptions

  // return { message };
}
