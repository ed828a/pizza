import UserList from "@/components/users/UserList";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import React from "react";

type Props = {};

const UsersPage = async (props: Props) => {
  await dbConnect();
  const userArray = await User.find();
  const users = userArray
    .map((obj) => obj.toObject())
    .map((item: any, index) => {
      console.log(`item[${index}]:`, item);
      return {
        id: item._id,
        email: item.email,
        name: item.name ? item.name : item.email.split("@")[0],
      };
    });

  return (
    <section className="section">
      <UserList users={users} />
    </section>
  );
};

export default UsersPage;
