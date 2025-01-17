import { cn } from "@/lib/utils";
import React from "react";

function Centralizer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute left-1/2 flex items-center justify-center transform -translate-x-1/2",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Centralizer;
