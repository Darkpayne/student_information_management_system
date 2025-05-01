'use client'
import StudentForm from "@/components/shared/Form";
import { Container } from "@chakra-ui/react";

export default function AddNewStudentPage() {

  return (
    <Container maxW="container.md" py={6}>
      <StudentForm />
    </Container>
  );
}