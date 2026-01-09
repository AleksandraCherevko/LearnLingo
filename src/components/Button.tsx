import css from "./Button.module.css";
import clsx from "clsx";

type ButtonProps = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

export default function Button({
  onClick,
  type = "button",
  className,
  disabled = false,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(css.button, className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
