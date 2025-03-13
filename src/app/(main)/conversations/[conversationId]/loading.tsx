import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <section className="flex items-center justify-center h-dvh">
      <Loader2 className="w-5 h-5 animate-spin dark:text-ceremonial-purple" />
    </section>
  );
}
