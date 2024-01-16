"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("under (members) folder error", error);
  }, [error]);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary">
        Something went wrong! (members) folder error:{" "}
        {`${error.message} ${error.cause}`}
      </h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
