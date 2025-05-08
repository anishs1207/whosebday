"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export function AddBirthdayForm({ onAddBirthday }: any) {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    day: "",
    month: "",
    year: "",
    title: "",
  })

  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (!user) {
      toast.error("You need to be logged in to add a birthday");
    }
  })

  const AddBday = async (newBirthday: any) => {
    try {
      setLoading(true);
      await axios.post ("/api/add-birthday", newBirthday);
      setFormData({
        name: "",
        day: "",
        month: "",
        year: "",
        title: "",
      })
  
      toast.success("Birthday added successfully")
    } catch (error) {
      console.log ("Error adding Birthday", error);
      toast.error('Error Adding the Birthday')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: any, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.day || !formData.month) {
      toast.error("Name, day, and month are required fields")
    }

    // Convert string values to numbers where appropriate
    const newBirthday = {
      ...formData,
      day: Number.parseInt(formData.day),
      month: Number.parseInt(formData.month),
      year: formData.year ? Number.parseInt(formData.year) : null,
    }

    const newBirthdayWithUserId = {
      ...newBirthday,
      userId: user?.id,  // Add the user ID to the birthday data
    };

    onAddBirthday(newBirthday)

    AddBday(newBirthdayWithUserId);

    // Reset form
    
  }

  // Generate days 1-31
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  // Generate months
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ]

  // Generate years (100 years back from current year)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title/Relationship</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="E.g., Friend, Colleague, etc."
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="day">Day</Label>
              <Select value={formData.day} onValueChange={(value) => handleSelectChange("day", value)}>
                <SelectTrigger id="day">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day.toString()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="month">Month</Label>
              <Select value={formData.month} onValueChange={(value) => handleSelectChange("month", value)}>
                <SelectTrigger id="month">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value.toString()}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="year">Year (Optional)</Label>
              <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Year (Optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Not specified</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding..." : "Add Birthday"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
