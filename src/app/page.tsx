import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    redirect("/tasks");
  }
  return (
    <div className="md:col-span-12">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Master Your Tasks,
              <br />
              <span className="text-primary">Elevate Your Productivity</span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
              TaskMaster helps you organize, track, and complete your tasks
              efficiently. Stay on top of your projects and achieve your goals
              with our powerful task management solution.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <SignInButton mode="modal">
                <Button variant="outline" size="lg" className="gap-2">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="lg" className="gap-2">
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
