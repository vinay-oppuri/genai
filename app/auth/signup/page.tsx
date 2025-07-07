"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signUp, signOut, useSession } from "@/lib/auth-client"
import { useState } from "react"

export default function Home() {
  const {data: session} = useSession()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = () => {
    signUp.email({
      name,
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
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        create User
      </Button>
    </div>
  )
}