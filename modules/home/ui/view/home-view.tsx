"use client"

import { Button } from "@/components/ui/button"
import { signOut, useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function HomeView() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div>
      <p>Logged in as {session?.user.name}</p>
      <Button
        variant="destructive"
        onClick={() => signOut({
          fetchOptions: {
            onSuccess: () => router.push('/sign-in')
          }
        })}
      >Log Out</Button>
    </div>
  )
}