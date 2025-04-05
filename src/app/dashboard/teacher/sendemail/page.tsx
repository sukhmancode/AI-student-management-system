"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

export default function SendMail() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    if (!email || !message) {
      toast.error("Please fill out both fields.");
      return;
    }

    setLoading(true);

    try {
      // Replace this with your actual backend endpoint
      await axios.post("https://your-api/send-email", {
        email,
        message,
      });

      toast.success("Email sent successfully!");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center  p-4">
      <div className="w-full max-w-md  shadow-md p-6 rounded space-y-4">
        <h2 className="text-2xl font-bold text-center">Send Email to Student</h2>

        <Input
          type="email"
          placeholder="Student's Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Your Message"
          rows={5}
          className="w-full border border-gray-300 p-2 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button onClick={handleSendEmail} disabled={loading} className="w-full">
          {loading ? "Sending..." : "Send Email"}
        </Button>
      </div>
    </div>
  );
}
