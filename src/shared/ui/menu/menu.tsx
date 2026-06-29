import type { ReactNode } from "react";

interface MenuProps {
  children: ReactNode;
}

export function Menu(props: MenuProps) {
  return <div className="flex border p-4 gap-4 items-center overflow-hidden">{props.children}</div>;
}
