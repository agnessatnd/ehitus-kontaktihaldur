// components/objects/WorkersManager.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { User } from "lucide-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"

type Contact = {
  id: number
  name: string
}

type Props = {
  objectId: number
  allContacts: Contact[]
  currentContactIds: Set<number>
}

export default function WorkersManager({ objectId, allContacts, currentContactIds }: Props) {
  const [isPending, startTransition] = useTransition()
  const [optimisticIds, setOptimisticIds] = useState(currentContactIds)

  const toggleWorker = async (contactId: number, checked: boolean) => {
    // Optimistic UI
    setOptimisticIds(prev => {
      const next = new Set(prev)
      if (checked) next.add(contactId)
      else next.delete(contactId)
      return next
    })

    const formData = new FormData()
    formData.append("objectId", objectId.toString())
    formData.append("contactId", contactId.toString())
    formData.append("add", checked ? "add" : "remove")

    const res = await fetch("/api/objects/workers", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      toast.error("Failed to update worker")
      // Revert optimistic update
      setOptimisticIds(currentContactIds)
    } else {
      toast.success(checked ? "Worker added" : "Worker removed")
    }
  }

  const isAssigned = (id: number) => optimisticIds.has(id)

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {allContacts.length === 0 ? (
            <p className="text-muted-foreground">No contacts found.</p>
          ) : (
            allContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Checkbox
                    id={`contact-${contact.id}`}
                    checked={isAssigned(contact.id)}
                    disabled={isPending}
                    onCheckedChange={(checked) =>
                      startTransition(() => toggleWorker(contact.id, checked as boolean))
                    }
                  />
                  <Label
                    htmlFor={`contact-${contact.id}`}
                    className="cursor-pointer font-medium flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    {contact.name}
                  </Label>
                </div>

                {isAssigned(contact.id) && (
                  <span className="text-sm text-emerald-600 font-medium">Working here</span>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}