/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Upload,
  Users,
  ChevronRight,
  ArrowRight,
  Star,
  Sparkles,
  Award,
  Lightbulb,
} from "lucide-react";
import { Header } from "@/frontendComponents/Navbar";
import { useRouter } from "next/navigation";
import "./index.scss";

export default function LandingPage() {
  const router = useRouter();
  const [teacherID, setTeacherID] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isVisible, setIsVisible] = useState(false);

  // Fetch teacherID only on the client side
  useEffect(() => {
    const storedTeacherID = sessionStorage.getItem("teacherId");
    if (storedTeacherID) {
      setTeacherID(storedTeacherID);
    }
  }, []);

  // Redirect if teacherID is available
  useEffect(() => {
    if (teacherID) {
      router.push(`/dashboard/teacher`);
    }
  }, [teacherID, router]);

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

  const counters = [
    { value: 10000, label: "Students" },
    { value: 500, label: "Schools" },
    { value: 2500, label: "Teachers" },
    { value: 1000000, label: "Assignments" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-950 dark:to-slate-900">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-200 opacity-20 blur-3xl dark:bg-purple-900"></div>
        <div className="absolute top-1/3 -left-20 h-60 w-60 rounded-full bg-blue-200 opacity-20 blur-3xl dark:bg-blue-900"></div>
        <div className="absolute bottom-20 right-1/4 h-60 w-60 rounded-full bg-pink-200 opacity-20 blur-3xl dark:bg-pink-900"></div>
      </div>

      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section
          className=" 

 py-12 md:py-24 lg:py-32 overflow-hidden"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    <Sparkles className="mr-1 h-3.5 w-3.5" />
                    <span>Revolutionizing Education</span>
                  </div>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent main-heading">
                    Make Assignment Management Fun & Easy
                  </h1>
                  <p className="max-w-[600px] text-slate-600 dark:text-slate-300 md:text-xl">
                    A colorful, interactive platform where students submit
                    assignments and teachers provide feedback, all in one
                    delightful space.
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <Button
                    size="lg"
                    className="gap-1.5 button-get transition-all duration-200"
                  >
                    Get Started <ChevronRight className="h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex items-center justify-center"
              >
                <div
                  className="relative h-[350px]  

 overflow-hidden rounded-xl border bg-white dark:bg-gray-900 p-2 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 opacity-50"></div>
                  <Image
                    src="/placeholder.svg?height=350&width=500"
                    width={500}
                    height={350}
                    alt="Assignment portal dashboard preview"
                    className="rounded-lg object-cover relative z-10"
                  />
                  <div className="absolute top-2 left-2 right-2 h-6 flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interactive Features Section */}
        <section
          id="features"
          className=" 

 py-12 md:py-24"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-indigo-100 dark:bg-indigo-950 px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300">
                  Interactive Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl  ">
                  Discover Amazing Tools
                </h2>
                <p className="max-w-[700px] text-slate-600 dark:text-slate-300 md:text-xl">
                  Our platform provides powerful tools for both students and
                  teachers to make learning more engaging.
                </p>
              </div>
            </motion.div>

            <div className="mt-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 rounded-xl opacity-50"></div>
              <div className="relative z-10 p-6 rounded-xl overflow-hidden">
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {features.map((feature, index) => (
                    <motion.button
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`p-4 rounded-lg text-left transition-all duration-200 ${
                        activeFeature === index
                          ? "bg-white dark:bg-gray-800 shadow-lg"
                          : "bg-transparent hover:bg-white/50 dark:hover:bg-gray-800/50"
                      }`}
                      onClick={() => setActiveFeature(index)}
                    >
                      <div
                        className={`rounded-full w-10 h-10 flex items-center justify-center mb-3 ${
                          activeFeature === index
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                            : "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300"
                        }`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                    </motion.button>
                  ))}
                </div>

                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
                >
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <div className="rounded-full w-16 h-16 flex items-center justify-center mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                        {features[activeFeature].icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        {features[activeFeature].title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-lg">
                        {features[activeFeature].description}
                      </p>
                      <Button className="mt-6 button-get">Learn More</Button>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 p-4 rounded-xl">
                      <Image
                        src="/placeholder.svg?height=250&width=400"
                        width={400}
                        height={250}
                        alt={`${features[activeFeature].title} feature preview`}
                        className="rounded-lg object-cover  

"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className=" 

 py-12 md:py-24 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-950"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-indigo-100 dark:bg-indigo-950 px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300">
                  Simple Process
                </div>
                <h2 className="text-3xl font-bold  ">How It Works</h2>
                <p className="max-w-[700px] text-slate-600 dark:text-slate-300 md:text-xl">
                  Our platform makes assignment management simple and fun for
                  both students and teachers.
                </p>
              </div>
            </motion.div>

            <Tabs defaultValue="students" className="mt-12">
              <TabsList
                className="grid  

 max-w-md mx-auto grid-cols-2"
              >
                <TabsTrigger value="students" className="text-base">
                  For Students
                </TabsTrigger>
                <TabsTrigger value="teachers" className="text-base">
                  For Teachers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="students" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      icon: <Users className="h-6 w-6" />,
                      title: "Create Account",
                      description:
                        "Sign up with your school email and join your class with a code.",
                    },
                    {
                      icon: <FileText className="h-6 w-6" />,
                      title: "View Assignments",
                      description:
                        "See all your assignments, due dates, and requirements in one place.",
                    },
                    {
                      icon: <Upload className="h-6 w-6" />,
                      title: "Submit Work",
                      description:
                        "Upload your completed assignments before the deadline.",
                    },
                    {
                      icon: <MessageSquare className="h-6 w-6" />,
                      title: "Get Feedback",
                      description:
                        "Receive detailed comments and grades from your teacher.",
                    },
                  ].map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white w-8 h-8 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <Card className="mt-6 overflow-hidden border-indigo-100 dark:border-indigo-800">
                        <CardContent className="pt-6">
                          <div className="rounded-full w-12 h-12 flex items-center justify-center mb-4 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                            {step.icon}
                          </div>
                          <h3 className="font-bold text-xl mb-2">
                            {step.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300">
                            {step.description}
                          </p>
                        </CardContent>
                      </Card>
                      {index < 3 && (
                        <div className="hidden lg:block absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 text-indigo-300 dark:text-indigo-700">
                          <ArrowRight className="h-6 w-6" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="teachers" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      icon: <Users className="h-6 w-6" />,
                      title: "Set Up Classes",
                      description:
                        "Create classes and invite students with a unique code.",
                    },
                    {
                      icon: <FileText className="h-6 w-6" />,
                      title: "Create Assignments",
                      description:
                        "Set up assignments with detailed instructions and due dates.",
                    },
                    {
                      icon: <CheckCircle className="h-6 w-6" />,
                      title: "Review Submissions",
                      description:
                        "Access all student submissions in one organized dashboard.",
                    },
                    {
                      icon: <MessageSquare className="h-6 w-6" />,
                      title: "Provide Feedback",
                      description:
                        "Grade assignments and leave detailed comments for students.",
                    },
                  ].map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white w-8 h-8 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <Card className="mt-6 overflow-hidden border-indigo-100 dark:border-indigo-800">
                        <CardContent className="pt-6">
                          <div className="rounded-full w-12 h-12 flex items-center justify-center mb-4 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                            {step.icon}
                          </div>
                          <h3 className="font-bold text-xl mb-2">
                            {step.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300">
                            {step.description}
                          </p>
                        </CardContent>
                      </Card>
                      {index < 3 && (
                        <div className="hidden lg:block absolute top-1/2 left-full -translate-y-1/2 -translate-x-1/2 text-indigo-300 dark:text-indigo-700">
                          <ArrowRight className="h-6 w-6" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Interface Preview Section */}
        <section
          className=" 

 py-12 md:py-24 overflow-hidden"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-indigo-100 dark:bg-indigo-950 px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300">
                  Interactive Interfaces
                </div>
                <h2 className="text-3xl font-bold ">
                  Beautiful & Intuitive Design
                </h2>
                <p className="max-w-[700px] text-slate-600 dark:text-slate-300 md:text-xl">
                  Designed for simplicity and joy, our platform makes assignment
                  management a delightful experience.
                </p>
              </div>
            </motion.div>

            <div className="mt-12 flex container-for-dashboard">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl container-dashboard">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <div className="mr-2 rounded-full w-8 h-8 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 ">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    Student Dashboard
                  </h3>
                  <div className="relative overflow-hidden rounded-xl border border-indigo-100 dark:border-indigo-800 shadow-lg">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center px-2">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-white/30"></div>
                        <div className="h-2 w-2 rounded-full bg-white/30"></div>
                        <div className="h-2 w-2 rounded-full bg-white/30"></div>
                      </div>
                    </div>
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      width={500}
                      height={300}
                      alt="Student dashboard interface"
                      className="object-cover pt-6"
                    />
                  </div>
                  <p className="mt-4 text-slate-600 dark:text-slate-300">
                    Students can easily track assignments, deadlines, and grades
                    in a colorful, organized dashboard.
                  </p>
                  <div className="mt-4 flex gap-2">
                    {["Assignments", "Calendar", "Grades", "Messages"].map(
                      (item, i) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-300"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-xl container-dashboard">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <div className="mr-2 rounded-full w-8 h-8 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                      <Award className="h-4 w-4" />
                    </div>
                    Teacher Dashboard
                  </h3>
                  <div className="relative overflow-hidden rounded-xl border border-indigo-100 dark:border-indigo-800 shadow-lg">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center px-2">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-white/30"></div>
                        <div className="h-2 w-2 rounded-full bg-white/30"></div>
                        <div className="h-2 w-2 rounded-full bg-white/30"></div>
                      </div>
                    </div>
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      width={500}
                      height={300}
                      alt="Teacher dashboard interface"
                      className="object-cover pt-6"
                    />
                  </div>
                  <p className="mt-4 text-slate-600 dark:text-slate-300">
                    Teachers can manage classes, review submissions, and provide
                    feedback with powerful yet intuitive tools.
                  </p>
                  <div className="mt-4 flex gap-2">
                    {[
                      "Grading",
                      "Analytics",
                      "Class Management",
                      "Feedback",
                    ].map((item, i) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className=" 

 py-12 md:py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-indigo-100 dark:bg-indigo-950 px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300">
                  Success Stories
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  What Our Users Say
                </h2>
                <p className="max-w-[700px] text-slate-600 dark:text-slate-300 md:text-xl">
                  Hear from teachers and students who have transformed their
                  assignment workflow.
                </p>
              </div>
            </motion.div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "AssignmentHub has completely transformed how I manage my classroom. Grading is faster, feedback is more detailed, and students are more engaged.",
                  name: "Dr. Sarah Johnson",
                  role: "High School Science Teacher",
                  stars: 5,
                },
                {
                  quote:
                    "I never miss a deadline now! The reminders and clear instructions make it so much easier to stay on top of my assignments.",
                  name: "Miguel Rodriguez",
                  role: "College Student",
                  stars: 5,
                },
                {
                  quote:
                    "Our university adopted AssignmentHub last year, and we've seen a 40% reduction in late submissions and a significant improvement in student satisfaction.",
                  name: "Prof. James Chen",
                  role: "Department Chair",
                  stars: 5,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                  <div className="relative flex flex-col justify-between h-full space-y-4 rounded-lg bg-white dark:bg-gray-900 p-6 shadow-lg">
                    <div className="space-y-4">
                      <div className="flex">
                        {Array.from({ length: testimonial.stars }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 text-yellow-400 fill-yellow-400"
                            />
                          )
                        )}
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 italic">
                        {testimonial.quote}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className=" py-12 md:py-24 text-white">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Transform Your Assignment Workflow?
                </h2>
                <p className="max-w-[700px] text-indigo-100 md:text-xl">
                  Join thousands of teachers and students who have simplified
                  their academic lives.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-indigo-600 hover:bg-indigo-50 gap-1.5"
                >
                  Get Started for Free <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Schedule a Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section
          className=" 

 py-12 md:py-24"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-indigo-100 dark:bg-indigo-950 px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-300">
                    Stay Updated
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    Subscribe to Our Newsletter
                  </h2>
                  <p className="max-w-[600px] text-slate-600 dark:text-slate-300 md:text-xl">
                    Get the latest updates, tips for better assignment
                    management, and exclusive offers.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <div
                  className=" 

 space-y-2"
                >
                  <form className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 border-indigo-200 dark:border-indigo-800 focus-visible:ring-indigo-500"
                    />
                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
                      Subscribe
                    </Button>
                  </form>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer
        className=" 

 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-950"
      >
        <div className="container px-4 py-12 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                  AssignmentHub
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">
                Simplifying assignment management for students and teachers
                worldwide.
              </p>
              <div className="flex space-x-4">
                {["twitter", "facebook", "instagram", "github"].map(
                  (social) => (
                    <Link
                      key={social}
                      href="#"
                      className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
                    >
                      <span className="sr-only">{social}</span>
                      <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <span className="text-xs">
                          {social.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} AssignmentHub. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
