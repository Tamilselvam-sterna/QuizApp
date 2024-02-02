import React from "react";

function SuccessPage() {
  const userName = localStorage.getItem("firstName");
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <main className="flex h-[200px] flex-col items-center space-y-8 rounded-lg bg-white p-8 shadow-md ">
        <h1 className="text-xl font-bold text-green-700">
          Thank you {userName} for attending the first round of this interview!
        </h1>
        <p className="font-bold">
          We'll inform the results to you within two weeks. In case you've been
          selected, you'll have virtual personal interview(s) in subsequent
          round(s).
        </p>
      </main>
    </div>
  );
}

export default SuccessPage;
