export interface LinkArray {
  href: string;
  value: string;
}

export const SideBarData: LinkArray[] = [
  {
    href: "/dashboard/college/",
    value: "Home",
  },
  {
    href: "/dashboard/college/addteacher",
    value: "Add Teacher",
  },
  {
    href: "/dashboard/college/addstudent",
    value: "Add Student",
  },
  {
    href: "/dashboard/college/viewclasses",
    value: "View Classes",
  },
  {
    href: "/dashboard/college/viewdetails",
    value: "View Details",
  },
  {
    href: "/dashboard/college/viewteachers",
    value: "View Teachers",
  },
  // {
  //   href: "/dashboard/college/enroll",
  //   value: "Enroll Students",
  // },
];
