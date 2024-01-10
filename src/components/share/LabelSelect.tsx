import React from "react";

type Props = {
  label: string;
  id: string;
  name: string;
  value?: string | undefined;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  opions: { id: string; name: string }[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string | undefined;
};

const LabelSelect = ({
  label,
  id,
  name,
  value,
  handleChange,
  opions,
  className,
  placeholder,
  disabled,
  defaultValue,
}: Props) => {
  return (
    <div className="relative pt-1">
      <label
        htmlFor="category"
        className="text-gray-400 text-sm absolute top-0 left-2"
      >
        {label}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        required
        className={className}
      >
        <option value="">choose a category</option>
        {opions.length > 0 &&
          opions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default LabelSelect;
