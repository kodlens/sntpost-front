import { AlertCircle } from "lucide-react";

interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorComponent({ 
  title = "Error", 
  message = "Something went wrong. Please try again.", 
  onRetry 
}: ErrorProps) {
  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-xl border border-red-300 bg-red-50 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <AlertCircle className="w-6 h-6 text-red-600" />
        <h2 className="text-lg font-semibold text-red-700">{title}</h2>
      </div>
      <p className="text-sm text-red-600">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 inline-flex items-center px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
}
