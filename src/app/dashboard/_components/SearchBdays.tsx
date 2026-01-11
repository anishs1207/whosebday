"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Cake, Trash2, Loader2 } from "lucide-react"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs"

interface Birthday {
    id: string
    name: string
    title: string
    day: number
    month: number
    year?: number
}

export default function SearchBirthdays() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedDay, setSelectedDay] = useState("")
    const [birthdays, setBirthdays] = useState<Birthday[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [, setDeleteDialogOpen] = useState(false)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const { user } = useUser()
    const [isDeleting, setIsDeleting] = useState(false)
    const [loading, setLoading] = useState(false) // Loader state

    const fetchBirthdays = async (page = 1) => {
        setLoading(true)
        const params = new URLSearchParams()
        if (searchTerm) params.append("searchTerm", searchTerm)
        if (selectedMonth && selectedMonth !== "any") params.append("month", selectedMonth)
        if (selectedDay && selectedDay !== "any") params.append("day", selectedDay)
        params.append("page", page.toString())
        if (user?.id) params.append('userId', user.id)

        try {
            const res = await fetch(`/api/search-bday?${params.toString()}`)
            const data = await res.json()
            setBirthdays(data.data || [])
            setTotalPages(data.meta?.totalPages || 1)
        } catch (err: any) {
            toast.error("Failed to fetch birthdays", err)
        } finally {
            setLoading(false)
        }
    }

    const deleteBirthday = async () => {
        if (deleteId) {
            setIsDeleting(true)
            try {
                const res = await fetch(`/api/delete-bday?id=${deleteId}`, { method: "DELETE" })
                if (res.ok) {
                    toast.success("Birthday deleted successfully")
                    setBirthdays(prev => prev.filter(b => b.id !== deleteId))
                    setDeleteDialogOpen(false)
                } else {
                    throw new Error("Failed to delete birthday")
                }
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "An unknown error occurred")
            } finally {
                setIsDeleting(false)
            }
        }
    }

    useEffect(() => {
        fetchBirthdays(page)
    }, [page])

    const handleSearch = () => {
        setPage(1)
        fetchBirthdays(1)
    }

    const handleReset = () => {
        setSearchTerm("")
        setSelectedMonth("")
        setSelectedDay("")
        setPage(1)
        fetchBirthdays(1)
    }

    const getMonthName = (month: number) => {
        return [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ][month - 1]
    }

    const getAge = (year?: number) => {
        if (!year) return null
        return new Date().getFullYear() - year
    }

    const days = Array.from({ length: 31 }, (_, i) => i + 1)
    const months = [
        { value: 1, label: "January" }, { value: 2, label: "February" }, { value: 3, label: "March" },
        { value: 4, label: "April" }, { value: 5, label: "May" }, { value: 6, label: "June" },
        { value: 7, label: "July" }, { value: 8, label: "August" }, { value: 9, label: "September" },
        { value: 10, label: "October" }, { value: 11, label: "November" }, { value: 12, label: "December" },
    ]

    return (
        <Card>
            <CardContent className="pt-6 space-y-8">
                {/* Filters */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="searchTerm">Search by Name or Title</Label>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="searchTerm"
                                type="text"
                                placeholder="Search..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="month">Month</Label>
                            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                <SelectTrigger id="month">
                                    <SelectValue placeholder="Any month" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">Any month</SelectItem>
                                    {months.map(month => (
                                        <SelectItem key={month.value} value={month.value.toString()}>
                                            {month.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="day">Day</Label>
                            <Select value={selectedDay} onValueChange={setSelectedDay}>
                                <SelectTrigger id="day">
                                    <SelectValue placeholder="Any day" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">Any day</SelectItem>
                                    {days.map(day => (
                                        <SelectItem key={day} value={day.toString()}>
                                            {day}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button onClick={handleSearch} className="w-full sm:w-auto">
                            <Search className="mr-2 h-4 w-4" />
                            Search
                        </Button>
                        <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto">
                            Reset Filters
                        </Button>
                    </div>
                </div>

                {/* Loader or Results */}
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {birthdays.map(birthday => (
                            <Card key={birthday.id} className="hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-4 flex gap-4 items-center">
                                    <div className="bg-primary w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center">
                                        <Cake className="h-8 w-8 md:h-10 md:w-10 text-primary-foreground" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h4 className="font-semibold text-lg">{birthday.name}</h4>
                                        <p className="text-sm text-muted-foreground">{birthday.title}</p>
                                        <div className="flex justify-between items-center text-sm pt-1">
                                            <span>
                                                {birthday.day} {getMonthName(birthday.month)}
                                                {birthday.year && `, ${birthday.year}`}
                                            </span>
                                            {getAge(birthday.year) && (
                                                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                                    {getAge(birthday.year)} yrs
                                                </span>
                                            )}
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => {
                                                            setDeleteId(birthday.id)
                                                            setDeleteDialogOpen(true)
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Confirm Deletion</DialogTitle>
                                                        <DialogDescription>
                                                            Are you sure you want to delete this birthday?
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                                                            Cancel
                                                        </Button>
                                                        <Button variant="destructive" onClick={deleteBirthday} disabled={isDeleting}>
                                                            {isDeleting ? "Deleting..." : "Delete"}
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination (Optional based on totalPages) */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <span>Page {page} of {totalPages}</span>
                        <Button
                            variant="outline"
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
