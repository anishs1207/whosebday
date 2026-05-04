"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useUser } from "@clerk/nextjs"
import { Birthday } from "@/types"

const CURRENT_YEAR = new Date().getFullYear()

export default function CalendarView() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [birthdaysByMonth, setBirthdaysByMonth] = useState<{ [key: number]: Birthday[] }>({})
    const [loading, setLoading] = useState(false)
    const [selectedDayEvents, setSelectedDayEvents] = useState<Birthday[] | null>(null) // New: selected day events
    const [selectedDay, setSelectedDay] = useState<number | null>(null) // To know which day is selected
    const fetchedMonths = useRef<Set<number>>(new Set())
    const { user } = useUser()

    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const getBdays = useCallback(async (month: number) => {
        if (fetchedMonths.current.has(month)) return

        try {
            setLoading(true)
            interface ApiResponse {
                data: Birthday[]
            }

            const response = await axios.get<ApiResponse>(`/api/bdays-current-month?userId=${user?.id}&month=${month}`)
            const data = response.data.data || []

            setBirthdaysByMonth(prev => ({
                ...prev,
                [month]: data,
            }))
            fetchedMonths.current.add(month)
        } catch (error) {
            console.error("Error fetching birthdays:", error)
        } finally {
            setLoading(false)
        }
    }, [user?.id])

    useEffect(() => {
        if (currentYear === CURRENT_YEAR) {
            getBdays(currentMonth + 1)
        }
    }, [currentMonth, currentYear, getBdays])

    const prevMonth = () => {
        if (currentYear === CURRENT_YEAR && currentMonth > 0) {
            setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
            setSelectedDay(null)
            setSelectedDayEvents(null)
        }
    }

    const nextMonth = () => {
        if (currentYear === CURRENT_YEAR && currentMonth < 11) {
            setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
            setSelectedDay(null)
            setSelectedDayEvents(null)
        }
    }

    const getBirthdaysForDay = (day: number) => {
        const monthData = birthdaysByMonth[currentMonth + 1] || []
        return monthData.filter((b: Birthday) => b.day === day)
    }

    const calendarDays = []
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarDays.push(null)
    }
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day)
    }

    // Handler when day clicked
    const onDayClick = (day: number) => {
        const events = getBirthdaysForDay(day)
        if (events.length > 0) {
            setSelectedDay(day)
            setSelectedDayEvents(events)
        } else {
            setSelectedDay(null)
            setSelectedDayEvents(null)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                    {monthNames[currentMonth]} {currentYear}
                </h3>
                <div className="flex items-center space-x-2">
                    <Button className="cursor-pointer" variant="outline" size="icon" onClick={prevMonth} disabled={currentMonth === 0}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button className="cursor-pointer" variant="outline" size="icon" onClick={nextMonth} disabled={currentMonth === 11}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-7 gap-2 text-center">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="font-medium py-2">{day}</div>
                    ))}

                    {calendarDays.map((day, index) => {
                        const birthdays = day ? getBirthdaysForDay(day) : []
                        const isToday =
                            day === new Date().getDate() &&
                            currentMonth === new Date().getMonth() &&
                            currentYear === new Date().getFullYear()

                        const isSelected = day === selectedDay

                        return (
                            <div
                                key={index}
                                onClick={() => day && onDayClick(day)}
                                className={`cursor-pointer min-h-[80px] p-1 border rounded-md 
                  ${!day ? "bg-muted/20 cursor-default" : ""}
                  ${isToday ? "border-primary" : ""}
                ${isSelected ? "border-1 border-primary " : "hover:bg-muted/50"}`}

                            >
                                {day && (
                                    <>
                                        <div className={`text-right p-1 ${isToday ? "font-bold text-primary" : ""}`}>{day}</div>
                                        <div className="mt-1">
                                            {birthdays.map((b: Birthday) => (
                                                <div
                                                    key={b.id}
                                                    className="text-xs p-1 mb-1 bg-primary/10 rounded truncate"
                                                    title={`${b.name} (${b.title})`}
                                                >
                                                    <p>{b.name}</p>
                                                    <p>({b.title})</p>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Utility panel for showing detailed events of the selected day */}
            {selectedDayEvents && (
                <div className="fixed bottom-4 right-4 max-w-sm w-full bg-white dark:bg-black border  dark:border-white rounded-lg shadow-lg p-4 z-50">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-lg">
                            Events on {monthNames[currentMonth]} {selectedDay}
                        </h4>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedDayEvents(null)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {selectedDayEvents.map(event => (
                            <div key={event.id} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                                <p className="font-semibold">{event.name}</p>
                                <p className="text-sm text-muted-foreground">({event.title})</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
