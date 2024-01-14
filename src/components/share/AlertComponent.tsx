import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";

type Props = {
  title: string;
  description: string;
};

const AlertComponent = ({ title = "Alert!", description }: Props) => {
  return (
    <section className="section">
      <Alert className="max-w-2xl h-56 flex flex-col justify-between p-12 bg-gray-100">
        <div className="flex justify-center items-center gap-2 ">
          <RocketIcon className="h-4 w-4" style={{ color: "#ff0000" }} />
          <AlertTitle className="text-primary font-semibold text-2xl">
            {title}
          </AlertTitle>
        </div>
        <AlertDescription className="text-center text-xl mb-4">
          {description}
        </AlertDescription>
      </Alert>
    </section>
  );
};

export default AlertComponent;
