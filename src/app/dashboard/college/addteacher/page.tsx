/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/index.scss";
import "../styles/sidebar.scss";
import "../styles/addteacher.scss";
import axios from "axios";

export default function Page() {
  const [collegeId, setCollegeId] = useState<string | null>();
  const [collegeName, setCollegeName] = useState<string>();
  const idRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (idRef.current && nameRef.current && passRef.current && collegeId) {
      try {
        const payload = {
          id: parseInt(idRef.current.value),
          Sname: nameRef.current.value,
          Spass: passRef.current.value,
          college_id: parseInt(collegeId),
        };

        const response = await axios.post(
          "https://ai-teacher-api-xnd1.onrender.com/college/add_student/",
          payload
        );

        if (response.status === 200 && response.data.Message === "Success") {
          alert("Student added successfully!");

          // Clear inputs
          idRef.current.value = "";
          nameRef.current.value = "";
          passRef.current.value = "";
        } else {
          alert("Failed to add student. Please check the data.");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong while adding the student.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill all required fields.");
      setLoading(false);
    }
  };

  const handleCollegeDetails = (collegeId: string) => {
    const url = `https://ai-teacher-api-xnd1.onrender.com/college/${collegeId}/details`;
    axios
      .get(url)
      .then(({ data }) => {
        setCollegeName(data.Colname);
      })
      .catch(() => {
        console.log("error");
      });
  };

  useEffect(() => {
    const storedCollegeId = sessionStorage.getItem("collegeId");
    setCollegeId(storedCollegeId);
    if (storedCollegeId) handleCollegeDetails(storedCollegeId);
  }, []);

  return (
    <div className="add-teacher-container flex">
      <div className="sidebar-container-page">
        <Sidebar />
      </div>
      <div className="content-container w-full">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="add-teacher-content-container">
          <h2 className="welcome-message">Welcome, {collegeName}</h2>
          <div className="flex justify-center">
            <div className="add-teacher-form-container flex bg-muted/40">
              <h2 className="p-3 pl-5 text-2xl font-bold">Add Student</h2>
              <form
                className="add-teacher-form"
                onSubmit={handleFormSubmit}
              >
                <div className="input-wrapper">
                  <label htmlFor="sid">Student ID:</label>
                  <input
                    type="number"
                    id="sid"
                    placeholder="Student ID"
                    className="bg-secondary"
                    ref={idRef}
                    required
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="sname">Student Name:</label>
                  <input
                    type="text"
                    id="sname"
                    placeholder="Student Name"
                    className="bg-secondary"
                    ref={nameRef}
                    required
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="spass">Student Password:</label>
                  <input
                    type="password"
                    id="spass"
                    placeholder="Password"
                    className="bg-secondary"
                    ref={passRef}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="add-button"
                >
                  {loading ? "Adding..." : "Add Student"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
