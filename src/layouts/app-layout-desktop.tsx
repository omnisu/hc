import { Button } from "@/ui/button";
import { Sidebar, useSidebar } from "@/ui/sidebar";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ExpandIcon,
  HomeIcon,
  PlusIcon,
  StarIcon,
} from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function AppLayoutDesktop(props: Props) {
  return (
    <Sidebar insetContent={props.children}>
      <Sidebar.Header>
        <div className="flex gap-2 items-center whitespace-nowrap w-full overflow-hidden">
          <div className="flex size-9 bg-primary rounded-lg items-center justify-center font-bold shrink-0">
            HO
          </div>

          <span className="text-lg font-semibold">HelloOmnisu</span>
        </div>
      </Sidebar.Header>

      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Test Item</Sidebar.GroupLabel>
          <Sidebar.GroupAction>
            <PlusIcon /> <span className="sr-only">Add Project</span>
          </Sidebar.GroupAction>

          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton href="/">
                <HomeIcon /> Home
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>

            <Sidebar.MenuItem>
              <Sidebar.MenuButton href="/design-system">
                <StarIcon /> Design System
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>

            <Sidebar.MenuItem>
              <Sidebar.Collapsible
                renderTrigger={
                  <Sidebar.MenuButton>
                    <ExpandIcon /> Collapsible
                  </Sidebar.MenuButton>
                }
              >
                <Sidebar.MenuButton size="sm">Item 1</Sidebar.MenuButton>
                <Sidebar.MenuButton size="sm" href="/design-system">
                  Item 2
                </Sidebar.MenuButton>
                <Sidebar.MenuButton size="sm">Item 3</Sidebar.MenuButton>
                <Sidebar.MenuButton size="sm">Item 4</Sidebar.MenuButton>
              </Sidebar.Collapsible>
            </Sidebar.MenuItem>

            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <StarIcon /> Testim
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>

      <Sidebar.Footer>
        <SidebarToggle />
      </Sidebar.Footer>
    </Sidebar>
  );
}

function SidebarToggle() {
  const { expanded, setExpanded } = useSidebar();

  return (
    <Button
      variant="ghost"
      onClick={() => {
        if (!expanded) setExpanded(true);
        else setExpanded(false);
      }}
    >
      {expanded ? (
        <>
          <ArrowLeftIcon />
          <span className="sr-only">Collapse</span>
        </>
      ) : (
        <>
          <ArrowRightIcon />
          <span className="sr-only">Expand</span>
        </>
      )}
    </Button>
  );
}
