import ExtraGredientsContent from "@/components/categories/ExtraGredientsContent";
import dbConnect from "@/lib/dbConnect";
import ExtraIngredient from "@/models/extraIngredient";
import React from "react";

type Props = {};

const ExtraGredientsPage = async (props: Props) => {
  await dbConnect();

  const extras = await ExtraIngredient.find();
  const extrasArray = extras.map((ex) => {
    // console.log("s", s);
    return {
      id: ex._id.toString() as string,
      name: ex.name as string,
      price: ex.price as string,
    };
  });

  return (
    <section className="section flex flex-col gap-8">
      <ExtraGredientsContent extraIngredients={extrasArray} />
    </section>
  );
};

export default ExtraGredientsPage;
