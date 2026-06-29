import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/styles";
import type { ReactNode } from "react";

const buttonVariants = cva(
  [
    // Base styles
    "group/button cursor-pointer inline-flex shrink-0 items-center justify-center transition-all outline-none",

    // Borders
    "border border-transparent bg-clip-padding rounded-lg",

    // Text content
    "font-medium whitespace-nowrap select-none",

    // Focus state
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",

    // Active state
    "active:not-aria-[haspopup]:translate-y-px",

    // Disabled state
    "disabled:pointer-events-none disabled:opacity-50",

    // Invalid state
    "aria-invalid:border-destructive-standalone aria-invalid:ring-3 aria-invalid:ring-destructive-standalone/20 dark:aria-invalid:border-destructive-standalone/50 dark:aria-invalid:ring-destructive-standalone/40",

    // Icons
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary border-[color-mix(in_oklab,var(--primary)_100%,black_10%)] dark:border-[color-mix(in_oklab,var(--primary)_100%,white_15%)] text-primary-foreground hover:bg-[color-mix(in_oklab,var(--primary)_100%,black_10%)] dark:hover:bg-[color-mix(in_oklab,var(--primary)_100%,white_10%)] active:bg-[color-mix(in_oklab,var(--primary)_100%,black_15%)] dark:active:bg-[color-mix(in_oklab,var(--primary)_100%,white_15%)]",

        outline:
          "border-border text-foreground hover:bg-secondary/30 aria-expanded:bg-secondary/40",

        secondary:
          "bg-secondary text-secondary-foreground border border-[color-mix(in_oklab,var(--secondary)_100%,black_5%)] dark:border-[color-mix(in_oklab,var(--secondary)_100%,white_10%)] hover:bg-[color-mix(in_oklab,var(--secondary)_100%,black_5%)] dark:hover:bg-[color-mix(in_oklab,var(--secondary)_100%,white_5%)] active:bg-[color-mix(in_oklab,var(--secondary)_100%,black_10%)] dark:active:bg-[color-mix(in_oklab,var(--secondary)_100%,white_10%)]",

        ghost: "text-foreground hover:bg-secondary/30 aria-expanded:bg-secondary/30",

        destructive:
          "bg-destructive border-[color-mix(in_oklab,var(--destructive)_100%,black_10%)] dark:border-[color-mix(in_oklab,var(--destructive)_100%,white_15%)] text-destructive-foreground hover:bg-[color-mix(in_oklab,var(--destructive)_100%,black_10%)] dark:hover:bg-[color-mix(in_oklab,var(--destructive)_100%,white_10%)] focus-visible:border-destructive-standalone focus-visible:ring-destructive-standalone/20 dark:focus-visible:ring-destructive-standalone/40",

        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-1.5 px-3.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-sm px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 px-2.5 text-[0.8rem] rounded-md in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2 px-4 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 text-lg",

        icon: "size-10 [&_svg:not([class*='size-'])]:size-5",
        "icon-xs":
          "size-6 rounded-sm in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-md in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-12 [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export function Button({ className, children, variant, size, onClick, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={onClick}
      // Third party may want to pass some props (like asChilds, render-props, etc)
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
}
