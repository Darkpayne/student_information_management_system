"use client";
import { Student } from "@/types/student";
import { Box, Button, Input, Stack, Text, Field } from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "../ui/toaster";
import { useRouter } from "next/navigation";
import { AddNewStudent, UpdateStudent } from "@/services/student_service";
import HeaderWithBackButton from "./HeaderWithBackButton";

type Props = {
  initialData?: Student;
};

export default function StudentForm({ initialData }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<Student>({
    name: initialData?.name || "",
    registrationNumber: initialData?.registrationNumber || "",
    major: initialData?.major || "",
    dob: initialData?.dob || "",
    gpa: initialData?.gpa || 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    let res;
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        res = await UpdateStudent(formData, initialData?.id!);
      } else {
        res = await AddNewStudent(formData);
      }
      toaster.create({
        description: "Student updated successfully",
        type: "success",
      });
      router.push("/students");
    } catch (error) {
      if (error instanceof Error) {
        toaster.create({
          description: error.message || "Something went wrong",
          type: "error",
        });
      } else {
        toaster.create({
          description: "Something went wrong",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={4}
      bg="white"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      w={{ base: "full", md: "lg" }}
      mx="auto"
    >
      <HeaderWithBackButton
        text={initialData ? "Edit Student" : "Add New Student"}
      />

      <form onSubmit={handleSubmit}>
        <Stack gap={5} maxW="sm" mx="auto">
          <Field.Root required>
            <Field.Label color="gray.800">Name</Field.Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              color="gray.800"
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label color="gray.800">Registration Number</Field.Label>
            <Input
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              placeholder="Enter registration number"
              color="gray.800"
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label color="gray.800">Major</Field.Label>
            <Input
              name="major"
              value={formData.major}
              onChange={handleChange}
              placeholder="Enter major"
              color="gray.800"
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label color="gray.800">Date of Birth</Field.Label>
            <Input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              color="gray.800"
            />
          </Field.Root>

          <Field.Root required>
            <Field.Label color="gray.800">GPA</Field.Label>
            <Input
              name="gpa"
              type="number"
              step="0.1"
              value={formData.gpa}
              onChange={handleChange}
              placeholder="Enter GPA"
              color="gray.800"
            />
          </Field.Root>

          <Button
            backgroundColor={"blue.500"}
            color={"white"}
            type="submit"
            width="full"
            loading={loading}
          >
            {initialData ? "Update Student" : "Add Student"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
