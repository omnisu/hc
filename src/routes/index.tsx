import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold">Hello</h1>

      <p>
        This is the{" "}
        <a href="https://egormorozov.dev" target="_blank" className="text-primary underline">
          Egor Morozov's
        </a>{" "}
        HelloClient UI playground
      </p>

      <h2 className="text-xl mt-4 font-semibold">The core stack is</h2>
      <ul className="list-disc ml-4">
        <li>Base UI</li>
        <li>Tanstack</li>
      </ul>
    </div>
  );
}
