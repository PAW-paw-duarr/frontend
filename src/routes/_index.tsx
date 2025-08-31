import { Container } from "@mantine/core";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <Container>
      <h1>Welcome to React Router</h1>
      <p>
        This is a starter template for you to get up and running with React
        Router.
      </p>
    </Container>
  );
}
