"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

// Define student interface
interface Student {
  id: number;
  Sname: string;
  Semail: string;
  Scontact: string;
  college_id: number;
  Spass?: string;
}

export default function Profile() {
  const { student_id } = useParams();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student_id) return;

    const fetchStudent = async () => {
      try {
        const res = await axios.get<Student>(
          `https://ai-teacher-api-xnd1.onrender.com/student/${student_id}/details`
        );
        setStudent(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch student profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [student_id]);

  if (loading) {
    return <div className="p-4">Loading student profile...</div>;
  }

  if (!student) {
    return <div className="p-4">Student not found.</div>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{student.Sname}</CardTitle>
          <CardDescription>Student ID: {student.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <strong>Email:</strong> {student.Semail}
          </div>
          <div>
            <strong>Contact:</strong> {student.Scontact}
          </div>
          <div>
            <strong>College ID:</strong> {student.college_id}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
