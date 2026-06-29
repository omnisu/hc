import { cn } from "@/lib/styles";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { SidebarContext, useSidebar } from "./sidebar-context";
import { SidebarMenuButton } from "./menu-button";
import { useStoredState } from "@/hooks/use-stored-state";
import * as v from "valibot";
import { SidebarTooltip } from "./sidebar-tooltip";
import { SidebarCollapsible } from "./sidebar-collapsible";

const SIDEBAR_WIDTH = "14rem";
const SIDEBAR_WIDTH_ICON = "3.4rem";

interface SidebarProps {
  children: ReactNode;
  insetContent: ReactNode;
}

export function Sidebar(props: SidebarProps) {
  const [expanded, setExpanded] = useStoredState({
    key: "sidebar-expanded",
    schema: v.boolean(),
    initialValue: true,
  });

  return (
    <SidebarContext.Provider
      value={{
        expanded: expanded,
        setExpanded: setExpanded,
      }}
    >
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          } as CSSProperties
        }
        className="flex min-h-svh w-full"
      >
        {/* Gap for layout spacing */}
        <div
          data-slot="sidebar-gap"
          aria-hidden="true"
          className={cn(
            "w-(--sidebar-width) relative h-svh bg-transparent transition-[width] duration-200 ease-linear",
            !expanded && "w-(--sidebar-width-icon)",
          )}
        />

        {/* Actual sidebar container */}
        <div
          data-slot="sidebar-container"
          className={cn(
            "fixed inset-y-0 z-10 w-(--sidebar-width) bg-sidebar not-has-data-[slot=sidebar-footer]:pb-2 flex flex-col text-sidebar-foreground transition-[width] duration-200 ease-linear left-0 border-r",
            !expanded && "w-(--sidebar-width-icon)",
          )}
        >
          {props.children}
        </div>

        <main
          data-slot="sidebar-inset"
          className="relative flex w-full flex-1 flex-col bg-background"
        >
          {props.insetContent}
        </main>
      </div>
    </SidebarContext.Provider>
  );
}

interface SidebarHeaderProps {
  children: ReactNode;
}

function SidebarHeader(props: SidebarHeaderProps) {
  return (
    <div data-slot="sidebar-header" className="flex flex-col gap-2 p-2">
      {props.children}
    </div>
  );
}

interface SidebarFooterProps {
  children: ReactNode;
}

function SidebarFooter(props: SidebarFooterProps) {
  return (
    <div data-slot="sidebar-footer" className="flex flex-col gap-2 p-2">
      {props.children}
    </div>
  );
}

interface SidebarContentProps {
  children: ReactNode;
}

function SidebarContent(props: SidebarContentProps) {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const { expanded } = useSidebar();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    const checkScroll = () => {
      const atBottom = Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 1;
      const atTop = el.scrollTop === 0;
      setIsAtBottom(atBottom);
      setIsAtTop(atTop);
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });

    const observer = new ResizeObserver(checkScroll);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      data-slot="sidebar-content"
      className={cn(
        "no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        expanded && !isAtBottom && "mask-[linear-gradient(to_top,transparent,var(--sidebar)_10%)]",
        expanded && !isAtTop && "mask-[linear-gradient(to_bottom,transparent,var(--sidebar)_10%)]",
        expanded &&
          !isAtBottom &&
          !isAtTop &&
          "mask-[linear-gradient(to_bottom,transparent,var(--sidebar)_10%,var(--sidebar)_90%,transparent)]",
      )}
    >
      <SidebarTooltip.Provider>{props.children}</SidebarTooltip.Provider>
    </div>
  );
}

interface SidebarGroupProps {
  children: ReactNode;
}

function SidebarGroup(props: SidebarGroupProps) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className="relative flex w-full min-w-0 flex-col p-2"
    >
      {props.children}
    </div>
  );
}

interface SidebarGroupLabelProps {
  children: ReactNode;
}

function SidebarGroupLabel(props: SidebarGroupLabelProps) {
  const { expanded } = useSidebar();

  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "flex h-8 shrink-0 items-center px-2 text-xs font-medium text-sidebar-foreground/70 transition-[margin,opacity] duration-200 ease-linear whitespace-nowrap",
        !expanded && "-mt-8 opacity-0",
      )}
    >
      {props.children}
    </div>
  );
}

interface SidebarGroupActionProps {
  children: ReactNode;
}

function SidebarGroupAction({
  children,
  // Third-party components may want to pass some props
  ...props
}: SidebarGroupActionProps) {
  const { expanded } = useSidebar();

  return (
    <ButtonPrimitive
      data-slot="sidebar-group-action"
      className={cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-ring outline-hidden transition-transform hover:bg-secondary focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        !expanded && "hidden",
      )}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
}

interface SidebarMenuProps {
  children: ReactNode;
}

function SidebarMenu(props: SidebarMenuProps) {
  return (
    <ul data-slot="sidebar-menu" data-sidebar="menu" className="flex w-full min-w-0 flex-col gap-1">
      {props.children}
    </ul>
  );
}

interface SidebarMenuItemProps {
  children: ReactNode;
}

function SidebarMenuItem(props: SidebarMenuItemProps) {
  return (
    <li data-slot="sidebar-menu-item" data-sidebar="menu-item" className="group/menu-item relative">
      {props.children}
    </li>
  );
}

Sidebar.Header = SidebarHeader;
Sidebar.Footer = SidebarFooter;
Sidebar.Content = SidebarContent;
Sidebar.Group = SidebarGroup;
Sidebar.GroupLabel = SidebarGroupLabel;
Sidebar.GroupAction = SidebarGroupAction;
Sidebar.Menu = SidebarMenu;
Sidebar.MenuItem = SidebarMenuItem;
Sidebar.MenuButton = SidebarMenuButton;
Sidebar.Collapsible = SidebarCollapsible;
