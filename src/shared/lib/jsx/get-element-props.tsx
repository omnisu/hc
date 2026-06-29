import { isValidElement, type ReactElement } from "react";

export function getElementProps(element: ReactElement): object {
  if (!isValidElement(element)) {
    return {};
  }

  if ("props" in element && element.props !== null) {
    return element.props || {};
  }

  return {};
}
