import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/styles";
import { Button } from "../button";
import type { ReactElement, ReactNode } from "react";

interface DialogProps {
  children: ReactNode;
}

export function Dialog(props: DialogProps) {
  return <DialogPrimitive.Root data-slot="dialog">{props.children}</DialogPrimitive.Root>;
}

interface DialogTriggerProps {
  render: ReactElement;
  className?: string;
}

function DialogTrigger(props: DialogTriggerProps) {
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      className={props.className}
      render={props.render}
    />
  );
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

interface DialogCloseProps {
  render: ReactElement;
  className?: string;
}

function DialogClose(props: DialogCloseProps) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      className={props.className}
      render={props.render}
    />
  );
}

function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/40 dark:bg-black/60 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

interface DialogContentProps {
  children: ReactNode;
  showCloseButton?: boolean;
  className?: string;
  size?: "default" | "sm" | "lg" | "xl";
}

function DialogContent({ showCloseButton = true, size = "default", ...props }: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          size === "default" && "md:max-w-lg",
          size === "sm" && "md:max-w-md",
          size === "lg" && "md:max-w-xl",
          size === "xl" && "md:max-w-3xl",

          "h-svh overflow-hidden",

          "md:h-fit md:border md:rounded-lg md:max-h-[calc(100svh-2rem)]",

          "fixed top-1/2 left-1/2 z-50 flex flex-col w-full -translate-x-1/2 -translate-y-1/2 bg-surface text-base text-surface-foreground dark:border-[color-mix(in_oklab,var(--surface)_100%,white_15%)] shadow-xl duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
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
    </DialogPortal>
  );
}

interface DialogHeaderProps {
  className?: string;
  children: ReactNode;
}

function DialogHeader(props: DialogHeaderProps) {
  return (
    <div data-slot="dialog-header" className={cn("flex flex-col gap-2 p-4 h-fit", props.className)}>
      {props.children}
    </div>
  );
}

interface DialogBodyProps {
  className?: string;
  children: ReactNode;
}

function DialogBody(props: DialogBodyProps) {
  return (
    <div
      data-slot="dialog-body"
      className={cn("h-full overflow-y-auto px-4 pb-4", props.className)}
    >
      {props.children}
    </div>
  );
}

interface DialogFooterProps {
  className?: string;
  children?: ReactNode; // Optionl, cause footer may be used just for close button
  showCloseButton?: boolean;
}

function DialogFooter({ showCloseButton = false, ...props }: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 border-t border-border bg-secondary/15 p-3 pb-safe-3 sm:flex-row sm:justify-end h-fit",
        props.className,
      )}
    >
      {props.children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline">Close</Button>} />
      )}
    </div>
  );
}

interface DialogTitleProps {
  className?: string;
  children: ReactNode;
}

function DialogTitle(props: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-medium text-surface-foreground", props.className)}
    >
      {props.children}
    </DialogPrimitive.Title>
  );
}

interface DialogDescriptionProps {
  className?: string;
  children: ReactNode;
}

function DialogDescription(props: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        props.className,
      )}
    >
      {props.children}
    </DialogPrimitive.Description>
  );
}

Dialog.Trigger = DialogTrigger;
Dialog.Close = DialogClose;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;
Dialog.Footer = DialogFooter;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
