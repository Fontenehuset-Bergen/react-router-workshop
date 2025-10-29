import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  isError?: boolean;
  isSuccess?: boolean;
  label: string;
};

export function FormSubmitButton(props: ButtonProps) {
  // Vi henter ut alle variabler vi trenger, resten ligger i "...rest"
  const { isSuccess, isError, label, className, disabled, ...rest } = props;

  const isDisabled = ["submit", "idle"].includes(label.toLowerCase());
  return (
    <button
      disabled={disabled || !isDisabled}
      type="submit"
      className={`p-2 border rounded-md text-white bg-blue-500 hover:bg-blue-400 disabled:bg-gray-300 disabled:text-gray-700 duration-300 ${className}`}
      // Vi kan ligge til resten som vi ikke ønsket å bruke
      {...rest}
    >
      {isSuccess ? "Submitted!" : label}
    </button>
  );
}
