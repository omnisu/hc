import { cn } from "@/lib/styles";
import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import {
  XIcon,
  InfoIcon,
  CheckCircleIcon,
  TriangleAlertIcon,
  CircleXIcon,
  type LucideIcon,
} from "lucide-react";

export const toastManager = ToastPrimitive.createToastManager();

const toastTypeToIcon: Record<string, LucideIcon> = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: TriangleAlertIcon,
  error: CircleXIcon,
};

export function ToastProvider() {
  return (
    <ToastPrimitive.Provider toastManager={toastManager}>
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport className="fixed bottom-4 left-1/2 z-200 mx-auto flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 flex-col items-center gap-2 sm:bottom-6">
          <ToastList />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  );
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager();

  return toasts.map((toast) => {
    const Icon = toast.type ? toastTypeToIcon[toast.type] : undefined;

    return (
      <ToastPrimitive.Root
        key={toast.id}
        toast={toast}
        swipeDirection="down"
        data-type={toast.type}
        className={cn(
          "group/toast",
          "[--gap:0.75rem] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.05)))] [--shrink:calc(1-var(--scale))] [--height:var(--toast-frontmost-height,var(--toast-height))]",
          "[--offset-y:calc(var(--toast-offset-y)+(var(--toast-index)*var(--gap)))]",

          "absolute right-0 bottom-0 left-0 z-[calc(1000-var(--toast-index))] mx-auto max-w-md origin-bottom",

          "transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))))_scale(var(--scale))]",

          "rounded-lg p-4 shadow-lg bg-surface border border-[color-mix(in_oklab,var(--surface)_100%,black_10%)] dark:border-[color-mix(in_oklab,var(--surface)_100%,white_15%)]",

          "data-[type=info]:bg-info data-[type=info]:border-[color-mix(in_oklab,var(--info)_100%,black_10%)] dark:data-[type=info]:border-[color-mix(in_oklab,var(--info)_100%,white_15%)]",
          "data-[type=success]:bg-success data-[type=success]:border-[color-mix(in_oklab,var(--success)_100%,black_10%)] dark:data-[type=success]:border-[color-mix(in_oklab,var(--success)_100%,white_15%)]",
          "data-[type=warning]:bg-warning data-[type=warning]:border-[color-mix(in_oklab,var(--warning)_100%,black_10%)] dark:data-[type=warning]:border-[color-mix(in_oklab,var(--warning)_100%,white_15%)]",
          "data-[type=error]:bg-destructive data-[type=error]:border-[color-mix(in_oklab,var(--destructive)_100%,black_20%)] dark:data-[type=error]:border-[color-mix(in_oklab,var(--destructive)_100%,white_15%)]",

          "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",

          "data-ending-style:opacity-0",
          "data-limited:opacity-0",

          "data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(-1*var(--offset-y)+var(--toast-swipe-movement-y)))_scale(1)]",

          "data-starting-style:transform-[translateY(calc(100%+var(--gap)))]",
          "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(calc(100%+var(--gap)))]",

          "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%))]",
          "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%))]",
          "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-110%))_translateY(calc(-1*var(--offset-y)))]",
          "data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-110%))_translateY(calc(-1*var(--offset-y)))]",
          "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+110%))_translateY(calc(-1*var(--offset-y)))]",
          "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+110%))_translateY(calc(-1*var(--offset-y)))]",

          "h-(--height) data-expanded:h-(--toast-height)",
          "[transition:transform_0.4s_cubic-bezier(0.25,1,0.5,1),opacity_0.4s,height_0.2s]",
          "select-none",
        )}
      >
        <ToastPrimitive.Content
          className={cn(
            "overflow-hidden transition-opacity duration-200 relative",
            "data-behind:pointer-events-none data-behind:opacity-0",
            "data-expanded:pointer-events-auto data-expanded:opacity-100",

            Icon &&
              "group-data-type/toast:grid group-data-type/toast:grid-cols-[auto_1fr] group-data-type/toast:gap-x-2.5 pr-6",
          )}
        >
          {Icon && (
            <div
              className={cn(
                "row-span-2 translate-y-0.5 text-current",
                "group-data-[type=info]/toast:text-info-foreground",
                "group-data-[type=success]/toast:text-success-foreground",
                "group-data-[type=warning]/toast:text-warning-foreground",
                "group-data-[type=error]/toast:text-destructive-foreground",
              )}
            >
              <Icon className="size-5 shrink-0" />
            </div>
          )}

          <ToastPrimitive.Title
            className={cn(
              "text-base font-medium",
              "text-surface-foreground",
              "group-data-[type=info]/toast:text-info-foreground",
              "group-data-[type=success]/toast:text-success-foreground",
              "group-data-[type=warning]/toast:text-warning-foreground",
              "group-data-[type=error]/toast:text-destructive-foreground",
            )}
          />

          <ToastPrimitive.Description
            className={cn(
              "text-sm",
              "text-surface-foreground/80",
              "group-data-[type=info]/toast:text-info-foreground/80",
              "group-data-[type=success]/toast:text-success-foreground/80",
              "group-data-[type=warning]/toast:text-warning-foreground/80",
              "group-data-[type=error]/toast:text-destructive-foreground/80",
            )}
          />

          <ToastPrimitive.Close
            className={cn(
              "absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-sm cursor-pointer border-none bg-transparent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none focus-visible:ring-offset-0",
              "text-surface-foreground/60 hover:bg-secondary/40 dark:hover:bg-secondary/30 hover:text-surface-foreground",
              "group-data-[type=info]/toast:text-info-foreground/60 group-data-[type=info]/toast:hover:bg-info-foreground/10 group-data-[type=info]/toast:hover:text-info-foreground",
              "group-data-[type=success]/toast:text-success-foreground/60 group-data-[type=success]/toast:hover:bg-success-foreground/10 group-data-[type=success]/toast:hover:text-success-foreground",
              "group-data-[type=warning]/toast:text-warning-foreground/60 group-data-[type=warning]/toast:hover:bg-warning-foreground/10 group-data-[type=warning]/toast:hover:text-warning-foreground",
              "group-data-[type=error]/toast:text-destructive-foreground/60 group-data-[type=error]/toast:hover:bg-destructive-foreground/10 group-data-[type=error]/toast:hover:text-destructive-foreground",
            )}
            aria-label="Close"
          >
            <XIcon className="h-4 w-4" />
          </ToastPrimitive.Close>
        </ToastPrimitive.Content>
      </ToastPrimitive.Root>
    );
  });
}
