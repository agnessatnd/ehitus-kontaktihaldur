"use client"

import { deleteObject, type ObjectFormState } from "@/app/objects/actions"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useActionState } from "react"

const initialState: ObjectFormState = {
  success: false,
  message: "",
}

type Props = {
  objectId: number
  objectName: string
}

export default function DeleteObjectButton({ objectId, objectName }: Props) {
  const [state, formAction] = useActionState(deleteObject, initialState)

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm(`Permanently delete "${objectName}"? This cannot be undone.`)) {
          e.preventDefault()
        }
      }}
    >
      <input type="hidden" name="id" value={objectId} />
      <Button type="submit" variant="destructive" size="sm">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete Object
      </Button>
    </form>
  )
}