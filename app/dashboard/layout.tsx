import { SidebarProvider } from "@/components/ui/sidebar"
import BottomNav from "@/modules/dashboard/ui/components/dashboard-bottom-nav"
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar"
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar"

interface Props {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <DashboardSidebar/>
            <main className="flex flex-col h-screen w-screen bg-background overflow-x-hidden">
                <DashboardNavbar/>
                {children}
                <BottomNav/>
            </main>
        </SidebarProvider>
    )
}

export default Layout