/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Upload,
  Users,
} from "lucide-react";

import "./index.scss";
import { LoginDialog } from "./LoginPopup";

export function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Easy Submission",
      description:
        "Students can upload assignments in multiple formats with just a few clicks.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Deadline Tracking",
      description:
        "Automatic reminders and countdown timers for upcoming assignment deadlines.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Detailed Feedback",
      description:
        "Teachers can provide in-line comments and annotations on submitted work.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Grading Tools",
      description:
        "Customizable rubrics and grading scales to streamline assessment.",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Communication",
      description:
        "Built-in messaging system for questions and clarifications.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Class Management",
      description:
        "Organize students into classes and manage multiple courses simultaneously.",
    },
  ];


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
          <span className="text-xl font-bold bg-clip-text  ">
          EduFlow
          </span>
        </motion.div>
        <nav className="hidden md:flex items-center gap-6">
          {["Features", "How It Works", "Testimonials"].map(
            (item, i) => (
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
            )
          )}
        </nav>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
         <LoginDialog buttonLabel="Log in" buttonClassName="w-full"/>
        </motion.div>
      </div>
    </header>
  );
}
