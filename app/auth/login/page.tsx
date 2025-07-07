"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn, signOut, useSession } from "@/lib/auth-client"
import { useState } from "react"

export default function Home() {
  const {data: session} = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
    signIn.email({
      email, 
      password
    }, {
      onError: () => {
        window.alert("Something went wrong")
      },
      onSuccess: () => {
        window.alert("User created Successfully")
      }
    })
  }

  if(session) {
    return(
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button variant="destructive" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-2 m-10">
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>
        Sign In
      </Button>
    </div>
  )
}