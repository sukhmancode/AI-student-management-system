"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!message.trim()) return;

    setResponse("Typing...");
    setTimeout(() => {
      setResponse(`You said: ${message}`);
    }, 1000);

    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center  p-4 space-y-4">
      <div className="w-full max-w-md  p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center">Chatbot</h1>

        <div className="space-y-2">
          <textarea
            className="w-full border p-2 rounded resize-none"
            rows={3}
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button onClick={handleSend} className="w-full">
            Send
          </Button>

          {response && (
            <div className="mt-4 p-3 border rounded bg-secondary text-sm text-gray-800">
              {response}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
