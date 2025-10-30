import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[400px]">
      <div className="size-12 w-dvw justify-center items-center border-3 border-gray-400 border-t-transparent rounded-full flex gap-x-2">
        <span>Loading Data</span>
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
};

export default Loader;
