"use client";
import { useState } from "react";

export default function Home() {
  const [recording, setRecording] = useState(false);
  const [audios, setAudios] = useState([]); // 履歴を保存する配列
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
      const url = URL.createObjectURL(blob);
      setAudios((prev) => [...prev, url]); // 履歴に追加
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

      {/* 録音履歴一覧 */}
      <div className="w-full max-w-md space-y-4">
        {audios.map((url, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <audio controls src={url} className="w-full"></audio>
          </div>
        ))}
      </div>
    </main>
  );
}

