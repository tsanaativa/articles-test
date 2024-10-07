"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-[calc(100vh-5rem)]">
      <h2 className="text-9xl text-secondary-dark font-bold">404</h2>
      <p className="text-gray-400">Data Not Found</p>
      <div className="grid grid-cols-2 gap-4 items-center mt-4">
        <button
          onClick={router.back}
          type="button"
          className="btn btn-outline-primary py-2 px-5 text-sm"
        >
          Back
        </button>
        <Link href="/">
          <button className="btn btn-primary py-2 px-5 text-sm">Home</button>
        </Link>
      </div>
    </div>
  );
}
