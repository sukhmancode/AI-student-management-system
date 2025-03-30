"use client";
import { cn } from "@/lib/utils";
import {
  FilePlus,
  User,
  FileBarChart,
  BookOpenText,
  CalendarDays,
  Users,
  GraduationCap,
  LucideProps,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavProps {
  id: number;
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

// Student Links
export const studentLinks: NavProps[] = [
  {
    id: 0,
    name: "Submit Assignment",
    href: "/dashboard/student/assignmentsubmit",
    icon: FilePlus, // 📝 Submission Icon
  },
  {
    id: 1,
    name: "View Profile",
    href: "/dashboard/student/profile",
    icon: User, // 👤 Profile Icon
  },
  {
    id: 2,
    name: "Reports",
    href: "/dashboard/student/reports",
    icon: FileBarChart, // 📊 Reports Icon
  },
];

// Teacher Links
export const teacherLinks: NavProps[] = [
  {
    id: 0,
    name: "Upload Assignments",
    href: "/dashboard/teacher/assignments",
    icon: FilePlus, // 📝 Assignment Upload Icon
  },
  {
    id: 1,
    name: "Class Schedule",
    href: "/dashboard/teacher/schedule",
    icon: CalendarDays, // 📅 Schedule Icon
  },
  {
    id: 2,
    name: "Student Reports",
    href: "/dashboard/teacher/reports",
    icon: FileBarChart, // 📊 Reports Icon
  },
  {
    id: 3,
    name: "View Classes",
    href: "/dashboard/teacher/classes",
    icon: BookOpenText, // 📖 Classes Icon
  },
  {
    id: 4,
    name: "View Students",
    href: "/dashboard/teacher/students",
    icon: Users, // 👥 Students Icon
  },
  {
    id: 5,
    name: "View Profile",
    href: "/dashboard/teacher/profile",
    icon: GraduationCap, // 🎓 Profile Icon
  },
];

interface DashboardLinksProps {
  role: "student" | "teacher";
}

export const DashboardLinks = ({ role }: DashboardLinksProps) => {
  const pathname = usePathname();
  const links = role === "student" ? studentLinks : teacherLinks;

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">{role === "student" ? "Student Dashboard" : "Teacher Dashboard"}</h2>
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={`${cn(
            pathname === link.href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
          )} flex items-center gap-3 p-2 rounded-lg transition-all hover:text-primary`}
        >
          <link.icon className="size-4" />
          <p className="text-xl">{link.name}</p>
        </Link>
      ))}
    </div>
  );
};
