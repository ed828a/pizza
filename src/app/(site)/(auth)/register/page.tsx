import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <section className="h-full w-full flex justify-center items-center">
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
