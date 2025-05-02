"use client"

import { Student } from "@/types/student";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import HeaderWithBackButton from "./HeaderWithBackButton";

export default function StudentProfile({ student }: { student: Student }) {
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
       <HeaderWithBackButton text="Student Profile"/>
      <Stack gap={4}>
        <Flex justify="space-between">
          <Text fontWeight="medium" color="gray.600">
            Name:
          </Text>
          <Text fontWeight="semibold" color="gray.800">
            {student?.name}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color="gray.600">
            Registration No:
          </Text>
          <Text fontWeight="semibold" color="gray.800">
            {student?.registrationNumber}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color="gray.600">
            Major:
          </Text>
          <Text fontWeight="semibold" color="gray.800">
            {student?.major}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color="gray.600">
            Date of Birth:
          </Text>
          <Text fontWeight="semibold" color="gray.800">
            {new Date(student?.dob).toDateString()}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color="gray.600">
            GPA:
          </Text>
          <Text fontWeight="semibold" color="gray.800">
            {student?.gpa}
          </Text>
        </Flex>
      </Stack>
    </Box>
  );
}
