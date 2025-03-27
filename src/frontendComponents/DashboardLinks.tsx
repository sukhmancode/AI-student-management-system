"use client"
import { cn } from "@/lib/utils"
import { CalendarCheck, HomeIcon, LucideProps, Settings, Users2 ,MonitorCheck, PersonStandingIcon} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavProps {
    id:number,
    name:string,
    href:string,
    icon:React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

export const dashboardLinks:NavProps[] = [
    {
        id:0,
        name:'Submit Assignment',
        href:'/dashboard/student/assignmentsubmit',
        icon:MonitorCheck
    },
    {
        id:1,
        name:'Add Product',
        href:'/dashboard/addproduct',
        icon:Users2
    }, 
    {
        id:2,
        name:"Revenue",
        href:'/dashboard/reports',
        icon:CalendarCheck
    }
    ,{
        id:3,
        name:"Suppliers",
        href:'/dashboard/suppliers',
        icon:PersonStandingIcon
    },{
        id:4,
        name:"Low Stock",
        href:'/dashboard/lowstock',
        icon:PersonStandingIcon
    }
]
export const DashboardLinks = () => {
    const pathname = usePathname();
  return (
    <div>
        {
        dashboardLinks.map((link) => {
        return  <Link key={link.id} href={link.href} className={`${cn(
            pathname === link.href ? 'text-primary bg-primary/10': 'text-muted-foreground hover:text-foreground'
        )} flex items-center gap-3 p-2 rounded-lg transition-all hover:text-primary`} >
                    <link.icon className="size-4"  />
                    <p className="text-2xl"> {link.name}</p>
                </Link>
            })
        }
    </div>
  )
}
