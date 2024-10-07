"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-[calc(100vh-5rem)]">
      <h2 className="text-9xl text-secondary-dark font-bold">Oops!</h2>
      <p className="text-gray-400">Error Occured</p>
      <div className="grid grid-cols-2 gap-4 items-center mt-4">
        <button
          onClick={router.back}
          type="button"
          className="btn btn-outline-primary py-2 px-5 text-sm"
        >
          Back
        </button>
        <button onClick={reset} className="btn btn-primary py-2 px-5 text-sm">
          Reset
        </button>
      </div>
    </div>
  );
}
