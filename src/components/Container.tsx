import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-6 md:px-6 lg:px-8">{children}</div>;
}
