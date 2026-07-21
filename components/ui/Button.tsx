import Link from "next/link";
import {
  type ComponentPropsWithoutRef,
  type MouseEventHandler,
} from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps extends Omit<ComponentPropsWithoutRef<"button">, "onClick"> {
  variant?: ButtonVariant;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-navy hover:bg-gold-light font-semibold",
  secondary:
    "bg-navy text-white hover:bg-navy-light font-semibold",
  outline:
    "border-2 border-gold text-gold hover:bg-gold hover:text-navy font-semibold",
};

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md px-6 py-2.5 text-sm transition-colors duration-200";

  const combined = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combined} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combined} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
