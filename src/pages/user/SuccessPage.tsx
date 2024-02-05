import { useEffect } from "react";

function SuccessPage() {
  const firstName = localStorage.getItem("firstName")?.toUpperCase() ?? "User";
  const lastName = localStorage.getItem("lastName")?.toUpperCase() ?? "";

  useEffect(() => {
    const reloadAndNavigateHome = () => {
      setTimeout(() => {
        window.location.reload();
        localStorage.clear();
        window.location.href = "/";
      }, 5000);
    };

    reloadAndNavigateHome();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center border-blue-400 bg-gray-100">
      <div className="flex flex-col items-center space-y-14 rounded-lg p-8  shadow-md transition-shadow duration-300 hover:shadow-lg">
        😊 Thank you {`${firstName}  ${lastName}`} for attending the first round
        of this interview!
        <div>
          We'll inform the results to you within few days. In case you've been
          selected, you'll have a virtual personal interview in subsequent
          rounds.
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
