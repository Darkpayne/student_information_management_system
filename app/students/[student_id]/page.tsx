import StudentProfile from "@/components/shared/StudentProfile";
import { fetchSingleStudent } from "@/services/student_service";
import { notFound } from "next/navigation";
import React from "react";

export default async function ViewStudentPage({ params }: { params: { student_id: string } }) {
  const student = await fetchSingleStudent(params.student_id as string);
  if (!student) return notFound();

  return <StudentProfile student={student} />;
}
