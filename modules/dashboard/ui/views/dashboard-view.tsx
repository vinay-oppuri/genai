"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSession } from "@/lib/auth-client"
import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { useFreeLimits } from "@/modules/premium/constants"
import { LoadingState } from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"

export const DashboardView = () => {
    const { data: session } = useSession()
    const trpc = useTRPC()

    const { data: meetingsData } = useQuery(trpc.meetings.getMany.queryOptions({}))
    const { data: agentsData } = useQuery(trpc.agents.getMany.queryOptions({}))
    const { isFreeUser, meetingLimit, agentLimit } = useFreeLimits()

    const totalMeetings = meetingsData?.total ?? 0
    const totalAgents = agentsData?.total ?? 0

    const testData = [
        { title: "Total Agents", value: totalAgents, max: agentLimit },
        { title: "Total Meetings", value: totalMeetings, max: meetingLimit },
        { title: "AI Tasks Today", value: 18, max: "" },
    ]

    return (
        <div className="min-h-screen bg-background px-6 py-10 text-foreground font-sans space-y-10 transition-all">
            <header className="text-center space-y-2">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                    Welcome back,{" "}
                    <span className="text-primary">
                        {session?.user.name || "-----"}
                    </span>
                </h1>
                <p className="text-muted-foreground text-md sm:text-lg">
                    Here&apos;s what&apos;s happening with your AI agents today.
                </p>
                {isFreeUser && (<p className="md:hidden text-muted-foreground">You are a <span className="text-primary font-bold">Free</span> User</p>)}
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testData.map(({ title, value, max }, i) => (
                    <Card
                        key={i}
                        className="bg-card border backdrop-blur-xl shadow-xl shadow-primary/5 hover:scale-101 hover:shadow-primary/10 transition-all duration-300"
                    >
                        <CardHeader>
                            <CardTitle>{title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-2xl md:text-3xl font-bold flex items-center gap-1">
                            {value} {max !== "" && isFreeUser && <span className="flex md:hidden text-muted-foreground text-xl">/ {max}</span>}
                        </CardContent>
                    </Card>
                ))}
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card border backdrop-blur-xl shadow-xl shadow-primary/5 transition-all duration-300 hover:scale-101 hover:shadow-primary/10">
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

                <Card className="bg-card border backdrop-blur-xl shadow-xl shadow-primary/5 transition-all duration-300 hover:scale-101 hover:shadow-primary/10">
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
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Online</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}

export const DashboardViewLoading = () => {
    return (
        <LoadingState
            title="Loading"
            description="This may take a few seconds"
        />
    )
}

export const DashboardViewError = () => {
    return (
        <ErrorState
            title="Error"
            description="Please try again later"
        />
    )
}