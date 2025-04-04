"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface Submission {
  sub_id: number;
  cloudinary_url: string;
  submitted_at: string;
  grade: number | null;
  feedback: string | null;
}

export default function Submissions() {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = sessionStorage.getItem("studentId");
    if (!id) return;
    setStudentId(id);

    axios
      .get(`https://ai-teacher-api-xnd1.onrender.com/student/submissions/${id}`)
      .then(({ data }) => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        console.error("Failed to load submissions");
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading submissions...</p>;
  }

  if (!submissions.length) {
    return <p className="text-center text-gray-500">No submissions found.</p>;
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="space-y-4 w-full max-w-xl">
        {submissions.map((submission) => (
          <Card key={submission.sub_id} className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Submission ID: {submission.sub_id}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>Submitted At:</strong>{" "}
                {new Date(submission.submitted_at).toLocaleString()}
              </p>
              <p>
                <strong>File:</strong>{" "}
                <a
                  href={submission.cloudinary_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View PDF
                </a>
              </p>
              <p>
                <strong>Grade:</strong>{" "}
                {submission.grade !== null ? submission.grade : "Not graded"}
              </p>
              <p>
                <strong>Feedback:</strong>{" "}
                {submission.feedback || "No feedback available."}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
