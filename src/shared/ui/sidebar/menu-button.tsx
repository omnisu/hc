import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { useSidebar } from "./sidebar-context";
import { cn } from "@/lib/styles";
import { Link, useMatchRoute, type LinkProps } from "@tanstack/react-router";
import { SidebarTooltip } from "./sidebar-tooltip";
import { getNodeText } from "@/lib/jsx";

const sidebarMenuButtonVariants = cva(
  [
    "peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left ring-ring outline-hidden transition-[width,height,padding,background,border-color] group-has-data-[sidebar=menu-action]/menu-item:pr-8 focus-visible:ring-2 [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate cursor-pointer whitespace-nowrap",

    // Borders
    "border border-transparent bg-clip-padding",

    // Hover state
    "hover:bg-secondary hover:text-secondary-foreground hover:border-[color-mix(in_oklab,var(--secondary)_100%,white_10%)]",

    // Active state
    "active:bg-[color-mix(in_oklab,var(--secondary)_100%,white_8%)] active:border-[color-mix(in_oklab,var(--secondary)_100%,white_20%)]",

    // Current state
    "data-current:cursor-default data-current:bg-primary data-current:text-primary-foreground data-current:border-[color-mix(in_oklab,var(--primary)_100%,white_20%)]",
  ],
  {
    variants: {
      size: {
        default: "h-9",
        sm: "h-7.5 text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface SidebarMenuButtonProps extends VariantProps<typeof sidebarMenuButtonVariants> {
  children: ReactNode;
  href?: LinkProps["to"];
  useTooltip?: boolean;
}

export function SidebarMenuButton({
  children,
  href,
  size,
  useTooltip = true,
  ...props
}: SidebarMenuButtonProps) {
  const { expanded } = useSidebar();
  const matchRoute = useMatchRoute();

  const Component = href ? Link : ButtonPrimitive;

  const isCurrent = !!(href ? matchRoute({ to: href }) : false);
  const label = getNodeText(children);

  const trigger = (
    <Component
      data-current={isCurrent ? "true" : undefined}
      // oxlint-disable-next-line typescript/no-explicit-any
      to={href as any}
      className={sidebarMenuButtonVariants({
        size: size,
        className: cn(!expanded && "size-9! p-[0.620rem]!"),
      })}
      {...props}
    >
      {children}
    </Component>
  );

  if (!useTooltip) {
    return trigger;
  }

  return (
    <SidebarTooltip.Trigger
      payload={label}
      disabled={expanded}
      render={
        <Component
          data-current={isCurrent ? "true" : undefined}
          // oxlint-disable-next-line typescript/no-explicit-any
          to={href as any}
          className={sidebarMenuButtonVariants({
            size: size,
            className: cn(!expanded && "size-9! p-[0.620rem]!"),
          })}
          {...props}
        >
          {children}
        </Component>
      }
    />
  );
}
