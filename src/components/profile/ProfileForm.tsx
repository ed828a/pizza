"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LabelInput from "../share/LabelInput";
import { Button } from "../ui/button";
import { updateProfileAction } from "@/lib/serverActions";
import { useFormState } from "react-dom";
import Link from "next/link";
import LeftArrow from "../icons/LeftArrow";

type Props = {
  user?: ProfileType;
  callbackUrl: string;
};

const ProfileForm = ({ user, callbackUrl }: Props) => {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [userData, setUserData] = useState({
    email: user?.email,
    userName: user?.name,
    userImage: user?.image,
    phone: user?.phone,
    streetAddress: user?.streetAddress,
    city: user?.city,
    postcode: user?.postcode,
    country: user?.country,
    role: user?.role,
  });

  const initialState = { message: null };

  const updateProfileActionWithEmail = updateProfileAction.bind(
    null,
    callbackUrl,
    user?.email!
  );

  const [state, dispatch] = useFormState(
    updateProfileActionWithEmail,
    initialState
  );
  console.log("state", state);

  console.log("ProfileForm session", session);

  const enableSubmit =
    userData.email !== user?.email ||
    userData.userName !== user?.name ||
    userData.phone !== user?.phone ||
    userData.streetAddress !== user?.streetAddress ||
    userData.city !== user?.city ||
    userData.postcode !== user?.postcode ||
    userData.country !== user?.country ||
    userData.role !== user?.role;

  console.log("enableSubmit", enableSubmit);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log("userData", userData);

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const updateSessionImage = async (image: string) => {
    if (
      session?.user.email &&
      user?.email &&
      session?.user.email === user?.email
    ) {
      console.log("userData.userImage", userData.userImage);
      const updatedSession = await update({ image: image });
      console.log("updatedSession", updatedSession);
      // router.refresh();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // console.log(e);

    const files = e.target.files;
    if (files && files.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      console.log("handleImageChange userData.email", userData.email);
      data.set("email", userData.email!);

      const uploadPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/cloudinary/upload", {
          method: "POST",
          body: data,
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        });

        if (response.ok) {
          const user = await response.json();
          console.log("handleImageChange server returned user", user);
          setUserData((prev) => ({ ...prev, userImage: user.image }));
          resolve(user.image);
        } else {
          reject({ message: "uploading image failed" });
        }
      });

      const result = await toast.promise(uploadPromise, {
        pending: "Uploading...",
        success: "Uploading completed.",
        error: "Uploading failed.",
      });

      // console.log("handleImageChange result", result);
      await updateSessionImage(result as string);
    }
  };

  console.log("ProfileForm userData", userData);
  console.log("ProfileForm user", user);
  const sessionUser = session?.user;
  console.log("ProfileForm sessionUser", sessionUser);

  return (
    <div className="w-full max-w-screen-md flex flex-col transition-all duration-500  ">
      <Link href={callbackUrl} className="self-end mr-8  h-4">
        <LeftArrow className="text-primary w-10 h-6 ml-auto " />
      </Link>

      <div className="flex flex-col sm:flex-row gap-4 items-stretch justify-center ">
        <div className="flex flex-col items-center gap-4 sm:mt-4 flex-grow">
          <Image
            src={
              userData.userImage ? userData.userImage : "/images/profile.jpg"
            }
            width={180}
            height={180}
            alt="avatar"
            className="rounded-lg mb-2 "
          />
          <label className="w-full max-w-[360px]">
            <input
              id="image"
              name="image"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
            <span className="block border border-gray-300 hover:border-primary rounded-lg p-2 text-center text-gray-400 hover:text-primary cursor-pointer">
              Edit
            </span>
          </label>
        </div>
        <div className="flex justify-center items-center px-4">
          <form action={dispatch}>
            <div className="flex flex-col gap-4 sm:p-2">
              <LabelInput
                label="Full name"
                id="username"
                name="userName"
                type="text"
                value={userData.userName || ""}
                handleChange={handleChange}
                placeholder="First and last name"
              />
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <LabelInput
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  disabled={true}
                  defaultValue={userData?.email}
                />
                <LabelInput
                  label="role"
                  id="role"
                  name="role"
                  type="text"
                  disabled={sessionUser?.role !== "admin"}
                  value={userData?.role || "user"}
                  handleChange={handleChange}
                />
              </div>

              <LabelInput
                label=" Phone number"
                id="phone"
                name="phone"
                type="tel"
                value={userData.phone || ""}
                handleChange={handleChange}
                placeholder="Phone number"
              />

              <LabelInput
                label="Street address"
                id="streetAddress"
                name="streetAddress"
                type="text"
                value={userData.streetAddress || ""}
                handleChange={handleChange}
                placeholder="Street address"
              />

              <div className="flex flex-col sm:flex-row gap-4 ">
                <LabelInput
                  label="City"
                  id="city"
                  name="city"
                  type="text"
                  value={userData.city || ""}
                  handleChange={handleChange}
                  placeholder="City"
                />

                <LabelInput
                  label="Postcode"
                  id="postcode"
                  name="postcode"
                  type="text"
                  value={userData.postcode || ""}
                  handleChange={handleChange}
                  placeholder="Postcode"
                />

                <LabelInput
                  label="Country"
                  id="country"
                  name="country"
                  type="text"
                  value={userData.country || ""}
                  handleChange={handleChange}
                  placeholder="Country"
                />
              </div>

              <Button type="submit" disabled={!enableSubmit} className="mt-4">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
