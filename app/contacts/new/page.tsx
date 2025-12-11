import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

import AddContactForm from "@/components/contacts/add-contact"

export default async function AddContactPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const search = await props.searchParams

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const rawTeam = search.team
  const teamId =
    typeof rawTeam === "string" && rawTeam.trim() !== ""
      ? Number(rawTeam)
      : null

  let q = supabase.from("object").select("id, name").order("name")

  if (teamId) {
    q = q.eq("team_id", teamId)
  } else {
    q = q.eq("user_id", user.id)
  }

  const { data: objects, error } = await q
  if (error) throw error

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Add Contact</h1>
      <AddContactForm objects={objects ?? []} />
    </div>
  )
}