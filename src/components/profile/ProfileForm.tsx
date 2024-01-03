"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { cn, phoneRegex } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid Number!")
    .min(10, { message: "Must be a valid mobile number" })
    .max(14, { message: "Must be a valid mobile number" }),
  street: z.string().min(3, { message: "Must be a valid street address" }),
  city: z.string().min(3, { message: "Must be a valid city" }),
  postcode: z
    .string()
    .regex(new RegExp(/^[0-9]{4}$/), { message: "Invalid Post code!" }),
  country: z.string().min(3, { message: "Invalid country!" }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

type Props = {
  user?: {
    name: string;
    email: string;
    image: string;
    phone: string;
    streetAddress: string;
    city: string;
    postcode: string;
    country: string;
    role: string;
  };
};

export function ProfileForm({ user }: Props) {
  const [userData, setUserData] = useState({
    userName: user?.name,
    userImage: user?.image,
    phone: user?.phone,
    streetAddress: user?.streetAddress,
    city: user?.city,
    postcode: user?.postcode,
    country: user?.country,
    role: user?.role,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // console.log(e);

    const files = e.target.files;
    if (files && files.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
          headers: {
            // "Content-Type": "multipart/form-data",
          },
        });

        if (response.ok) {
          const user = await response.json();
          //   setUserImage(user.image);
          setUserData((prev) => ({ ...prev, userImage: user.image }));
        }

        console.log("handled File-change user: ", user);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex justify-center items-start gap-8 mt-12 max-w-5xl">
      <div className="flex flex-col items-center">
        <Image
          src={userData.userImage ? userData.userImage : "/images/profile.jpg"}
          width={110}
          height={110}
          alt="avatar"
          className="rounded-lg mb-2 "
        />
        <label className="w-full">
          <input
            id="image"
            name="image"
            type="file"
            className="hidden"
            onChange={(e) => handleFileChange(e)}
          />
          <span className="block border border-gray-300 rounded-lg p-2 text-center text-gray-400 cursor-pointer">
            Edit
          </span>
        </label>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              console.log("field", field);

              return (
                <FormItem>
                  <FormLabel htmlFor="username">Full name</FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      type="text"
                      placeholder="First and last name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              console.log("field", field);

              return (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      disabled
                      placeholder="text@examples.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => {
              console.log("field", field);

              return (
                <FormItem>
                  <FormLabel htmlFor="phone">Phone number</FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => {
              console.log("field", field);

              return (
                <FormItem>
                  <FormLabel htmlFor="street">Street address</FormLabel>
                  <FormControl>
                    <Input
                      id="street"
                      type="text"
                      placeholder="your address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex gap-16">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => {
                console.log("field", field);

                return (
                  <FormItem>
                    <FormLabel htmlFor="city">City</FormLabel>
                    <FormControl>
                      <Input
                        id="city"
                        type="text"
                        placeholder="City"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => {
                console.log("field", field);

                return (
                  <FormItem>
                    <FormLabel htmlFor="postcode">Postcode</FormLabel>
                    <FormControl>
                      <Input
                        id="postcode"
                        type="text"
                        placeholder="Post code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => {
              console.log("field", field);

              return (
                <FormItem>
                  <FormLabel htmlFor="country">Country</FormLabel>
                  <FormControl>
                    <Input
                      id="country"
                      type="text"
                      placeholder="Country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit">Update profile</Button>
        </form>
      </Form>
    </div>
  );
}
