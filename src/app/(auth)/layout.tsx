export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="dark:bg-slate-100 bg-slate-100 h-screen">
      {children}
    </section>
  );
}
