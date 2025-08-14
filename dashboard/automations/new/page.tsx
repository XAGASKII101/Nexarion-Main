import { Header } from "@/components/dashboard/header"
import { AutomationBuilder } from "@/components/dashboard/automation-builder"

export default function NewAutomationPage() {
  return (
    <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header title="Create Automation" subtitle="Build intelligent AI workflows for your business" />

      <div className="p-8">
        <AutomationBuilder />
      </div>
    </div>
  )
}
