// app/page.tsx

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomeView() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-background text-center">
      <div className="max-w-xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to GenAI
        </h1>
        <p className="text-lg text-muted-foreground">
          Build, explore, and deploy AI applications effortlessly.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="sign-in">
            <Button variant="default" size="lg">Login</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="outline" size="lg">Sign Up</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}