import { isValidElement, type ReactNode } from "react";

export function getNodeText(node: ReactNode): string {
  if (!node) {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }

  if (typeof node === "object" && "props" in node) {
    if (typeof node.props === "object" && node.props !== null) {
      if ("children" in node.props && isValidElement(node.props.children)) {
        return getNodeText(node.props.children);
      }
    }
  }

  return "";
}
