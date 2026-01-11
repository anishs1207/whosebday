import { Gift, Bell, Users } from "lucide-react";

export default function Features() {
  return (
    <section className="py-16 bg-gray-900">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Main Features</h2>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Reminders */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-md">
            <Bell className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Smart Reminders</h3>
            <p className="text-gray-400">
              Stay on top of birthdays, anniversaries, and events with timely notifications—so you never miss a special day again.
            </p>
          </div>

          {/* Add & Manage Events */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-md">
            <Gift className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Manage Important Dates</h3>
            <p className="text-gray-400">
              Easily add, edit, and delete birthdays, events, and anniversaries in just a few taps.
            </p>
          </div>

          {/* Calendar View */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-md">
            <Users className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Calendar Overview</h3>
            <p className="text-gray-400">
              View all your upcoming events in a clean, organized calendar interface for quick access and planning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
