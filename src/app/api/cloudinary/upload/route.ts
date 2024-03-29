import {
  saveImageLinkByEmailToMongoDB,
  uploadImageToCloudinary,
} from "@/lib/cloudinaryActions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();
  //   console.log("data", data);

  if (!data.get("file")) {
    return NextResponse.json({ sucess: false });
  }

  const file = data.get("file") as File;
  if (!file) {
    return NextResponse.json({ sucess: false });
  }

  const imageLinkObject = await uploadImageToCloudinary(file);
  const email = data.get("email")?.toString();

  if (email) {
    const user = await saveImageLinkByEmailToMongoDB(
      imageLinkObject.image,
      email
    );
    // console.log("after uploading image, user", user);

    return NextResponse.json(user);
  } else {
    return NextResponse.json(imageLinkObject);
  }
}
