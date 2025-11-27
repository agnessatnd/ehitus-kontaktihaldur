// app/objects/[id]/edit/page.tsx
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import EditObjectForm from "@/components/objects/edit-object-form"

export default async function ObjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const idNum = Number(id)
  if (isNaN(idNum)) notFound()

  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) redirect("/auth/login")

  const { data: object, error } = await supabase
    .from("object")
    .select("id, name, location, description, startdate, enddate, isactive")
    .eq("id", idNum)
    .single()

  if (error || !object) notFound()

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Edit Object</h1>
      <EditObjectForm object={object} />
    </div>
  )
}