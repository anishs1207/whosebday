'use client'

import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Home,
    Menu,
    PlusCircle,
    Search,
    LogOut,
    BadgeCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SignOutButton } from '@clerk/nextjs'
import { ModeToggle } from "@/components/theme-toggle"

interface SideNavProps {
    activeTab: string;
    setActiveTab: (tabId: string) => void;
    isOpen: boolean;
    toggleSidebar: () => void;
}


export default function SideNav({ activeTab, setActiveTab, isOpen, toggleSidebar }: SideNavProps) {

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
        { id: "calendar", label: "Calendar", icon: <CalendarDays className="h-5 w-5" /> },
        { id: "add", label: "Add Birthday", icon: <PlusCircle className="h-5 w-5" /> },
        { id: "search", label: "Search", icon: <Search className="h-5 w-5" /> },
        { id: "plan", label: "Plan", icon: <BadgeCheck className="h-5 w-5" /> },
    ]

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={toggleSidebar}></div>
            )}

            {/* Mobile toggle button */}
            <Button variant="outline" size="icon" className="fixed left-4 top-4 z-50 md:hidden" onClick={toggleSidebar}>
                <Menu className="h-5 w-5" />
            </Button>

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-background transition-all duration-300",
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20",
                )}
            >
                <div className="flex h-16 items-center justify-between px-4 py-4">
                    <h1 className={cn("font-bold text-xl transition-opacity", isOpen ? "m-10 opacity-100" : "opacity-0 md:hidden")}>
                        WhoseBday
                    </h1>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className="hidden md:flex cursor-pointer"
                        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                    </Button>
                </div>

                <nav className="flex-1 space-y-2 px-2 py-4">
                    {navItems.map((item) => (
                        <Button
                            key={item.id}
                            variant={activeTab === item.id ? "default" : "ghost"}
                            onClick={() => setActiveTab(item.id)}
                            className={cn("cursor-pointer w-full justify-start", isOpen ? "px-4" : "px-0 md:justify-center")}
                        >
                            <span className="flex items-center">
                                {item.icon}
                                <span className={cn("ml-2 transition-opacity", isOpen ? "opacity-100" : "opacity-0 hidden md:hidden")}>
                                    {item.label}
                                </span>
                            </span>
                        </Button>
                    ))}
                </nav>

                {/* Mode Toggle */}
                <div className="px-4 py-2">
                    <ModeToggle />
                </div>

                {/* Logout button */}
                <div className="border-t p-4">
                    <Button
                        onClick={() => setActiveTab('plan')}
                        className={cn(
                            "cursor-pointer w-full justify-center mb-4 text-white font-semibold py-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500 transition-all duration-300",
                            isOpen ? "block" : "hidden"
                        )}
                    >
                        Free Plan
                    </Button>

                    <SignOutButton>
                        <Button
                            variant="ghost"
                            className={cn("cursor-pointer w-full justify-center text-red-600 hover:text-red-700", isOpen ? "px-2" : "px-0 md:justify-center")}
                        >
                            <LogOut className="h-5 w-5" />
                            <span className={cn(" ml-2 transition-opacity", isOpen ? "opacity-100" : "opacity-0 hidden md:hidden")}>
                                Logout
                            </span>
                        </Button>
                    </SignOutButton>

                    <div className={cn("mt-4 text-xs text-muted-foreground", isOpen ? "block" : "hidden")}>
                        © 2025 WhoseBday
                    </div>
                </div>
            </div>
        </>
    )
}
