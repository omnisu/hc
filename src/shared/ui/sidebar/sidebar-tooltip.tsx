import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import type { ReactElement, ReactNode } from "react";

const tooltipHandle = TooltipPrimitive.createHandle<ReactNode>();

export function SidebarTooltip() {
  return <></>;
}

interface SidebarTooltipProviderProps {
  children: ReactNode;
}

function SidebarTooltipProvider(props: SidebarTooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={10} closeDelay={150}>
      {props.children}
      <TooltipPrimitive.Root handle={tooltipHandle}>
        {({ payload }) => (
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Positioner
              side="right"
              sideOffset={9.2}
              className="
                h-(--positioner-height) w-(--positioner-width)
                max-w-(--available-width)
                transition-[top,left,right,bottom,transform]
                duration-200
                ease-out
                data-instant:transition-none
              "
            >
              <TooltipPrimitive.Popup
                className="
                  z-50
                  relative
                  p-1
                  rounded-e-lg
                  border border-l-0 border-border
                  bg-sidebar
                  text-base text-sidebar-foreground
                  origin-left
                  transition-[width,height,opacity,transform]
                  duration-200
                  ease-out
                  data-starting-style:opacity-0 data-starting-style:scale-90
                  data-ending-style:opacity-0 data-ending-style:scale-90
                  data-instant:transition-none
                "
              >
                <TooltipPrimitive.Viewport
                  className="
                    [--viewport-inline-padding:0.5rem]
                    relative
                    h-full w-full
                    overflow-clip
                    px-(--viewport-inline-padding) py-1
                    **:data-previous:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))]
                    **:data-previous:translate-x-0
                    **:data-previous:opacity-100
                    **:data-previous:transition-[translate,opacity]
                    **:data-previous:duration-200
                    **:data-previous:ease-out
                    **:data-current:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))]
                    **:data-current:translate-x-0
                    **:data-current:opacity-100
                    **:data-current:transition-[translate,opacity]
                    **:data-current:duration-200
                    **:data-current:ease-out
                    data-[activation-direction~='up']:[&_[data-current][data-starting-style]]:translate-y-1/2
                    data-[activation-direction~='up']:[&_[data-current][data-starting-style]]:opacity-0
                    data-[activation-direction~='down']:[&_[data-current][data-starting-style]]:-translate-y-1/2
                    data-[activation-direction~='down']:[&_[data-current][data-starting-style]]:opacity-0
                    [[data-instant]_&_[data-previous]]:transition-none
                    [[data-instant]_&_[data-current]]:transition-none
                    data-[activation-direction~='up']:[&_[data-previous][data-ending-style]]:-translate-y-1/2
                    data-[activation-direction~='up']:[&_[data-previous][data-ending-style]]:opacity-0
                    data-[activation-direction~='down']:[&_[data-previous][data-ending-style]]:translate-y-1/2
                    data-[activation-direction~='down']:[&_[data-previous][data-ending-style]]:opacity-0
                  "
                >
                  {payload}
                </TooltipPrimitive.Viewport>
              </TooltipPrimitive.Popup>
            </TooltipPrimitive.Positioner>
          </TooltipPrimitive.Portal>
        )}
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

interface SidebarTooltipTriggerProps {
  render: ReactElement;
  payload: ReactNode;
  disabled?: boolean;
}

function SidebarTooltipTrigger(props: SidebarTooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      handle={tooltipHandle}
      payload={props.payload}
      render={props.render}
      disabled={props.disabled}
    />
  );
}

SidebarTooltip.Trigger = SidebarTooltipTrigger;
SidebarTooltip.Provider = SidebarTooltipProvider;
