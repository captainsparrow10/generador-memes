import { CircularProgress } from "@mui/material";
import React from "react";

type Props = {
  length: number;
};

export default function Loading({ length }: Props) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {length <= 0 &&
          Array.from(Array(25).keys()).map((i) => (
            <div
              className="mb-4 h-[275px] w-full animate-pulse overflow-hidden rounded-lg border border-gray-300 bg-gray-300 p-2 sm:h-[350px] lg:h-[400px]"
              key={i}
            ></div>
          ))}
      </div>
      {length > 0 && (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
}
