"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { BirthdayInput } from "@/types";

export default function AddBirthdayForm({ onAddBirthday }: { onAddBirthday: (birthday: BirthdayInput) => void }) {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        name: "",
        day: "",
        month: "",
        year: "",
        title: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            toast.error("You need to be logged in to add a birthday");
        }
    }, [user]);

    const AddBday = async (newBirthday: BirthdayInput & { userId?: string }) => {
        try {
            setLoading(true);
            await axios.post("/api/add-birthday", newBirthday);
            setFormData({
                name: "",
                day: "",
                month: "",
                year: "",
                title: "",
            });
            toast.success("Birthday added successfully");
        } catch (error) {
            console.error("Error adding Birthday", error);
            toast.error("Error Adding the Birthday");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.day || !formData.month) {
            toast.error("Name, day, and month are required fields");
            return;
        }

        const newBirthday = {
            ...formData,
            day: Number.parseInt(formData.day),
            month: Number.parseInt(formData.month),
            year: formData.year ? Number.parseInt(formData.year) : null,
        };

        const newBirthdayWithUserId = {
            ...newBirthday,
            userId: user?.id,
        };

        onAddBirthday(newBirthday);
        AddBday(newBirthdayWithUserId);
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);

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
    ];

    return (
        <Card>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="space-y-4">
                        <div className="space-y-4">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                            />
                        </div>

                        <div className="space-y-4">
                            <Label htmlFor="title">Title/Relationship</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="E.g., Friend, Colleague, etc."
                            />
                        </div>

                        <div className="space-y-4">
                            <Label htmlFor="day">Day</Label>
                            <Select
                                value={formData.day}
                                onValueChange={(value) => handleSelectChange("day", value)}
                            >
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

                        <div className="space-y-4">
                            <Label htmlFor="month">Month</Label>
                            <Select
                                value={formData.month}
                                onValueChange={(value) => handleSelectChange("month", value)}
                            >
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
                    </div>

                    <Button type="submit" className="cursor-pointer w-full" disabled={loading}>
                        {loading ? "Adding..." : "Add Birthday"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
