import { useTheme } from "@/lib/themes";
import { Alert } from "@/ui/alert";
import { Button } from "@/ui/button";
import { Dialog, DialogFullscreen } from "@/ui/dialog";
import { toast } from "@/ui/toast";
import { createFileRoute } from "@tanstack/react-router";
import {
  BalloonIcon,
  ComputerIcon,
  FileQuestionIcon,
  MoonIcon,
  MouseIcon,
  StarIcon,
  SunIcon,
  TriangleAlertIcon,
} from "lucide-react";

export const Route = createFileRoute("/design-system")({
  component: RouteComponent,
});

function RouteComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-4">
      <div className="p-4 border rounded-md mt-6">
        <span className="bg-background -mt-8 px-2 w-fit block">App Theme</span>
        <div className="flex gap-2 flex-wrap mt-2">
          <Button
            variant={theme === "system" ? undefined : "outline"}
            onClick={() => setTheme("system")}
          >
            <ComputerIcon />
            System
          </Button>
          <Button
            variant={theme === "light" ? undefined : "outline"}
            onClick={() => setTheme("light")}
          >
            <SunIcon />
            Light
          </Button>
          <Button
            variant={theme === "dark" ? undefined : "outline"}
            onClick={() => setTheme("dark")}
          >
            <MoonIcon />
            Dark
          </Button>
        </div>
      </div>

      <div className="p-4 border rounded-md mt-6">
        <span className="bg-background -mt-8 px-2 w-fit block">Button variants</span>
        <div className="flex gap-2 flex-wrap mt-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div className="p-4 border rounded-md mt-6">
        <span className="bg-background -mt-8 px-2 w-fit block">Button sizes</span>
        <div className="flex gap-2 flex-wrap mt-2">
          <Button size="lg">Large</Button>
          <Button size="icon-lg">
            <StarIcon />
          </Button>
          <Button size="default">Default</Button>
          <Button size="icon">
            <BalloonIcon />
          </Button>
          <Button size="sm">Small</Button>
          <Button size="icon-sm">
            <TriangleAlertIcon />
          </Button>
          <Button size="xs">Extra-small</Button>
          <Button size="icon-xs">
            <MouseIcon />
          </Button>
        </div>
      </div>

      <div className="p-4 border rounded-md mt-6">
        <span className="bg-background -mt-8 px-2 w-fit block">Toasts</span>
        <div className="flex gap-2 flex-wrap mt-2">
          <Button onClick={() => toast.plain({ title: "Hello", description: "World" })}>
            Toast (plain)
          </Button>
          <Button onClick={() => toast.info({ title: "Info", description: "Something happend" })}>
            Toast (info)
          </Button>
          <Button
            onClick={() => toast.success({ title: "Success", description: "Completely done" })}
          >
            Toast (success)
          </Button>
          <Button onClick={() => toast.success()}>Toast (success without params)</Button>
          <Button
            onClick={() => toast.warning({ title: "Warning", description: "You shall not pass" })}
          >
            Toast (warning)
          </Button>
          <Button onClick={() => toast.error({ title: "Error", description: "Она тебя сожрала" })}>
            Toast (error)
          </Button>
        </div>
      </div>

      <div className="p-4 border rounded-md mt-6">
        <span className="bg-background -mt-8 px-2 w-fit block">Dialogs</span>
        <div className="flex gap-2 flex-wrap mt-2">
          <Dialog>
            <Dialog.Trigger render={<Button>Trigger mode + long content</Button>} />

            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Just dialog</Dialog.Title>
                <Dialog.Description>Just description</Dialog.Description>
              </Dialog.Header>

              <Dialog.Body>
                {Array.from({ length: 50 }).map((_, i) => (
                  <span key={i} className="block">
                    Hello-{i + 1}
                  </span>
                ))}
              </Dialog.Body>

              <Dialog.Footer showCloseButton />
            </Dialog.Content>
          </Dialog>

          <DialogFullscreen>
            <DialogFullscreen.Trigger render={<Button>Fullscreen Dialog</Button>} />

            <DialogFullscreen.Content>
              <div className="p-4 text-4xl">
                {Array.from({ length: 50 }).map((_, i) => (
                  <h1 key={i} className="block">
                    Fullscreen Dialog {i + 1}
                  </h1>
                ))}
              </div>
            </DialogFullscreen.Content>
          </DialogFullscreen>
        </div>
      </div>

      <div className="p-4 border rounded-md mt-6">
        <span className="bg-background -mt-8 px-2 w-fit block">Alerts</span>
        <div className="flex gap-2 flex-wrap mt-2">
          <Alert variant="default">
            <FileQuestionIcon />
            <Alert.Title>What is it?</Alert.Title>
            <Alert.Description>It is alert. Enjoy alerting (Button is outline)</Alert.Description>
            <Alert.Action>
              <Button variant="outline">OK</Button>
            </Alert.Action>
          </Alert>

          <Alert variant="info">
            <FileQuestionIcon />
            <Alert.Title>What is it?</Alert.Title>
            <Alert.Description>It is alert. Enjoy alerting (button is secondary)</Alert.Description>
            <Alert.Action>
              <Button variant="secondary">OK</Button>
            </Alert.Action>
          </Alert>

          <Alert variant="success">
            <FileQuestionIcon />
            <Alert.Title>Success idk</Alert.Title>
          </Alert>

          <Alert variant="warning">
            <FileQuestionIcon />
            <Alert.Title>What is it?</Alert.Title>
            <Alert.Description>It is alert. Enjoy alerting (Button is ghost)</Alert.Description>
            <Alert.Action>
              <Button variant="ghost">OK</Button>
            </Alert.Action>
          </Alert>

          <Alert variant="destructive">
            <FileQuestionIcon />
            <Alert.Title>What is it?</Alert.Title>
            <Alert.Description>
              It is alert. Enjoy alerting. <a href="/">Random Link</a> (Button is destructive)
            </Alert.Description>
            <Alert.Action>
              <Button variant="destructive">OK</Button>
            </Alert.Action>
          </Alert>
        </div>
      </div>
    </div>
  );
}
