// typings.d.ts
import "react";

declare module "@material-tailwind/react" {
  import { ComponentType, HTMLAttributes, ReactNode, MouseEventHandler } from "react";

  // Typography Props Fix
  interface FixedTypographyProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
    variant?: string;
    className?: string;
    color?: string;
    textGradient?: boolean;
  }
  export const Typography: ComponentType<FixedTypographyProps>;

  // Button Props Fix
  interface FixedButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: string;
    size?: string;
    color?: string;
    fullWidth?: boolean;
    ripple?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
  }
  export const Button: ComponentType<FixedButtonProps>;

    // Card Props Fix
  interface FixedCardProps extends HTMLAttributes<HTMLCardElement> {
    children?: ReactNode;
    variant?: string;
    size?: string;
    color?: string;
    fullWidth?: boolean;
    ripple?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
  }
  export const Card: ComponentType<FixedCardProps>;

    // CardBody Props Fix
  interface FixedCardBodyProps extends HTMLAttributes<HTMLCardBodyElement> {
    children?: ReactNode;
    variant?: string;
    size?: string;
    color?: string;
    fullWidth?: boolean;
    ripple?: boolean;
    onClick?: MouseEventHandler<HTMLCardBodyElement>;
    className?: string;
  }
  export const CardBody: ComponentType<FixedCardBodyProps>;

   // Input Props Fix
  interface FixedInputProps extends HTMLAttributes<HTMLInputElement> {
    type?: string;
    placeholder?: string;
    label?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    labelProps?: Record<string, any>;
    containerProps?: Record<string, any>;
    icon?: ReactNode;
    className?: string;
  }
  export const Input: ComponentType<FixedInputProps>;

}
