"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cake } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { toast } from "react-hot-toast"

export function BirthdayList() {
  const [birthdays, setBirthdays] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useUser()

  const getMonthName = (month: number) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
    return months[month - 1]
  }

  const getAge = (year: number) => {
    if (!year) return null
    const currentYear = new Date().getFullYear()
    return currentYear - year
  }

  useEffect(() => {
    if (!user) {
      toast.error("You need to be logged in to add a birthday")
      return
    }

    const fetchBirthdays = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/recent-bdays?userId=${user.id}`)
        const data = await res.json()

        if (data.success) {
          setBirthdays(data.data)
        } else {
          console.error("Fetch failed:", data.message)
        }
      } catch (err) {
        console.error("Error fetching birthdays:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBirthdays()
  }, [user])

  return (
    <div className="space-y-4 mt-4">
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-t-transparent border-primary rounded-full animate-spin" />
        </div>
      ) : birthdays.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No birthdays found</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {birthdays.map((birthday: any) => (
            <Card key={birthday.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-start">
                  <div className="bg-primary p-4 flex items-center justify-center">
                    <Cake className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="p-4 flex-1">
                    <h4 className="font-semibold text-lg">{birthday.name}</h4>
                    <p className="text-sm text-muted-foreground">{birthday.title}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-sm">
                        {birthday.day} {getMonthName(birthday.month)}
                        {birthday.year && `, ${birthday.year}`}
                      </div>
                      {getAge(birthday.year) && (
                        <div className="text-xs bg-muted px-2 py-1 rounded-full">
                          {getAge(birthday.year)} years
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
