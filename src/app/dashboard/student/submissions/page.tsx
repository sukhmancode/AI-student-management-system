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

interface FeedbackData {
  grade: number;
  comment: string;
}

export default function Submissions() {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState<{ [sub_id: number]: FeedbackData | null }>({});
  const [visibleFeedbacks, setVisibleFeedbacks] = useState<{ [sub_id: number]: boolean }>({});
  const [typedFeedbacks, setTypedFeedbacks] = useState<{ [sub_id: number]: string }>({});
  const [typingFeedback, setTypingFeedback] = useState<number | null>(null); // ✅ new state

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
      setTypedFeedbacks((prev) => ({
        ...prev,
        [sub_id]: text.slice(0, i + 1),
      }));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTypingFeedback(null); // ✅ stop typing
      }
    }, speed);
  };

  const getFeedback = async (ass_id: number, sub_id: number) => {
    if (!studentId) return;

    if (feedbacks[sub_id]) {
      setVisibleFeedbacks((prev) => ({
        ...prev,
        [sub_id]: !prev[sub_id],
      }));
      return;
    }

    try {
      setTypingFeedback(sub_id); // ✅ start typing
      const { data } = await axios.get(
        `https://ai-teacher-api-xnd1.onrender.com/student/FeedBack/${studentId}/${ass_id}/${sub_id}`
      );

      const comment = data.FeedBack || "No feedback available.";

      setFeedbacks((prev) => ({
        ...prev,
        [sub_id]: {
          grade: data.Grade,
          comment,
        },
      }));

      setTypedFeedbacks((prev) => ({
        ...prev,
        [sub_id]: "",
      }));

      setVisibleFeedbacks((prev) => ({
        ...prev,
        [sub_id]: true,
      }));

      typeFeedback(sub_id, comment);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setFeedbacks((prev) => ({
        ...prev,
        [sub_id]: null,
      }));
      setTypingFeedback(null); // ✅ clear typing on error
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
                onClick={() => getFeedback(submission.assignment_id, submission.sub_id)}
                disabled={typingFeedback === submission.sub_id}
              >
                {typingFeedback === submission.sub_id
                  ? "Typing..."
                  : visibleFeedbacks[submission.sub_id]
                  ? "Hide Feedback"
                  : "View Feedback"}
              </Button>

              {visibleFeedbacks[submission.sub_id] && (
                <div className="mt-2 p-3 border rounded">
                  {feedbacks[submission.sub_id] ? (
                    <>
                      <p>
                        <strong className="text-2xl">Grade:</strong>{" "}
                        {feedbacks[submission.sub_id]?.grade ?? "N/A"}
                      </p>
                      <p>
                        <strong className="text-2xl">Feedback:</strong>{" "}
                        <span className="whitespace-pre-line">
                          {typedFeedbacks[submission.sub_id]?.length ? (
                            <>
                              {typedFeedbacks[submission.sub_id]}
                              {typedFeedbacks[submission.sub_id]?.length !==
                                feedbacks[submission.sub_id]?.comment?.length && (
                                <span className="animate-pulse">|</span>
                              )}
                            </>
                          ) : (
                            <span className="italic text-gray-500 animate-pulse">typing...</span>
                          )}
                        </span>
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500">No feedback available.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
