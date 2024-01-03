"use client";

import LinkButton from "./LinkButton";

type Props = {
  admin: boolean;
};

const MemberNav = ({ admin }: Props) => {
  return (
    <div className="hidden mt-8 max-w-4xl mx-auto sm:block">
      <div className="flex flex-wrap md:flex-nowrap justify-center gap-4">
        <LinkButton href="/profile">Profile</LinkButton>
        {admin && (
          <>
            <LinkButton href="/categories">Categories</LinkButton>
            <LinkButton href="/menu-items">Menu Items</LinkButton>
            <LinkButton href="/users">Users</LinkButton>
          </>
        )}
        <LinkButton href="/orders">Orders</LinkButton>
      </div>
    </div>
  );
};

export default MemberNav;
