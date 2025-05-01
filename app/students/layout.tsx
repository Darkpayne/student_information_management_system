import NavBar from "@/components/shared/NavBar";

export default function StudentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-4">
      <NavBar/>
      {children}
    </div>
  );
}