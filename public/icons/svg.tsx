import React, { ReactNode, SVGProps } from "react";

export default function Svg({
  className,
  children,
  ...props
}: { children: ReactNode } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}
