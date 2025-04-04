"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Assignment {
  id: number;
  title: string;
  cloudinary_url: string;
  due_date: string;
  Cname: string;
  is_submitted?: boolean; // assume this is returned by the API
}

export default function StudentAssignments() {
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [files, setFiles] = useState<{ [id: number]: File | null }>({});
  const [status, setStatus] = useState<{ [id: number]: string | null }>({});

  useEffect(() => {
    const id = sessionStorage.getItem("studentId");
    if (!id) return router.push("/"); // Redirect if studentId not found
    setStudentId(id);

    axios
      .get(`https://ai-teacher-api-xnd1.onrender.com/student/assignments/${id}`)
      .then(({ data }) => setAssignments(data))
      .catch(() => setStatus({ 0: "Error fetching assignments." }));
  }, [router]);

  const handleFileChange = (assignmentId: number, file: File | null) => {
    setFiles((prev) => ({ ...prev, [assignmentId]: file }));
  };

  const handleSubmit = async (assignmentId: number) => {
    if (!files[assignmentId] || !studentId) {
      return setStatus((prev) => ({
        ...prev,
        [assignmentId]: "Please select a file.",
      }));
    }

    const formData = new FormData();
    formData.append("assignment_id", assignmentId.toString());
    formData.append("student_id", studentId);
    formData.append("file", files[assignmentId] as File);

    setStatus((prev) => ({ ...prev, [assignmentId]: "Submitting..." }));

    try {
      await axios.post(
        "https://ai-teacher-api-xnd1.onrender.com/student/submit_assignment/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setStatus((prev) => ({
        ...prev,
        [assignmentId]: "Submitted successfully!",
      }));

      // Update assignment status after successful submission
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === assignmentId ? { ...a, is_submitted: true } : a
        )
      );
    } catch {
      setStatus((prev) => ({
        ...prev,
        [assignmentId]: "Submission failed.",
      }));
    }
  };

  if (!assignments.length)
    return <p className="text-center text-gray-500">Loading assignments...</p>;

  return (
    <div className="flex justify-center items-center">
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <Card
            key={assignment.id}
            className="w-96 shadow-lg border border-gray-200"
          >
            <CardHeader>
              <CardTitle className="text-xl">{assignment.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Assignment ID:</strong> {assignment.id}
              </p>
              <p>
                <strong>Class:</strong> {assignment.Cname}
              </p>
              <p>
                <strong>Due Date:</strong>{" "}
                {assignment.due_date.split("T")[0]}
              </p>
              <p>
                <strong>File:</strong>{" "}
                <a
                  href={assignment.cloudinary_url}
                  target="_blank"
                  className="text-blue-500"
                >
                  View
                </a>
              </p>

              {!assignment.is_submitted ? (
                <>
                  <Input
                    type="file"
                    onChange={(e) =>
                      handleFileChange(
                        assignment.id,
                        e.target.files?.[0] || null
                      )
                    }
                  />
                  <Button
                    onClick={() => handleSubmit(assignment.id)}
                    disabled={status[assignment.id] === "Submitting..."}
                  >
                    {status[assignment.id] === "Submitting..."
                      ? "Submitting..."
                      : "Submit"}
                  </Button>
                </>
              ) : (
                <p className="text-green-600">Assignment already submitted.</p>
              )}

              {status[assignment.id] && (
                <p className="text-blue-500">{status[assignment.id]}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
