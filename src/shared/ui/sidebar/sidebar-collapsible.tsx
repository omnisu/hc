import { Collapsible } from "@base-ui/react/collapsible";
import { cloneElement, useState, type ReactElement, type ReactNode } from "react";
import { useSidebar } from "./sidebar-context";
import { SidebarTooltip } from "./sidebar-tooltip";
import { getElementProps, getNodeText } from "@/lib/jsx";
import { cva } from "class-variance-authority";
import { Link } from "@tanstack/react-router";
import { Button as ButtonPrimitive } from "@base-ui/react/button";

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

interface SidebarCollapsibleProps {
  renderTrigger: ReactElement;
  children: ReactNode;
}

export function SidebarCollapsible(props: SidebarCollapsibleProps) {
  const { expanded } = useSidebar();
  const [open, setOpen] = useState(false);

  const trigger = cloneElement(props.renderTrigger, {
    useTooltip: false,
  });

  console.log(trigger);

  const childrenArray: ReactElement[] = Array.isArray(props.children)
    ? props.children
    : [props.children];
  const childrenAsProps = childrenArray.map(getElementProps);

  return (
    <Collapsible.Root open={expanded ? open : false} onOpenChange={expanded ? setOpen : undefined}>
      <Collapsible.Trigger
        render={
          expanded ? (
            trigger
          ) : (
            <SidebarTooltip.Trigger
              render={trigger}
              payload={
                <div className="flex flex-col -mx-1.5 -my-0.5">
                  {childrenAsProps.map((props, i) =>
                    "href" in props && typeof props.href === "string" ? (
                      // oxlint-disable-next-line typescript/no-explicit-any
                      <Link key={i} {...(props as any)} className={sidebarMenuButtonVariants()} />
                    ) : (
                      <ButtonPrimitive key={i} {...props} className={sidebarMenuButtonVariants()} />
                    ),
                  )}
                </div>
              }
            />
          )
        }
      />

      <Collapsible.Panel className="flex h-(--collapsible-panel-height) flex-col justify-end overflow-hidden text-sm transition-[height] duration-150 ease-[ease-out] [&[hidden]:not([hidden='until-found'])]:hidden data-ending-style:h-0 data-starting-style:h-0">
        <div className="border-l-2 pl-2 ml-2">{props.children}</div>
      </Collapsible.Panel>
    </Collapsible.Root>
  );
}
