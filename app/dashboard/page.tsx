import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const Page = async () => {
  // server session
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session) {
    redirect('/sign-in')
  }

  return (
    <div>
      Dashboard View
    </div>
  )
}

export default Page