// "use client";
import TestContent from "@/components/menu-items/TestContent";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/category";
import React from "react";

type Props = {};

const TestPage = async (props: Props) => {
  const connection = await dbConnect();
  //   // console.log("NewItemPage connection", connection);

  const categoriesFrmDb = await Category.find();
  const categories: { id: string; name: string }[] = categoriesFrmDb.map(
    (c) => ({
      id: c._id.toString(),
      name: c.name,
    })
  );
  console.log("TestPage cateogries", categories);
  return (
    <section className="section flex flex-col">
      <h1>Test Page</h1>
      <TestContent categories={categories} />
    </section>
  );
};

export default TestPage;
