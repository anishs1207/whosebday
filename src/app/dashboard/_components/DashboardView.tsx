'use client'

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchBirthdays from "./SearchBdays"
import BirthdayList from "./BirthdayList";
import CalendarView from "./CalendarView";
import PricingCards from "./PlanPricing";
import SideNav from "./SideNav";
import AddBirthdayForm from "./AddBdayForm";
import UserPlanCard from "./UserPlan";
import { BirthdayInput } from "@/types";


const initialBirthdays = [
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

export function DashboardView() {

    const [birthdays, setBirthdays] = useState<(BirthdayInput & { id: number })[]>(initialBirthdays)
    const [, setFilteredBirthdays] = useState<(BirthdayInput & { id: number })[]>(initialBirthdays)
    const [activeTab, setActiveTab] = useState("dashboard")
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const addBirthday = (newBirthday: BirthdayInput) => {
        const updatedBirthdays = [...birthdays, { ...newBirthday, id: birthdays.length + 1 }]
        setBirthdays(updatedBirthdays)
        setFilteredBirthdays(updatedBirthdays)
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    useEffect(() => {
        console.log(`Tab switched to: ${activeTab}`)
    }, [activeTab])

    return (
        <div className="flex min-h-screen">
            <SideNav activeTab={activeTab} setActiveTab={setActiveTab} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold tracking-tight">WhoseBday</h2>
                    </div>
                    <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="hidden">
                            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                            <TabsTrigger value="calendar">Calendar</TabsTrigger>
                            <TabsTrigger value="add">Add Birthday</TabsTrigger>
                            <TabsTrigger value="search">Search</TabsTrigger>
                            <TabsTrigger value="chat">Chat</TabsTrigger>
                        </TabsList>
                        <TabsContent value="dashboard" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <div className="col-span-2">
                                    <div className="rounded-xl border bg-card text-card-foreground shadow">
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold">Upcoming Birthdays</h3>
                                            <BirthdayList />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="calendar" className="space-y-4">
                            <div className="rounded-xl border bg-card text-card-foreground shadow">
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-4">Birthday Calendar</h3>
                                    <CalendarView />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="add" className="space-y-4">
                            <div className="rounded-xl border bg-card text-card-foreground shadow max-w-[500px] mx-auto">
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-4 text-center">Add New Birthday</h3>
                                    <AddBirthdayForm onAddBirthday={addBirthday} />
                                </div>
                            </div>
                        </TabsContent>


                        <TabsContent value="search" className="space-y-4">
                            <div className="rounded-xl border bg-card text-card-foreground shadow">
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-4">Search Birthdays</h3>
                                    <SearchBirthdays />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="plan" className="space-y-4">
                            <div className="rounded-xl border bg-card text-card-foreground shadow">
                                <div className="p-6">
                                    <UserPlanCard
                                        name="Anish Sabharwal"
                                        plan="Pro"
                                        billingCycle="monthly"
                                        startDate="2025-05-01"
                                        nextBillingDate="2025-06-01"
                                    />


                                    <PricingCards />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
