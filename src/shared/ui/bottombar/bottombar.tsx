import type { ReactNode } from "react";

interface BottombarProps {
  children: ReactNode;
}

export function Bottombar(props: BottombarProps) {
  return <div>{props.children}</div>;
}

interface BottombarInsetProps {
  children: ReactNode;
}

function BottombarInset(props: BottombarInsetProps) {
  return <div>{props.children}</div>;
}

interface BottombarBarProps {
  children: ReactNode;
}

function BottombarBar(props: BottombarBarProps) {
  return (
    <div className="absolute left-0 right-0 bottom-0 border-t">
      <div className="pb-safe-4 pl-safe-4 pr-safe-4 pt-4 flex justify-around items-center">
        {props.children}
      </div>
    </div>
  );
}

function BottombarItem() {
  return <span>Item</span>;
}

Bottombar.Inset = BottombarInset;
Bottombar.Bar = BottombarBar;
Bottombar.Item = BottombarItem;
