import { ServerCrash } from "lucide-react";

const ServerError = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-2">
      <ServerCrash className="w-10 h-10" />
      <p className="text-lg">Somthing went wrong please try again</p>
    </div>
  );
};

export default ServerError;
