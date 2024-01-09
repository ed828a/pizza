import CategoriesContent from "@/components/categories/CategoriesContent";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/category";
import React from "react";

type Props = {};

const CategoriesPage = async (props: Props) => {
  await dbConnect();
  const categories = await Category.find();
  const categoriesArray = categories.map((cat) => {
    // console.log("cat", cat);
    return {
      id: cat._id.toString(),
      name: cat.name,
    };
  });

  return (
    <section className="section">
      <CategoriesContent categories={categoriesArray} />
    </section>
  );
};

export default CategoriesPage;
