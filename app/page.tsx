"use client";

import { toaster } from "@/components/ui/toaster";
import { LoginUser } from "@/services/user_service";
import {
  Flex,
  Box,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Field,
  InputGroup,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { LuUser } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

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
      res = await LoginUser(formData);

      toaster.create({
        description: "Welcome Back!",
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
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack gap={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box rounded={"lg"} bg={"gray.100"} boxShadow={"lg"} p={8}>
          <Stack gap={4}>
            <Field.Root required>
              <Field.Label color="gray.800">Email</Field.Label>
              <InputGroup startElement={<LuUser />}>
                <Input
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter Email"
                  color="gray.800"
                  type="email"
                />
              </InputGroup>
            </Field.Root>

            <Field.Root required>
              <Field.Label color="gray.800">Password</Field.Label>
              <InputGroup startElement={<RiLockPasswordLine />}>
                <Input
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  color="gray.800"
                  placeholder="Enter password"
                />
              </InputGroup>
            </Field.Root>
            <Stack gap={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
                loading={loading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
