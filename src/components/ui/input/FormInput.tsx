import type { ComponentProps } from "react";

type FormInputProps = ComponentProps<"input"> & {
  label: string;
};

export function FormInput(props: FormInputProps) {
  const { className, label, ...rest } = props;
  return (
    <label className="group">
      <span className="block ml-2">{label}</span>
      <input
        type="text"
        name="test"
        className={`w-full py-1 px-2 rounded-md border border-gray-400 bg-white text-black ${className}`}
        {...rest}
      />
    </label>
  );
}
