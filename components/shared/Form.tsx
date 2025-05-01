"use client";

import { STUDENT_API_URL } from "@/lib/constants";
import { Student } from "@/types/student";
import { Box, Button, Input, Stack, Text, Field } from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "../ui/toaster";
import { useRouter } from 'next/navigation'

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === 'number' ? parseFloat(value) || 0 : value }));
    };

    const AddNewStudent = async (data: Student) => {
        try {
            const res = await fetch(STUDENT_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to add student");
            }

            toaster.create({
                description: "Student added successfully",
                type: "success",
            });

            router.push('/students');
        } catch (error) {

            if (error instanceof Error) {
                toaster.create({
                    description: error.message || "Something went wrong",
                    type: "error",
                })
            } else {
                toaster.create({
                    description: "Something went wrong",
                    type: "error",
                })
            }
        }
    }

    const UpdateStudent = async (data: Student) => {
        try {
            const res = await fetch(STUDENT_API_URL + `/${initialData?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to add student");
            }
            toaster.create({
                description: "Student updated successfully",
                type: "success",
            });
            router.push('/students');
        } catch (error) {
            if (error instanceof Error) {
                toaster.create({
                    description: error.message || "Something went wrong",
                    type: "error",
                })
            } else {
                toaster.create({
                    description: "Something went wrong",
                    type: "error",
                })
            }

        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (initialData) {
            UpdateStudent(formData);
        } else {
            AddNewStudent(formData);
        }
    };

    return (
        <Box
            p={4}
            bg="white"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            w="lg"
            mx="auto"
        >
            <Text fontWeight="bold" fontSize="2xl" textAlign="center" color="black" mb={4}>
                {initialData ? "Edit Student" : "Add New Student"}
            </Text>

            <form onSubmit={handleSubmit}>
                <Stack gap={5} maxW="sm" mx="auto">
                    <Field.Root required>
                        <Field.Label color='gray.800'>Name</Field.Label>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            color="gray.800"
                        />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label color='gray.800'>Registration Number</Field.Label>
                        <Input
                            name="registrationNumber"
                            value={formData.registrationNumber}
                            onChange={handleChange}
                            placeholder="Enter registration number"
                            color="gray.800"
                        />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label color='gray.800'>Major</Field.Label>
                        <Input
                            name="major"
                            value={formData.major}
                            onChange={handleChange}
                            placeholder="Enter major"
                            color="gray.800"
                        />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label color='gray.800'>Date of Birth</Field.Label>
                        <Input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            color="gray.800"
                        />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label color='gray.800'>GPA</Field.Label>
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

                    <Button colorPalette="teal" type="submit" width="full">
                        {initialData ? "Update Student" : "Add Student"}
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}
