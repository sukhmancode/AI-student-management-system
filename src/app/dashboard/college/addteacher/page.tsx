/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Sidebar from "../components/Sidebar";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/index.scss";
import "../styles/sidebar.scss";
import "../styles/addteacher.scss";
import axios from "axios";

interface Data {
  id: string | number;
  name: string;
  email: string;
  number: number | string;
  pass: string;
}

export default function page() {
  const [collegeid, setCollegeId] = useState<string | null>();
  const [collegeName, setCollegeName] = useState<string>();
  const idRef = useRef<HTMLInputElement | null>(null);
  const name = useRef<HTMLInputElement | null>(null);
  const email = useRef<HTMLInputElement | null>(null);
  const pass = useRef<HTMLInputElement | null>(null);
  const pnumber = useRef<HTMLInputElement | null>(null);
  const [loading, setloading] = useState<boolean>(false);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setloading(true);
    const obj: Data = {
      id: 0,
      name: "",
      email: "",
      number: 0,
      pass: "",
    };
    if (
      idRef.current &&
      name.current &&
      email.current &&
      pass.current &&
      pnumber.current
    ) {
      obj.id = idRef.current.value;
      obj.email = email.current.value;
      obj.name = name.current.value;
      obj.number = pnumber.current.value;
      obj.pass = pass.current.value;
    }
  };

  const handleCollegeDetails = (collegeid: string) => {
    const url1 = `https://ai-teacher-api-xnd1.onrender.com/college/${collegeid}/details
        `;
    axios
      .get(url1)
      .then(({ data }) => {
        console.log(data);
        setCollegeName(data.Colname);
      })
      .catch(() => {
        console.log("error");
      });
  };
  useEffect(() => {
    const collegeId = sessionStorage.getItem("collegeId");
    setCollegeId(collegeId);
    if (collegeId) handleCollegeDetails(collegeId);
  }, []);
  return (
    <>
      <div className="add-teacher-container  flex  ">
        <div className="sidebar-container-page ">
          <Sidebar />
        </div>
        <div className="content-container w-full">
          <div className="navbar">
            <Navbar />
          </div>
          <div className="add-teacher-content-container">
            <h2 className="welcome-message"> Welcome, {collegeName}</h2>
            <div className="flex justify-center">
              <div className="add-teacher-form-container flex  bg-muted/40">
                <h2 className="p-3 pl-5 text-2xl font-bold">Add Teacher</h2>
                <form
                  action=""
                  className="add-teacher-form "
                  onSubmit={handleFormSubmit}
                >
                  <div className="input-wrapper">
                    <label htmlFor="tid">Teacher Id:</label>
                    <input
                      type="number"
                      id="tid"
                      placeholder="Teacher Id"
                      className="bg-secondary "
                      ref={idRef}
                      required
                    />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="tname">Teacher Name:</label>
                    <input
                      type="text"
                      id="tname"
                      placeholder="Teache Name"
                      className="bg-secondary "
                      ref={name}
                      required
                    />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="temail">Teacher Email:</label>
                    <input
                      type="email"
                      id="temail"
                      placeholder="abc@example.com"
                      className="bg-secondary "
                      ref={email}
                      required
                    />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="tnumber">Teacher Phone Number:</label>
                    <input
                      type="number"
                      id="tnumber"
                      placeholder="+x xxxxx-xx"
                      className="bg-secondary "
                      ref={pnumber}
                      required
                    />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="tpass">Teacher Password:</label>
                    <input
                      type="password"
                      id="tpass"
                      placeholder="Password"
                      className="bg-secondary "
                      ref={pass}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading ? true : false}
                    className="add-button"
                  >
                    Add Teacher
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
