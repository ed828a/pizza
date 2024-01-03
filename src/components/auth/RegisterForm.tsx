"use client";

import { register } from "@/lib/serverActions";
import { cn, dancingScript } from "@/lib/utils";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import RegisterSubmitButton from "./RegisterSubmitButton";
import { Button } from "../ui/button";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type Props = {};

const RegisterForm = (props: Props) => {
  const [state, dispatch] = useFormState(register, undefined);
  console.log("RegisterForm state", state);
  const router = useRouter();

  if (state?.data && state.message === "succeeded!") {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return (
    <div className="min-w-80">
      <Card className="bg-gray-100 dark:bg-inherit">
        <CardHeader className="">
          <CardTitle
            className={"flex flex-col justify-center items-center py-4 px-8"}
          >
            <Image
              src="/pizza-logo.png"
              height={80}
              width={100}
              alt="pizza"
              className=""
            />
            <span
              className={cn(
                "capitalize text-primary dark text-5xl grow",
                dancingScript.className
              )}
            >
              register
            </span>
          </CardTitle>
          <CardDescription className="text-gray-500 text-center ">
            {state?.isError ? (
              <div className="flex gap-1">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <span className="text-sm text-red-500">
                  Something went wrong, try again.
                </span>
              </div>
            ) : (
              <span>create your own account</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="flex flex-col gap-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 focus:border-none">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your account name"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your account email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Your secret password"
                />
              </div>
            </div>
            <div className="grow flex justify-between items-center pt-4 ">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  router.push("/");
                }}
                className=""
              >
                Cancel
              </Button>
              <RegisterSubmitButton className={""} />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
