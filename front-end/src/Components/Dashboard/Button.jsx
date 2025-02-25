import { useState } from "react";

function LoadingButton({ text, onClick, isLoading: externalLoading }) {
  const [internalLoading, setInternalLoading] = useState(false);

  const handleClick = async () => {
    if (externalLoading === undefined) {
      setInternalLoading(true);
      await onClick();
      setInternalLoading(false);
    } else {
      await onClick();
    }
  };

  const loadingState = externalLoading !== undefined ? externalLoading : internalLoading;

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 rounded ${
        loadingState ? "opacity-75 cursor-not-allowed" : "hover:bg-blue-700"
      }`}
      disabled={loadingState}
    >
      {loadingState ? (
        <svg
          className="w-5 h-5 text-white animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
          ></path>
        </svg>
      ) : (
        text
      )}
    </button>
  );
}

export default LoadingButton;
