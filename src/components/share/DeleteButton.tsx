"use client";

import React, { useState } from "react";

type Props = {
  label: string;
  onDelete: () => Promise<void>;
};

const DeleteButton = ({ label, onDelete }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {};

  if (showConfirm) {
    return (
      <div className="">
        <div className="">Are you sure you want to delete?</div>

        <div className="flex gap-2 mt-1">
          <button type="button" onClick={() => setShowConfirm(false)}>
            Cancel
          </button>
          <button type="button" className="primary" onClick={() => onDelete()}>
            Yes, delete!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button type="button" onClick={() => setShowConfirm(true)}>
        {label}
      </button>
    </div>
  );
};

export default DeleteButton;
