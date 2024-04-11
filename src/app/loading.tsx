

export default function Loading() {
  return (
    <>
      {Array.from(Array(25).keys()).map((i) => (
        <div
          className="h-[400px] w-full max-w-[250px] animate-pulse overflow-hidden rounded-xl border border-gray-300 bg-gray-200 p-2"
          key={i}
        ></div>
      ))}
    </>
  );
}
