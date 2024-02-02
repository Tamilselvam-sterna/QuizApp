function SuccessPage() {
  const firstName = localStorage.getItem("firstName") ?? "";
  const lastName = localStorage.getItem("lastName") ?? "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <main className="flex  flex-col items-center space-y-8 rounded-lg bg-white p-8 shadow-md">
        <p>
          Thank you {`${firstName}  ${lastName}`} for attending the first round
          of this interview!
        </p>
        <p>
          We'll inform the results to you within two weeks. In case you've been
          selected, you'll have virtual personal interview(s) in subsequent
          round(s).
        </p>
      </main>
    </div>
  );
}

export default SuccessPage;
