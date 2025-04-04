"use client";
import React from "react";
import { SideBarData } from "../data/SideBar";
import Link from "next/link";
import { BookOpen, X } from "lucide-react";
import "../styles/sidebar.scss";
interface Props {
  visible?: boolean;
  onclose?: () => void;
}
export default function Sidebar({ visible, onclose }: Props) {
  return (
    <>
      <div
        className={`sidebar-container bg-muted/40   ${
          visible ? " z-9" : " none"
        }  `}
      >
        <div className="sidebar-header">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="sidebar-comapany-name text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mt-2">
            EduFlow
          </span>
          <span className="cross" onClick={onclose}>
            <X />
          </span>
        </div>
        <div className="sidebar-link-container">
          <h2>College Dashboard</h2>
          {SideBarData.map((data, index) => {
            return (
              <div className="sidebar-container-link" key={index}>
                <Link
                  className="text-muted-foreground hover:text-foreground flex items-center gap-3 p-2 rounded-lg transition-all hover:text-primary"
                  href={data.href}
                >
                  {data.value}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
