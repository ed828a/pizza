import React from "react";

import UserListCell, { UserCellType } from "./UserListCell";

type Props = {
  users: UserCellType[];
};

const UserList = ({ users }: Props) => {
  return (
    <div className="max-w-lg">
      {users.map((user) => (
        <UserListCell key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
