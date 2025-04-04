"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Link, Menu, PersonStandingIcon } from "lucide-react";
import React, { useState } from "react";
import "../styles/sidebar.scss";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <div className="navbar-container  flex items-center justify-between bg-muted/40 w-full">
        <div className="menu p-3 ">
          <Button className="md:hidden shrink-0" size="icon" variant="outline">
            <span onClick={handleClick}>
              <Menu className="size-5" />
            </span>
            {<Sidebar visible={isVisible} onclose={handleClick} />}
          </Button>
        </div>
        <div className="porfile pr-3 md:p-3.5 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full">
                <PersonStandingIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  "use client";
                  sessionStorage.removeItem("teacherId");
                  sessionStorage.removeItem("collegeId");
                  sessionStorage.removeItem("studentId");
                  window.location.href="/"
                }}
              >
                Logout {/* Add logout functionality here */}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
