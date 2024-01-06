"use client";

import { useSession } from "next-auth/react";
import React from "react";

type Props = {};

const CategoriesPage = (props: Props) => {
  const { data: session, status, update } = useSession();

  const updateSession = async () => {
    await update({
      ...session,
      user: {
        ...session?.user,
        name: "Brother Chui",
      },
    });
  };

  return (
    <div>
      <h2>CategoriesPage</h2>
      <pre>{JSON.stringify(session, null, 4)}</pre>
      <button
        className="border bg-violet-600 text-white rounded px-4 py-2 capitalize"
        onClick={updateSession}
      >
        update session
      </button>
      <button
        className="border bg-violet-600 text-white rounded px-4 py-2 capitalize"
        onClick={() => console.log("session", session)}
      >
        log session
      </button>
    </div>
  );
};

export default CategoriesPage;
