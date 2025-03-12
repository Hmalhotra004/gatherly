import EmptyState from "@/components/EmptyState";

export const dynamic = "force-dynamic";

const page = () => {
  return (
    <div className="hidden lg:block w-full h-full">
      <EmptyState />
    </div>
  );
};

export default page;
