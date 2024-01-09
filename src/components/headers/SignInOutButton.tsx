"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";

type Props = {};

const SignInOutButton = (props: Props) => {
  const { data: session, status } = useSession();
  // console.log("SignInOutButton session", session);
  console.log("SignInOutButton status", status);

  return (
    <div className="">
      {session ? (
        <Button onClick={() => signOut()}>Sign out</Button>
      ) : (
        <Button className={""} onClick={() => signIn()}>
          Sign in
        </Button>
      )}
    </div>
  );
};

export default SignInOutButton;
