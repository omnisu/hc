import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/styles";
import type { ReactNode } from "react";

const alertVariants = cva(
  "group/alert bg-clip-padding relative grid w-full gap-0.5 rounded-lg border px-3 py-2.5 text-left has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default:
          "bg-surface border-[color-mix(in_oklab,var(--surface)_100%,black_10%)] dark:border-[color-mix(in_oklab,var(--surface)_100%,white_15%)] text-surface-foreground *:data-[slot=alert-description]:text-surface-foreground/80 *:[svg]:text-current",

        info: "bg-info border-[color-mix(in_oklab,var(--info)_100%,black_10%)] dark:border-[color-mix(in_oklab,var(--info)_100%,white_15%)] text-info-foreground *:data-[slot=alert-description]:text-info-foreground/80 *:[svg]:text-current",

        success:
          "bg-success border-[color-mix(in_oklab,var(--success)_100%,black_10%)] dark:border-[color-mix(in_oklab,var(--success)_100%,white_15%)] text-success-foreground *:data-[slot=alert-description]:text-success-foreground/80 *:[svg]:text-current",

        warning:
          "bg-warning border-[color-mix(in_oklab,var(--warning)_100%,black_10%)] dark:border-[color-mix(in_oklab,var(--warning)_100%,white_15%)] text-warning-foreground *:data-[slot=alert-description]:text-warning-foreground/80 *:[svg]:text-current",

        destructive:
          "bg-destructive border-[color-mix(in_oklab,var(--destructive)_100%,black_20%)] dark:border-[color-mix(in_oklab,var(--destructive)_100%,white_15%)] text-destructive-foreground *:data-[slot=alert-description]:text-destructive-foreground/80 *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface AlertProps extends VariantProps<typeof alertVariants> {
  className?: string;
  children: ReactNode;
}

export function Alert(props: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant: props.variant }), props.className)}
    >
      {props.children}
    </div>
  );
}

interface AlertTitleProps {
  className?: string;
  children: ReactNode;
}

function AlertTitle(props: AlertTitleProps) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

interface AlertDescriptionProps {
  className?: string;
  children: ReactNode;
}

function AlertDescription(props: AlertDescriptionProps) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-balance md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

interface AlertActionProps {
  className?: string;
  children: ReactNode;
}

function AlertAction(props: AlertActionProps) {
  return (
    <div data-slot="alert-action" className={cn("absolute top-2 right-2", props.className)}>
      {props.children}
    </div>
  );
}

Alert.Title = AlertTitle;
Alert.Description = AlertDescription;
Alert.Action = AlertAction;
