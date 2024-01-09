"use client";

import React from "react";
import BasicModal from "./BasicModal";
import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  deleteAction: () => void;
};

const DeleteDialog = ({ isOpen, closeModal, deleteAction }: Props) => {
  return (
    <BasicModal open={isOpen} onClose={closeModal}>
      <div className="text-center w-64 px-4">
        <div className="px-8 pt-4">
          <TrashIcon className="mx-auto text-red-500" />
        </div>

        <div className="mx-auto my-4 w-44 ">
          <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this item?
          </p>
        </div>
        <div className="flex gap-8  w-full">
          <button
            onClick={deleteAction}
            className="btn btn-light  w-full  border border-transparent hover:border-primary hover:text-primary rounded-md text-primary"
          >
            Delete
          </button>
          <button
            className="btn btn-light  w-full  border border-transparent rounded-md hover:border-primary hover:text-primary "
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </BasicModal>
  );
};

export default DeleteDialog;
