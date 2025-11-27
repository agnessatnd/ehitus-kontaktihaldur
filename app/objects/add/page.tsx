import AddObjectForm from "@/components/objects/add-object-form"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AddObjectPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect("/auth/login")

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Add New Object</h1>
      <AddObjectForm />
    </div>
  )
}