"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

export default function UploadAssignment() {
  const router = useRouter();
  const [teacherID, setTeacherID] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [classId, setClassId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false); 

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const id = sessionStorage.getItem("teacherId");
      if (!id) {
        router.push("/");
      } else {
        setTeacherID(id);
      }
    }
  }, [router]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    } else {
      toast.error("Please select a file!");
    }
  };

  const handleUpload = async () => {
    if (!title || !dueDate || !classId || !file) {
      toast.error("All fields are required!");
      return;
    }

    if (!teacherID) {
      toast.error("Teacher ID not found!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("due_date", dueDate);
    formData.append("teacher_id", teacherID);
    formData.append("class_id", classId);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://ai-teacher-api-xnd1.onrender.com/teacher/add_assignment",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Assignment uploaded successfully!");
      console.log(response.data);
      router.push("/dashboard/teacher/assignments"); // Redirect after successful upload
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error uploading assignment.";
      toast.error(errorMessage);
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null; // Prevents hydration errors

  if (!teacherID) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96 shadow-lg border border-gray-200 p-4">
        <CardHeader>
          <CardTitle className="text-lg">Upload Assignment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">Teacher ID: {teacherID}</p>
          <Input
            type="text"
            placeholder="Enter assignment title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Class ID"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          />
          <Input type="file" onChange={handleFileChange} />
          <Button onClick={handleUpload} className="w-full" disabled={loading}>
            {loading ? "Uploading..." : "Upload Assignment"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
