import StudentForm from "@/components/shared/Form";
import { STUDENT_API_URL } from "@/lib/constants";
import { Container } from "@chakra-ui/react";

export default async function EditStudentPage({
  params,
}: Readonly<{
  params: {
    student_id: string;
  };
}>) {
  const res = await fetch(STUDENT_API_URL + `/${params.student_id}`);
  const student = await res.json();
  console.log(student);
  return (
    <Container maxW="container.md" py={6}>
      <StudentForm initialData={student} />
    </Container>
  );
}