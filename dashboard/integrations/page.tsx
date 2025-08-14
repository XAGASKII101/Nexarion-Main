import { Header } from "@/components/dashboard/header"
import { IntegrationStatus } from "@/components/dashboard/integration-status"
import { WhatsAppTester } from "@/components/dashboard/whatsapp-tester"

export default function IntegrationsPage() {
  return (
    <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header title="Integrations" subtitle="Connect and manage your platform integrations" />

      <div className="p-8 space-y-8">
        <IntegrationStatus />

        <div className="grid lg:grid-cols-2 gap-8">
          <WhatsAppTester />

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-6">Automation Workflow</h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-white">Instagram Trigger</h4>
                  <p className="text-sm text-slate-400">User comments or sends DM</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-white">WhatsApp Follow-up</h4>
                  <p className="text-sm text-slate-400">AI sends personalized WhatsApp message</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-white">Email Sequence</h4>
                  <p className="text-sm text-slate-400">Automated email nurturing begins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
