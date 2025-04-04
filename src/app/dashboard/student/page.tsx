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
  subm_id: number;
  is_submitted?: boolean;
}

interface Feedback {
  grade: number;
  comment: string;
}

export default function StudentAssignments() {
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [files, setFiles] = useState<{ [id: number]: File | null }>({});
  const [status, setStatus] = useState<{ [id: number]: string | null }>({});
  const [feedbacks, setFeedbacks] = useState<{ [subm_id: number]: Feedback }>({});

  useEffect(() => {
    const id = sessionStorage.getItem("studentId");
    if (!id) return router.push("/");
    setStudentId(id);

    // Fetch assignments
    axios
      .get(`https://ai-teacher-api-xnd1.onrender.com/student/assignments/${id}`)
      .then(({ data }) => setAssignments(data))
      .catch(() => setStatus({ 0: "Error fetching assignments." }));

    // Fetch all feedbacks
    axios
      .get(`https://ai-teacher-api-xnd1.onrender.com/student/submissions/${id}`)
      .then(({ data }) => {
        const mapped: { [key: number]: Feedback } = {};
        data.forEach((entry: any) => {
          mapped[entry.sub_id] = {
            grade: entry.grade,
            comment: entry.feedback,
          };
        });
        setFeedbacks(mapped);
      })
      .catch(() => {
        console.error("Failed to fetch feedbacks");
      });
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
                <strong>Due Date:</strong> {assignment.due_date.split("T")[0]}
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
                      handleFileChange(assignment.id, e.target.files?.[0] || null)
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

              {/* Feedback Display */}
              {(() => {
                const feedback = feedbacks[assignment.subm_id];
                if (!feedback) return null;

                return (
                  <div className="bg-gray-50 p-2 border rounded">
                    <p>
                      <strong>Grade:</strong>{" "}
                      {typeof feedback.grade === "number" && feedback.grade >= 0
                        ? feedback.grade
                        : "Not graded"}
                    </p>
                    <p>
                      <strong>Feedback:</strong>{" "}
                      {feedback.comment || "No feedback available."}
                    </p>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
