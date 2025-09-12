import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-7xl font-bold mb-8">CheeseMiz</h1>
      <Button size="lg">Get started</Button>
    </section>
  );
}
