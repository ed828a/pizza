"use server";
import { z } from "zod";
import dbConnect from "./dbConnect";
import User from "@/models/user";
import { redirect } from "next/navigation";

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
