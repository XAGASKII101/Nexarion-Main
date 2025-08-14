import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/dashboard/header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { MessageSquare, Users, TrendingUp, Zap } from "lucide-react";

export const runtime = 'nodejs'; // Ensure Node.js runtime for Supabase
export const dynamic = 'force-dynamic'; // Disable static generation for user-specific page

export default async function DashboardPage() {
  const supabase = createClient();

  // Check if Supabase client is initialized
  if (!supabase?.auth) {
    console.error("Supabase client or auth not initialized");
    redirect("/auth/login");
  }

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.error("Error fetching user:", error?.message || "No user found");
    redirect("/auth/login");
  }

  const user = data.user;

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header title="Dashboard" subtitle="Welcome back! Monitor your AI automations in real-time." />
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Messages Automated" value="12,543" change="+12%" icon={MessageSquare} trend="up" />
          <StatsCard title="Active Conversations" value="1,234" change="+8%" icon={Users} trend="up" />
          <StatsCard title="Response Rate" value="98.5%" change="+2.1%" icon={TrendingUp} trend="up" />
          <StatsCard title="Automation Score" value="94%" change="+5%" icon={Zap} trend="up" />
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <p className="text-slate-300">Your automation dashboard is ready! Connect your platforms to get started.</p>
        </div>
      </div>
    </div>
  );
}