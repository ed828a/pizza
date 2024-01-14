"use client";

import BasicModal from "@/components/share/BasicModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

type Props = {};

const DeleteDialogComponent = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="">
      <button className="btn btn-danger" onClick={() => setIsOpen(true)}>
        <TrashIcon /> Delete
      </button>

      <BasicModal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="text-center w-56 px-8">
          <TrashIcon className="mx-auto text-red-500" />
          <div className="mx-auto my-4 w-44">
            <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this item?
            </p>
          </div>
          <div className="flex gap-8  w-full">
            <button className="btn btn-danger  w-full  border hover:border-primary hover:text-primary rounded-md">
              Delete
            </button>
            <button
              className="btn btn-light  w-full  border rounded-md hover:border-primary hover:text-primary "
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </BasicModal>
    </div>
  );
};

export default DeleteDialogComponent;
