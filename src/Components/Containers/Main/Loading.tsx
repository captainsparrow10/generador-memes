import React from "react";

type Props = {
  loading: boolean;
};

export default function Loading({ loading }: Props) {
  return (
    <>
      {loading &&
        Array.from(Array(25).keys()).map((i) => (
          <div
            className="mb-4 h-[275px] w-full animate-pulse overflow-hidden rounded-lg border border-gray-300 bg-gray-300 p-2 sm:h-[350px] lg:h-[400px]"
            key={i}
          ></div>
        ))}
    </>
  );
}
