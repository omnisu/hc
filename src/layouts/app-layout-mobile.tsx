import { Bottombar } from "@/ui/bottombar";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function AppLayoutMobile(props: Props) {
  return (
    <Bottombar>
      <Bottombar.Inset>{props.children}</Bottombar.Inset>

      <Bottombar.Bar>
        <Bottombar.Item />
        <Bottombar.Item />
        <Bottombar.Item />
        <Bottombar.Item />
        <Bottombar.Item />
      </Bottombar.Bar>
    </Bottombar>
  );
}
