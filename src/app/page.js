"use client";
import { useState } from "react";

export default function Home() {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  let mediaRecorder;
  let chunks = [];

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    setRecording(true);

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/mp3" });
      setAudioUrl(URL.createObjectURL(blob));
      chunks = [];
      setRecording(false);
    };
  }

  function stopRecording() {
    mediaRecorder.stop();
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8">Voice SNS</h1>

      {!recording ? (
        <button
          onClick={startRecording}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg mb-8 hover:bg-blue-600"
        >
          🎤 Start Recording
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="bg-red-500 text-white px-6 py-3 rounded-lg mb-8 hover:bg-red-600"
        >
          ⏹ Stop Recording
        </button>
      )}

      {audioUrl && (
        <audio controls src={audioUrl} className="mt-4"></audio>
      )}
    </main>
  );
}

