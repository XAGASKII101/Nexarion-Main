import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase.from("integration_accounts").delete().eq("id", params.id).eq("user_id", user.id)

    if (error) {
      console.error("Delete integration error:", error)
      return NextResponse.json({ error: "Failed to delete integration" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete integration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
