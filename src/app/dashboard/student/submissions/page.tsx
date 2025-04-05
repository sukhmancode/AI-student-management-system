"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Submission {
  sub_id: number;
  assignment_id: number;
  cloudinary_url: string;
  submitted_at: string;
  grade: number | null;
  feedback: string | null;
}

export default function Submissions() {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedbackState, setFeedbackState] = useState<{ [sub_id: number]: string }>({});
  const [visible, setVisible] = useState<{ [sub_id: number]: boolean }>({});
  const [typing, setTyping] = useState<number | null>(null);

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

  const typeFeedback = (sub_id: number, text: string) => {
    let i = 0;
    const speed = 20;
    const interval = setInterval(() => {
      setFeedbackState((prev) => ({
        ...prev,
        [sub_id]: text.slice(0, i + 1),
      }));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTyping(null);
      }
    }, speed);
  };

  const getOrGenerateFeedback = async (submission: Submission) => {
    const { assignment_id, sub_id, feedback, cloudinary_url } = submission;
    if (!studentId) return;

    // If already fetched, toggle visibility
    if (feedbackState[sub_id]) {
      setVisible((prev) => ({
        ...prev,
        [sub_id]: !prev[sub_id],
      }));
      return;
    }

    try {
      setTyping(sub_id);

      let finalFeedback = feedback;

      // If no feedback exists, generate one
      if (!feedback) {
        const { data } = await axios.get(
          `https://ai-teacher-api-xnd1.onrender.com/student/FeedBack/${studentId}/${assignment_id}/${sub_id}`
        );
        finalFeedback = data.FeedBack || "No feedback available.";
      }

      setFeedbackState((prev) => ({
        ...prev,
        [sub_id]: "",
      }));

      setVisible((prev) => ({
        ...prev,
        [sub_id]: true,
      }));

      typeFeedback(sub_id, finalFeedback as string);
    } catch (err) {
      console.error("Error fetching/generating feedback", err);
      setTyping(null);
    }
  };

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
                <strong>Assignment ID:</strong> {submission.assignment_id}
              </p>
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

              <Button
                onClick={() => getOrGenerateFeedback(submission)}
                disabled={typing === submission.sub_id}
              >
                {typing === submission.sub_id
                  ? "Typing..."
                  : visible[submission.sub_id]
                  ? "Hide Feedback"
                  : "View Feedback"}
              </Button>

              {visible[submission.sub_id] && (
                <div className="mt-2 p-3 border rounded">
                  <p>
                    <strong className="text-2xl">Grade:</strong>{" "}
                    {submission.grade ?? "N/A"}
                  </p>
                  <p>
                    <strong className="text-2xl">Feedback:</strong>{" "}
                    <span className="whitespace-pre-line">
                      {feedbackState[submission.sub_id] ? (
                        <>
                          {feedbackState[submission.sub_id]}
                          {feedbackState[submission.sub_id]?.length <
                            (submission.feedback?.length || 0) && (
                            <span className="animate-pulse">|</span>
                          )}
                        </>
                      ) : (
                        <span className="italic text-gray-500 animate-pulse">
                          typing...
                        </span>
                      )}
                    </span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
