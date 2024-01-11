import { TrashIcon } from "@heroicons/react/24/outline";
import React, { ChangeEvent, useEffect, useState } from "react";

type Props = {
  addonLabel: string;
  addon: AddonType;
  editAddon: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  removeAddon: (index: number) => void;
  className: string;
  // setAddons: React.Dispatch<React.SetStateAction<AddonType[]>>;
  index: number;
};

const AddonItem = ({
  addonLabel,
  addon,
  editAddon,
  removeAddon,
  className,
  index,
}: Props) => {
  //   const [addon, setAddon] = useState<AddonType>({ name: "", price: "" });

  return (
    <div className={className}>
      <div className="relative">
        <label
          htmlFor="sizename"
          className="text-gray-400 text-sm absolute top-0 left-2"
        >
          Name
        </label>
        <input
          id="sizename"
          name="name"
          type="text"
          placeholder="Addon name"
          value={addon.name}
          onChange={(e) => {
            editAddon(e, index);
          }}
          className="block w-full my-4 rounded-xl border p-2 border-gray-300 bg-gray-100"
        />
      </div>

      <div className="relative">
        <label
          htmlFor="sizeprice"
          className="text-gray-400 text-sm absolute top-0 left-2"
        >
          Extra price
        </label>
        <input
          id="sizeprice"
          name="price"
          type="text"
          placeholder="Extra price"
          value={addon.price}
          onChange={(e) => {
            editAddon(e, index);
          }}
          className="block w-full my-4 rounded-xl border p-2 border-gray-300 bg-gray-100"
        />
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => removeAddon(index)}
          className="bg-gray-100 w-10 p-1 rounded-lg border border-gray-300 hover:border-primary "
        >
          <TrashIcon className="text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default AddonItem;
