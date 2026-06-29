import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/styles";
import { Button } from "../button";
import type { ReactElement, ReactNode } from "react";

interface DialogFullscreenProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (newOpen: boolean) => void;

  disableEscapeDismissal?: boolean;
}

export function DialogFullscreen({
  disableEscapeDismissal = true,
  ...props
}: DialogFullscreenProps) {
  return (
    <DialogPrimitive.Root
      data-slot="dialog"
      open={props.open}
      onOpenChange={(newOpen, details) => {
        if (disableEscapeDismissal && details.reason === "escape-key") {
          details.cancel();
          return;
        }
        props.onOpenChange?.(newOpen);
      }}
    >
      {props.children}
    </DialogPrimitive.Root>
  );
}

interface DialogFullscreenTriggerProps {
  render: ReactElement;
  className?: string;
}

function DialogFullscreenTrigger(props: DialogFullscreenTriggerProps) {
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      className={props.className}
      render={props.render}
    />
  );
}

interface DialogFullscreenCloseProps {
  render: ReactElement;
  className?: string;
}

function DialogFullscreenClose(props: DialogFullscreenCloseProps) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      className={props.className}
      render={props.render}
    />
  );
}

interface DialogFullscreenContentProps {
  children: ReactNode;
  showCloseButton?: boolean;
  className?: string;
}

function DialogFullscreenContent({
  showCloseButton = true,
  ...props
}: DialogFullscreenContentProps) {
  return (
    <DialogPrimitive.Portal data-slot="dialog-portal">
      <DialogPrimitive.Backdrop
        data-slot="dialog-overlay"
        className="fixed inset-0 isolate z-50 bg-black/40 dark:bg-black/60 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
      />

      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "h-svh overflow-auto",
          "fixed top-0 left-0 z-50 w-full bg-surface text-base text-surface-foreground shadow-xl duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          props.className,
        )}
      >
        {props.children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-1 right-1 text-surface-foreground/60 hover:bg-secondary/40 dark:hover:bg-secondary/30 hover:text-surface-foreground focus-visible:ring-offset-0"
                size="icon"
              >
                <XIcon className="h-4.5 w-4.5" />
                <span className="sr-only">Close</span>
              </Button>
            }
          />
        )}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

DialogFullscreen.Trigger = DialogFullscreenTrigger;
DialogFullscreen.Close = DialogFullscreenClose;
DialogFullscreen.Content = DialogFullscreenContent;
