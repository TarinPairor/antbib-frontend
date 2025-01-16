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
            <a className="text-lg" href="/">
              Home
            </a>
          </SidebarGroupLabel>
          <SidebarGroupLabel>
            <a className="text-lg" href="/inbox">
              Inbox
            </a>
          </SidebarGroupLabel>

          <SidebarGroupLabel>
            <a className="text-lg" href="/calendar">
              Calendar
            </a>
          </SidebarGroupLabel>
          <SidebarGroupLabel>
            <a className="text-lg" href="/settings">
              Settings
            </a>
          </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            <a className="text-lg" href="/dashboard">
              Dashboard
            </a>
          </SidebarGroupLabel>
          {/* <SidebarGroupLabel>
            <p className="text-lg">Create Task</p>
          </SidebarGroupLabel> */}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
