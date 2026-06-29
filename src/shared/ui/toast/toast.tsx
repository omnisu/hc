import type { ReactNode } from "react";
import { toastManager } from "./toast-provider";

type ToastOptions = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export function plain(opts: ToastOptions) {
  toastManager.add({
    title: opts.title,
    description: opts.description,
    type: "plain",
  });
}

export function info(opts: ToastOptions) {
  toastManager.add({
    title: opts.title,
    description: opts.description,
    type: "info",
  });
}

export function success(opts?: ToastOptions) {
  toastManager.add({
    title: opts?.title ?? "Success!",
    description: opts?.description,
    type: "success",
  });
}

export function warning(opts: ToastOptions) {
  toastManager.add({
    title: opts.title,
    description: opts.description,
    type: "warning",
  });
}

export function error(opts: ToastOptions) {
  toastManager.add({
    title: opts.title,
    description: opts.description,
    type: "error",
  });
}
