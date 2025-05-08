'use client'

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SideNav } from "@/components/side-nav"
import { CalendarView } from "@/components/calendar-view"
import { BirthdayList } from "@/components/birthday-list"
import { AddBirthdayForm } from "@/components/add-birthday-form"
import SearchBirthdays from "@/components/search-birthdays"


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

  const [birthdays, setBirthdays] = useState(initialBirthdays)
  const [filteredBirthdays, setFilteredBirthdays] = useState(initialBirthdays)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const itemsPerPage = 6

  const addBirthday = (newBirthday: any) => {
    const updatedBirthdays = [...birthdays, { ...newBirthday, id: birthdays.length + 1 }]
    setBirthdays(updatedBirthdays)
    setFilteredBirthdays(updatedBirthdays)
  }

  const handleSearch = (searchResults: any) => {
    setFilteredBirthdays(searchResults)
    setCurrentPage(1)
  }

  const getCurrentMonthBirthdays = () => {
    const currentMonth = new Date().getMonth() + 1
    return birthdays.filter((birthday) => birthday.month === currentMonth)
  }

  const paginatedBirthdays = filteredBirthdays.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(filteredBirthdays.length / itemsPerPage)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  useEffect(() => {
    // Trigger a component reload every time the active tab changes
    console.log(`Tab switched to: ${activeTab}`)

    // Here you can add additional logic to reload components or fetch data if needed
    // Example: Refetching data based on the active tab
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
                      <BirthdayList/>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="calendar" className="space-y-4">
              <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Birthday Calendar</h3>
                  <CalendarView/>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="add" className="space-y-4">
              <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Add New Birthday</h3>
                  <AddBirthdayForm onAddBirthday={addBirthday} />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="search" className="space-y-4">
              <div className="rounded-xl border bg-card text-card-foreground shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Search Birthdays</h3>
                  <SearchBirthdays />
                  <div className="mt-6">
                    {/* <BirthdayList
                      birthdays={paginatedBirthdays}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      showPagination={true}
                    /> */}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
