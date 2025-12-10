import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AccountPageClient from "./page-client"

export default async function AccountPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  return <AccountPageClient user={user} />
}