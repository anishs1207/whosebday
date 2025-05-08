import React, { useState } from 'react';
import { Calendar, Search, Plus, ChevronLeft, ChevronRight, Star, Users, Bell, Gift, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <Link href = "/" className="ml-2 text-xl font-bold text-gray-900">WhoseBday</Link>
            </div>
            <div className="flex space-x-4 items-center">
              <Link href="/sign-in" className="px-4 py-2 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50">
                <LogIn className="h-4 w-4 inline-block mr-1" />
                Signin
              </Link>
              <Link href="/sign-up" className="px-4 py-2 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50">
              <UserPlus className="h-4 w-4 inline-block mr-1" />
              Signup
              </Link>
            
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-16 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Never Forget a Birthday Again
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            WhoseBday helps you keep track of important birthdays in your life. Stay organized, 
            never miss a celebration, and make everyone feel special.
          </p>
          <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transform transition hover:scale-105">
            Get Started Free
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Everything you need to manage birthdays
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg inline-flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calendar View</h3>
              <p className="text-gray-600">
                Visual calendar interface showing all birthdays at a glance. Easily track upcoming celebrations.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg inline-flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-600">
                Quickly find birthdays by name or title. Filter and sort to find exactly what you need.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg inline-flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reminders</h3>
              <p className="text-gray-600">
                Get notifications before important dates. Never miss wishing someone on their special day.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Loved by thoughtful people
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-gray-600 mb-4">
                "WhoseBday has transformed how I keep track of birthdays. The calendar view is incredibly helpful!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Sarah Wilson"
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <h4 className="text-sm font-semibold">Sarah Wilson</h4>
                  <p className="text-sm text-gray-500">Product Manager</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-gray-600 mb-4">
                "The search feature is fantastic. I can quickly find anyone's birthday in seconds!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Tom Brooks"
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <h4 className="text-sm font-semibold">Tom Brooks</h4>
                  <p className="text-sm text-gray-500">Team Lead</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-gray-600 mb-4">
                "The reminders ensure I never forget to wish my team members on their birthdays!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Emily Chen"
                  className="h-10 w-10 rounded-full"
                />
                <div className="ml-3">
                  <h4 className="text-sm font-semibold">Emily Chen</h4>
                  <p className="text-sm text-gray-500">HR Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to never miss a birthday?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of thoughtful people who use WhoseBday to stay connected.
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-lg text-lg font-medium hover:bg-indigo-50 transform transition hover:scale-105">
            Start Free Trial
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold text-white">WhoseBday</span>
              </div>
              <p className="text-sm">
                Making birthday celebrations more meaningful and organized.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase mb-4">Features</h3>
              <ul className="space-y-2">
                <li>Calendar View</li>
                <li>Smart Search</li>
                <li>Reminders</li>
                <li>Birthday Analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase mb-4">Company</h3>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white uppercase mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>GDPR</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>© 2024 WhoseBday. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}





