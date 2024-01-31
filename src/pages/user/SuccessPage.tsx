import React from "react";

function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <main className="flex max-w-md flex-col items-center space-y-8 rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold text-green-700">success</h1>
        <p>Congatulations! You have Completed The Quiz</p>
      </main>
    </div>
  );
}

export default SuccessPage;
