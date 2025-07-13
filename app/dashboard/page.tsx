
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

// Shadcn UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import { Brain, Calendar, ArrowUpRight, Plus, Users, Clock, TrendingUp, Sparkles } from "lucide-react";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

// --- Main Dashboard Page Component ---
const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  // Fetch all dashboard data concurrently on the server
  const [recentAgents, upcomingMeetings, agentPerformance, meetingAnalytics] =
    await Promise.all([
      getRecentAgents(session.user.id),
      getUpcomingMeetings(session.user.id),
      getAgentPerformanceSummary(session.user.id),
      getMeetingAnalytics(session.user.id),
    ]);

  const user: User = session.user; // Cast session.user to User interface

  return (
    <div className="min-h-screen bg-background p-8 lg:p-12">
      {/* Dashboard Header */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Welcome, <span className="text-primary">{user.name?.split(' ')[0] || 'Innovator'}</span>!
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Manage your intelligent agents and optimize your schedule.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary-foreground">
            <AvatarImage src={user.image || "/path/to/default-avatar.png"} alt={user.name || "User"} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <Separator className="my-8 bg-muted" />

      {/* Quick Actions Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Button className="h-24 text-lg font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <Plus className="mr-3 h-6 w-6" /> Create New Agent
          </Button>
          <Button variant="outline" className="h-24 text-lg font-semibold hover:bg-accent hover:text-accent-foreground shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <Calendar className="mr-3 h-6 w-6" /> Schedule Meeting
          </Button>
          <Button variant="secondary" className="h-24 text-lg font-semibold hover:bg-secondary/90 shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <ArrowUpRight className="mr-3 h-6 w-6" /> View All Reports
          </Button>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent AI Agents Section */}
        <section className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Your AI Agents</CardTitle>
              <CardDescription>A list of your recently created and active AI agents.</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div className="p-4 text-center text-muted-foreground">Loading agents...</div>}>
                {recentAgents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Inlined Agent Card Logic */}
                    {recentAgents.map((agent: Agent) => (
                      <Card key={agent.id} className="hover:border-primary transition-colors duration-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-lg font-semibold">{agent.name}</CardTitle>
                          <Brain className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-sm">{agent.type}</CardDescription>
                          <div className="flex items-center justify-between text-xs text-muted-foreground mt-3">
                            <Badge
                              variant={agent.status === "Active" ? "default" : "secondary"}
                              className={
                                agent.status === "Active"
                                  ? "bg-green-500 hover:bg-green-600"
                                  : "bg-orange-500 hover:bg-orange-600"
                              }
                            >
                              {agent.status}
                            </Badge>
                            <span>Created: {new Date(agent.creationDate).toLocaleDateString()}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No agents created yet. Let's build your first AI!
                  </p>
                )}
              </Suspense>
            </CardContent>
          </Card>
        </section>

        {/* Upcoming Meetings Section */}
        <section className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Upcoming Meetings</CardTitle>
              <CardDescription>Meetings scheduled with your AI agents.</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div className="p-4 text-center text-muted-foreground">Loading meetings...</div>}>
                {upcomingMeetings.length > 0 ? (
                  <div className="space-y-4">
                    {/* Inlined Meeting Item Logic */}
                    {upcomingMeetings.map((meeting: Meeting) => (
                      <Card key={meeting.id} className="hover:border-accent transition-colors duration-200">
                        <CardContent className="p-4 flex items-center gap-4">
                          <Calendar className="h-6 w-6 text-primary" />
                          <div>
                            <p className="text-base font-medium">{meeting.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              with{" "}
                              <span className="font-semibold text-primary">
                                {meeting.agent}
                              </span>
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No meetings scheduled. Time to get some agents to work!
                  </p>
                )}
              </Suspense>
            </CardContent>
          </Card>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Agent Performance Summary Section */}
        <section>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Agent Performance</CardTitle>
              <CardDescription>Overview of your AI agents' efficiency and impact.</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div className="p-4 text-center text-muted-foreground">Analyzing performance...</div>}>
                {agentPerformance ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-foreground">Meeting Success Rate</span>
                      <span className="text-3xl font-bold text-green-500">{agentPerformance.meetingSuccessRate}%</span>
                    </div>
                    <Progress value={agentPerformance.meetingSuccessRate} className="h-3" />

                    <div className="grid grid-cols-2 gap-4 text-center mt-6">
                      <div>
                        <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-3xl font-bold text-primary">{agentPerformance.totalAgents}</p>
                        <p className="text-sm text-muted-foreground">Total Agents</p>
                      </div>
                      <div>
                        <Brain className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-3xl font-bold text-purple-400">{agentPerformance.activeAgents}</p>
                        <p className="text-sm text-muted-foreground">Active Agents</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No performance data available yet.
                  </p>
                )}
              </Suspense>
            </CardContent>
          </Card>
        </section>

        {/* Meeting Analytics Section */}
        <section>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Meeting Insights</CardTitle>
              <CardDescription>Key metrics from your scheduled meetings.</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div className="p-4 text-center text-muted-foreground">Gathering insights...</div>}>
                {meetingAnalytics ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-4xl font-bold text-foreground">{meetingAnalytics.totalMeetings}</p>
                      <p className="text-sm text-muted-foreground">Total Meetings</p>
                    </div>
                    <div className="text-center">
                      <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-4xl font-bold text-foreground">{meetingAnalytics.averageDurationMinutes} <span className="text-lg">min</span></p>
                      <p className="text-sm text-muted-foreground">Avg. Duration</p>
                    </div>
                    <div className="col-span-full text-center mt-4">
                      <TrendingUp className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-xl font-bold text-primary">{meetingAnalytics.topAgentPerformer}</p>
                      <p className="text-sm text-muted-foreground">Top Performing Agent</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No meeting analytics to display.
                  </p>
                )}
              </Suspense>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Call to action for new users (if no agents yet) */}
      {recentAgents.length === 0 && (
        <Card className="mt-8 text-center p-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Ready to boost your productivity?</CardTitle>
            <CardDescription className="text-lg mt-2">
              Start by creating your first AI agent or scheduling a new meeting!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-full text-lg shadow-lg">
              <Sparkles className="mr-2 h-5 w-5" /> Get Started Now
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;

// --- Placeholder for Data Fetching Functions and Types (e.g., src/lib/data.ts) ---
// Ensure this file exists and exports these interfaces and functions.

// src/lib/data.ts
export interface Agent {
  id: string;
  name: string;
  status: "Active" | "Idle" | "Offline";
  creationDate: string;
  type: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string; // e.g., "YYYY-MM-DD"
  time: string; // e.g., "HH:MM AM/PM"
  agent: string; // Name of the agent
}

export interface AgentPerformanceSummary {
  totalAgents: number;
  activeAgents: number;
  meetingSuccessRate: number; // percentage
  averageMeetingDuration: number; // minutes
}

export interface MeetingAnalytics {
  totalMeetings: number;
  completedMeetings: number;
  pendingMeetings: number;
  averageDurationMinutes: number;
  topAgentPerformer: string;
}

export async function getRecentAgents(userId: string): Promise<Agent[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    { id: "agent-1", name: "Sales Outreach Bot", status: "Active", creationDate: "2025-07-01", type: "Sales Assistant" },
    { id: "agent-2", name: "Customer Support AI", status: "Idle", creationDate: "2025-06-20", type: "Customer Support" },
    { id: "agent-3", name: "Content Generator Pro", status: "Active", creationDate: "2025-07-10", type: "Marketing Assistant" },
    { id: "agent-4", name: "Meeting Scribe", status: "Offline", creationDate: "2025-05-15", type: "Meeting Notetaker" },
  ];
}

export async function getUpcomingMeetings(userId: string): Promise<Meeting[]> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return [
    { id: "meet-1", title: "Q3 Strategy Session", date: "2025-07-15", time: "10:00 AM", agent: "Sales Outreach Bot" },
    { id: "meet-2", title: "Client Onboarding Call", date: "2025-07-16", time: "02:30 PM", agent: "Customer Support AI" },
    { id: "meet-3", title: "Product Launch Brainstorm", date: "2025-07-18", time: "11:00 AM", agent: "Content Generator Pro" },
  ];
}

export async function getAgentPerformanceSummary(userId: string): Promise<AgentPerformanceSummary | null> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    totalAgents: 8,
    activeAgents: 5,
    meetingSuccessRate: 92, // percentage
    averageMeetingDuration: 45, // minutes
  };
}

export async function getMeetingAnalytics(userId: string): Promise<MeetingAnalytics | null> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    totalMeetings: 128,
    completedMeetings: 115,
    pendingMeetings: 13,
    averageDurationMinutes: 38,
    topAgentPerformer: "Sales Outreach Bot",
  };
}