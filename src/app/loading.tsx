import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-dvh bg-transparent">
      <Loader2 className="animate-spin text-black z-[500]" />
    </div>
  );
};

export default Loading;
