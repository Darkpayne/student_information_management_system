'use client'
import { FilterInput } from '@/components/shared/FilterInput';
import StudentCard from '@/components/shared/StudentCard';
import { toaster } from '@/components/ui/toaster';
import { STUDENT_API_URL } from '@/lib/constants';
import { Student } from '@/types/student';
import { Box, Button, Container, Flex, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react'

const StudentPage = () => {
  const [query, setQuery] = React.useState("");
  const [students, setStudents] = React.useState<Student[]>([]);

  // Common fetch function
  const fetchStudents = async (searchQuery?: string) => {
    try {
      const url = searchQuery
        ? `/api/students?query=${encodeURIComponent(searchQuery)}`
        : `/api/students`;

      const res = await fetch(url);
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  // Fetch all on initial load
  React.useEffect(() => {
    fetchStudents();
  }, []);

  // Handle search button
  const handleSearch = () => {
    fetchStudents(query.trim());
  };
  // Handle clear button
  const handleClear = () => {
    fetchStudents('');
  };



  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(STUDENT_API_URL + `/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        toaster.create({
          description: "StuSomething went wrong",
          type: "error",
        });
      }

      setStudents((prev) => prev.filter((student) => student.id !== id));
      toaster.create({
        description: "User deleted successfully",
        type: "success",
      });

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container maxW="container.md" py={6}>
      <Flex justify="space-between" alignItems={'center'} mb={6}>


        <Heading flex={1} size="2xl" w={'full'} textAlign="left" color={'white'}>
          All Students
        </Heading>


        <FilterInput handleSearch={handleSearch} handleClear={handleClear} query={query} setQuery={setQuery} />

      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3 }} gap={4}>
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onDelete={() => handleDelete(student.id!)}
          />
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default StudentPage;