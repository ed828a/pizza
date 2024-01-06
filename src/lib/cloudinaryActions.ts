import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "./dbConnect";
import User from "@/models/user";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function create(formData: FormData) {
  "use server";
  console.log("call create now");
  const file = formData.get("image") as File;
  const arrayBuffer = await file.arrayBuffer(); // Buffer version file for uploading
  const buffer = new Uint8Array(arrayBuffer);
  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: ["actions-upload-sneakers"],
        },
        function (error, result) {
          // console.log("result", result);
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      )
      .end(buffer);
  });

  console.log("result", result);

  await saveImageLinkToMongoDB(result.secure_url);

  revalidatePath("/profile");
}

export const uploadImageToCloudinary = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer(); // Buffer version file for uploading
  const buffer = new Uint8Array(arrayBuffer);
  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: ["pizza-shop-user"],
        },
        function (error, result) {
          // console.log("result", result);
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      )
      .end(buffer);
  });

  console.log("result", result);
  return { image: result.secure_url };
};

export async function saveImageLinkToMongoDB(imageLink: string) {
  await dbConnect();

  const session: any = await getServerSession(authOptions);

  const update = { image: imageLink };
  console.log("update", update);

  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    update,
    { new: true }
  );
  console.log("user", user);

  return user;
}

export async function saveImageLinkByEmailToMongoDB(
  imageLink: string,
  email?: string
) {
  if (!email) {
    console.log("email is undefined, updating failed");
    return {
      isError: true,
      message: "email is undefined, updating failed",
      imageLink,
    };
  }

  await dbConnect();

  const update = { image: imageLink };
  console.log("update", update);

  const user = await User.findOneAndUpdate({ email: email }, update, {
    new: true,
  });
  console.log("user", user);

  return user;
}

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }

  await dbConnect();

  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return false;
  }
  return user.admin;
}

export async function getAdmin() {
  const session = await getServerSession(authOptions);

  const userEmail = session?.user?.email;
  if (!userEmail) return false;

  await dbConnect();
  const user = await User.findOne({ email: userEmail });
  return !!user.admin;
}
