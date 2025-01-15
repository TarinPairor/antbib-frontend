import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <a href="/">Home</a>
          </SidebarGroupLabel>
          <SidebarGroupLabel>
            <a href="/inbox">Inbox</a>
          </SidebarGroupLabel>
          <SidebarGroupLabel>
            <a href="/calendar">Calendar</a>
          </SidebarGroupLabel>
          <SidebarGroupLabel>
            <a href="/settings">Settings</a>
          </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            <a href="/dashboard">Dashboard</a>
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
