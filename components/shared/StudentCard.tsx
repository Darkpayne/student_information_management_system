// components/StudentCard.tsx
"use client";

import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "./Dialog";
import { Student } from "@/types/student";


type Props = {
    student: Student;
    onDelete: (id: string) => void;
    isDeleting: boolean
};

export default function StudentCard({ student, onDelete, isDeleting }: Props) {
    const router = useRouter();

    return (
        <Box
            p={4}
            bg="white"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            w="full"
        >
            <Stack>
                <Text className="cursor-pointer" onClick={() => router.push(`/students/${student.id}`)} fontWeight="bold" fontSize="lg" color={"blue.600"}>
                    {student.name}
                </Text>

                <Text color={'gray.800'}>Reg No: {student.registrationNumber}</Text>
                <Text color={'gray.800'}>Major: {student.major}</Text>

                <Flex mt={4} gap={2} flexWrap="wrap">
                    <Button
                        colorPalette="blue" variant="solid"
                        size="sm"
                        onClick={() => router.push(`/students/${student.id}/edit`)}
                    >
                        Edit
                    </Button>

                    <ConfirmationDialog onDelete={() => onDelete(student.id!)} isDeleting={isDeleting} />
                </Flex>
            </Stack>

        </Box>
    );
}
