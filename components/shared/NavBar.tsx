"use client";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { MdMenu, MdClose, MdLogout } from "react-icons/md";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/authStore";
import { LogoutUser } from "@/services/user_service";
import { toaster } from "../ui/toaster";
import React, { useEffect } from "react";

const Links = [{ label: "Students", href: "/students" }];

const NavLink = ({ label, href }: { label: string; href: string }) => (
  <ChakraLink
    as={Link}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{ textDecoration: "underline" }}
    border={"none"}
    href={href}
  >
    {label}
  </ChakraLink>
);

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const isOnNewStudentPage = pathname.includes("/students/new");
  const { open, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await LogoutUser();
      router.push("/");
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
    <Box bg="blue.500" px={4} color="white">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={open ? onClose : onOpen}
          bg="blue.500"
          _hover={{ bg: "blue.600" }}
        >
          {open ? <MdClose /> : <MdMenu />}{" "}
        </IconButton>
        <HStack alignItems="center">
          <Box fontWeight="bold">🎓 Student Manager</Box>
          <HStack as="nav" display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </HStack>
        </HStack>
        <Flex align={"center"}>
          {isOnNewStudentPage || (
            <ChakraLink as={Link} href="/students/new">
              <Button variant={"solid"} colorScheme={"teal"} size={"sm"} mr={4}>
                <FaPlus /> Add User
              </Button>
            </ChakraLink>
          )}
          <Button
            onClick={handleLogout}
            variant={"solid"}
            colorScheme={"teal"}
            size={"sm"}
            mr={4}
            loading={loading}
          >
            <MdLogout /> Logout
          </Button>
        </Flex>
      </Flex>

      {open ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav">
            {Links.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
