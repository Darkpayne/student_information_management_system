import { STUDENT_API_URL } from "@/lib/constants";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";

export default async function ViewStudentPage({
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
    <Box
      p={4}
      bg="white"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      w="lg"
      mx="auto"
    >
      <Heading size="2xl" mb={4} textAlign="center" color={'black'}>
        Student Profile
      </Heading>
      <Stack gap={4}>
        <Flex justify="space-between">
          <Text fontWeight="medium" color="gray.600">Name:</Text>
          <Text fontWeight="semibold" color='gray.800'>{student.name}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color="gray.600">Registration No:</Text>
          <Text fontWeight="semibold" color='gray.800'>{student.registrationNumber}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color="gray.600">Major:</Text>
          <Text fontWeight="semibold" color='gray.800'>{student.major}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color="gray.600">Date of Birth:</Text>
          <Text fontWeight="semibold" color='gray.800'>{student.dob}</Text>
        </Flex>
        <Flex justify="space-between">
          <Text fontWeight="medium" color="gray.600">GPA:</Text>
          <Text fontWeight="semibold" color='gray.800'>{student.gpa}</Text>
        </Flex>
      </Stack>
    </Box>
  );
}