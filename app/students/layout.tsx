import ProtectedLayout from "@/components/auth/ProtectedLayout";
import NavBar from "@/components/shared/NavBar";
import { isLoggedIn } from "@/lib/authStore";

export default function StudentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedLayout>
      <div className="flex flex-col gap-4">
        <NavBar />
        {children}
      </div>
    </ProtectedLayout>
  );
}
