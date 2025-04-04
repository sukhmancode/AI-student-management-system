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
    name: "View Submissions",
    href: "/dashboard/student/submissions",
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
    name: "View Students",
    href: "/dashboard/teacher/students",
    icon: Users, // 👥 Students Icon
  },
  {
    id: 2,
    name: "View Profile",
    href: "/dashboard/teacher/profile",
    icon: GraduationCap, 
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
