"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Upload,
  Users,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeacherLogin } from "./TeacherLogin"

export function Header() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Easy Submission",
      description: "Students can upload assignments in multiple formats with just a few clicks.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Deadline Tracking",
      description: "Automatic reminders and countdown timers for upcoming assignment deadlines.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Detailed Feedback",
      description: "Teachers can provide in-line comments and annotations on submitted work.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Grading Tools",
      description: "Customizable rubrics and grading scales to streamline assessment.",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Communication",
      description: "Built-in messaging system for questions and clarifications.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Class Management",
      description: "Organize students into classes and manage multiple courses simultaneously.",
    },
  ]

  const counters = [
    { value: 10000, label: "Students" },
    { value: 500, label: "Schools" },
    { value: 2500, label: "Teachers" },
    { value: 1000000, label: "Assignments" },
  ]

  return (

      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-gray-950/70 border-b border-slate-200 dark:border-slate-800 ">
        <div className="container flex h-16 items-center justify-between py-4 px-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              AssignmentHub
            </span>
          </motion.div>
          <nav className="hidden md:flex items-center gap-6">
            {["Features", "How It Works", "Testimonials", "Pricing"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
              >
                <Link
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-medium relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 transition-all group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
          
            <Dialog>
            <DialogTrigger>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
              Log in
            </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                      <TabsTrigger value="Teacher">Teacher</TabsTrigger>
                      <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Teacher">
                      <TeacherLogin/>
                    </TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent>
                  </Tabs>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          </motion.div>
        </div>
      </header>
  )
}