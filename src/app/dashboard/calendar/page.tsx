"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios";

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const birthdays = [
    { id: 1, name: "John Doe", day: 15, month: 4, year: 1990, title: "Team Lead" },
    { id: 2, name: "Jane Smith", day: 22, month: 4, year: 1985, title: "Product Manager" },
    { id: 3, name: "Mike Johnson", day: 5, month: 4, year: 1992, title: "Developer" },
    { id: 4, name: "Sarah Williams", day: 10, month: 5, year: 1988, title: "Designer" },
    { id: 5, name: "Alex Brown", day: 18, month: 3, year: 1995, title: "Marketing Specialist" },
    { id: 6, name: "Emily Davis", day: 25, month: 4, year: 1991, title: "HR Manager" },
    { id: 7, name: "Chris Wilson", day: 8, month: 4, year: 1987, title: "Sales Executive" },
    { id: 8, name: "Lisa Taylor", day: 12, month: 4, year: 1993, title: "Content Writer" },
    { id: 9, name: "David Miller", day: 30, month: 4, year: 1989, title: "Finance Analyst" },
    { id: 10, name: "Olivia Moore", day: 3, month: 5, year: 1994, title: "Customer Support" },
    { id: 11, name: "Ryan Clark", day: 20, month: 4, year: 1986, title: "Project Manager" },
    { id: 12, name: "Emma White", day: 7, month: 4, year: 1990, title: "QA Engineer" },
  ]
  
  
  
  
  useEffect (() => {
    const getBdays = async () => {
        console.log("test")
        const currentMonth = Number (new Date().getMonth() + 1)
        const userId = "efefefefefefe"
        const response = await axios.get (`/api/bdays-current-month?userId=${userId}&month=${currentMonth}`) 
        console.log (response)
    }

    getBdays();
   
  }, [])

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const getBirthdaysForDay = (day: any) => {
    return birthdays.filter((birthday: any) => birthday.day === day && birthday.month === currentMonth + 1)
  }

  // Generate calendar days
  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null) // Empty cells for days before the 1st of the month
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }




  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium py-2">
            {day}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const birthdaysOnDay = day ? getBirthdaysForDay(day) : []
          const isToday =
            day === new Date().getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear()

          return (
            <div
              key={index}
              className={`min-h-[80px] p-1 border rounded-md ${
                !day ? "bg-muted/20" : isToday ? "border-primary" : "hover:bg-muted/50"
              }`}
            >
              {day && (
                <>
                  <div className={`text-right p-1 ${isToday ? "font-bold text-primary" : ""}`}>{day}</div>
                  <div className="mt-1">
                    {birthdaysOnDay.map((birthday: any) => (
                      <div
                        key={birthday.id}
                        className="text-xs p-1 mb-1 bg-primary/10 rounded truncate"
                        title={`${birthday.name} (${birthday.title})`}
                      >
                        {birthday.name}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
