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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black px-6 py-10 text-gray-900 dark:text-gray-100 font-sans space-y-10 transition-all">
      {/* Header */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Welcome back, <span className="text-primary dark:text-green-500">{session.user.name || "Agent"}</span>
        </h1>
        <p className="text-muted-foreground text-md sm:text-lg">
          Here&apos;s what&apos;s happening with your AI agents today.
        </p>
      </header>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Total Agents", value: 24 },
          { title: "Upcoming Meetings", value: 6 },
          { title: "AI Tasks Today", value: 18 }
        ].map(({ title, value }, i) => (
          <Card
            key={i}
            className="bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-lg shadow-primary/10 hover:scale-[1.01] transition-all duration-300"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{value}</CardContent>
          </Card>
        ))}
      </section>

      {/* Details Sections */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Meetings */}
        <Card className="bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-md shadow-primary/10 transition-all duration-300 hover:scale-[1.01]">
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

        {/* Top Performing Agents */}
        <Card className="bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-md shadow-primary/10 transition-all duration-300 hover:scale-[1.01]">
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
                  <span className="font-medium">{agent}</span>
                </div>
                <Badge className="bg-green-600 hover:bg-green-500 text-white">Online</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default Page