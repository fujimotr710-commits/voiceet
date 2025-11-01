export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* ヘッダー */}
      <h1 className="text-3xl font-bold mb-8">Voice SNS</h1>

      {/* 録音ボタン */}
      <button className="bg-blue-500 text-white px-6 py-3 rounded-lg mb-8 hover:bg-blue-600">
        🎤 Record Voice
      </button>

      {/* 投稿一覧 */}
      <div className="w-full max-w-md space-y-4">
        {/* ダミー投稿 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-700">User1: Hello, this is a sample voice post!</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-700">User2: Another sample post!</p>
        </div>
      </div>
    </main>
  );
}

