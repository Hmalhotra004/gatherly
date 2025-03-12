import Sidebar from "@/components/sidebar/Sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-full h-full">{children}</div>
    </section>
  );
}
