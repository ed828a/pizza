"use client";

import LabelInput from "../share/LabelInput";

type Props = {
  userState: PartialUser;
  setUserState: React.Dispatch<React.SetStateAction<PartialUser>>;
};

const AddressInputs = ({ userState, setUserState }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // console.log("userState", userState);
  // console.log("setUserState", setUserState);

  return (
    <div className="flex flex-col gap-4 mb-4">
      <LabelInput
        label="Phone number"
        id="phone"
        name="phone"
        type="tel"
        value={userState?.phone || "Phone number"}
        handleChange={handleChange}
      />
      <LabelInput
        label="Street address"
        id="streetAddress"
        name="streetAddress"
        type="text"
        value={userState?.streetAddress || "Street address"}
        handleChange={handleChange}
      />

      <div className="flex gap-x-4 ">
        <LabelInput
          label="City"
          id="city"
          name="city"
          type="text"
          placeholder=""
          value={userState?.city || "City"}
          handleChange={handleChange}
        />
        <LabelInput
          label="Postcode"
          id="postcode"
          name="postcode"
          type="text"
          value={userState?.postcode || "Post code"}
          handleChange={handleChange}
        />
      </div>
      <LabelInput
        label="Country"
        id="country"
        name="country"
        type="text"
        value={userState?.country || "Country"}
        handleChange={handleChange}
      />
    </div>
  );
};

export default AddressInputs;
