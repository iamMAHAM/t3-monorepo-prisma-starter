import { HydrateClient } from "~/trpc/server";

export const runtime = "edge";

const HomePage = () => {
  // You can await this here if you don't want to show Suspense fallback below

  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        <p>Home page</p>
      </main>
    </HydrateClient>
  );
};

export default HomePage;
