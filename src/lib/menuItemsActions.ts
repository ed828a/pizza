"use server";
import { z } from "zod";
import dbConnect from "./dbConnect";
import MenuItem from "@/models/MenuItem";

export async function createOrUpdateMenuItemAction(
  id: string | null | undefined,
  prevState: ProfileState,
  formData: FormData
) {
  // Test it out:
  console.log("createOrUpdateMenuItemAction formData", formData);
  const rawFormData = Object.fromEntries(formData.entries());
  console.log("createOrUpdateMenuItemAction rawFormData", rawFormData);

  try {
    await dbConnect();
    if (id) {
      const updateMenuItem = await MenuItem.findByIdAndUpdate();
    } else {
    }
    const result = await client
      .db(process.env.DATABASE_NAME)
      .collection("users")
      .updateOne({ email }, { $set: { ...validatedFields.data } });

    console.log("updateProfileAction result", result);

    // console.log("updateProfileAction user", user);
    const session: any = await getServerSession(authOptions);
    console.log("updateProfileAction session", session);
  } catch (error) {
    console.log("error", error);

    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to update profile.",
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/menu-items");
  redirect("/menu-items"); // this is from throw exceptions
}
