import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useMediaQuery } from "@/hooks/use-media-query";
import { AppLayoutDesktop } from "../layouts/app-layout-desktop";
import { AppLayoutMobile } from "../layouts/app-layout-mobile";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const Layout = isMobile ? AppLayoutMobile : AppLayoutDesktop;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
