import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const Page = async () => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-background text-foreground space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Welcome back, {session.user.name || "Agent"}</h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your AI agents today.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Agents</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">24</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">6</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Tasks Today</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">18</CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {["Client Sync", "Design Review", "Daily Standup"].map((meeting, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <span>{meeting}</span>
                  <Badge variant="outline">Scheduled</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Agent Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Agents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Ava", "Max", "Leo"].map((agent, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{agent.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{agent}</span>
                </div>
                <Badge className="bg-green-600 hover:bg-green-500">Online</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default Page