"use server";

import { z } from "zod";
import dbConnect from "./dbConnect";
import User from "@/models/user";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";
import clientPromise from "./mongodbConnection";

const credentialSchema = z.object({
  name: z
    .string()
    .min(3, { message: "name must be at least 3 characters long." }),
  email: z.string().email({ message: "must be a valid email" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 charachters" }),
});

export async function register(
  state: CredentialState | undefined,
  formData: FormData
): Promise<CredentialState> {
  const { name, email, password } = Object.fromEntries(formData);
  console.log("credentials from formData", { name, email, password });
  const validatedFields = credentialSchema.safeParse({ name, email, password });
  console.log("validatedFieds", validatedFields);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      isError: true,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  try {
    await dbConnect();
    const newUser = await User.create({ name, email, password });
    const newObj = JSON.parse(JSON.stringify(newUser));
    delete newObj.password;
    console.log("newUser", newObj);

    return { data: newObj, message: "succeeded!", isError: false };
  } catch (error: any) {
    console.log(error);
    return { message: error.message, isError: true };
  }
}

export type ProfileState = {
  errors?: {
    name?: string[];
    phone?: string[];
    streetAddress?: string[];
    city?: string[];
    postcode?: string[];
    country?: string[];
    role?: string[];
  };
  message?: string | null;
};

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])$/
);
const postcodeRegex = new RegExp(/^[0-9]{4}$/);

const ProfileSchema = z.object({
  name: z
    .string()
    .min(3, { message: "name must be at least 3 characters long." }),
  phone: z.string().regex(phoneRegex, "Invalid Number!"),
  streetAddress: z
    .string()
    .min(3, { message: "streetAddress must be at least 3 characters long." }),
  city: z
    .string()
    .min(3, { message: "city must be at least 3 characters long." }),
  postcode: z.string().regex(postcodeRegex, "Invalid postcode!"),
  country: z
    .string()
    .min(3, { message: "country must be at least 3 characters long." }),
});

export async function updateProfileAction(
  callbackUrl: string,
  email: string,
  prevState: ProfileState,
  formData: FormData
) {
  // Test it out:
  console.log("updateProfileAction formData", formData);
  const rawFormData = Object.fromEntries(formData.entries());
  console.log("updateProfileAction rawFormData", rawFormData);

  // safeParse() will return an object containing either a success or error field.
  const validatedFields = ProfileSchema.safeParse({
    name: formData.get("userName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    streetAddress: formData.get("streetAddress"),
    city: formData.get("city"),
    postcode: formData.get("postcode"),
    country: formData.get("country"),
  });

  console.log("validatedFields ", validatedFields);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update profile.",
    };
  }

  console.log("validatedFields.data", validatedFields.data);

  const role = formData.get("role");
  console.log("role", role);
  if (role) {
    const result = z
      .string()
      .refine((value) => value.length <= 20)
      .safeParse(role);
    if (!result.success)
      return { message: "Role is invalid, Failed to update profile" };
  }

  try {
    const client = await clientPromise;
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

  console.log("callbackUrl", callbackUrl);

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(callbackUrl);
  redirect(callbackUrl); // this is from throw exceptions
}
