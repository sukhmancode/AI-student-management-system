"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Student {
  id: number;
  title: string;
  cloudinary_url: string;
  due_date: string;
  Cname: string;
}

export default function Student() {

    
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);  // Changed to array of students
  const [loading, setLoading] = useState(true);
  const [StudentId, setStudentId] = useState<string | null>(null);

  useEffect(() => {
    const storedStudentId = sessionStorage.getItem("studentId");
    if (!storedStudentId) {
      router.push("/"); // Redirect if no StudentId found
      return;
    }
    setStudentId(storedStudentId);
  }, [router]);

  // Fetch student details once StudentId is available
  useEffect(() => {
    if (!StudentId) return;

    axios
      .get(`https://ai-teacher-api-xnd1.onrender.com/student/assignments/${StudentId}`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student details:", error);
      })
      .finally(() => setLoading(false));
  }, [StudentId]);

  if (loading) return <p className="text-center text-gray-500">Loading student details...</p>;

  return (
    <div className="flex justify-center items-center  ">
      <div className="space-y-4">
        {students.length > 0 ? (
          students.map((student) => (
            
            <Card key={student.id} className="w-96 shadow-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl">Student Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {student.title}</p>
                  <p><strong>Student ID:</strong> {student.id}</p>
                  <p className="text-red-500"><strong>Assignment URL:</strong> <a href={student.cloudinary_url} target="_blank" rel="noopener noreferrer">View</a></p>
                  <p><strong>Due Date:</strong> {student.due_date.split('T00:00:00')}</p>
                  <p><strong>Class Name:</strong> {student.Cname}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-red-500">No student details found.</p>
        )}
      </div>
    </div>
  );
}
