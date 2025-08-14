import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}
