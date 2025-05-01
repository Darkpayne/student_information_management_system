// components/NavBar.tsx
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
import { MdMenu,MdClose } from "react-icons/md";
import Link from "next/link";

const Links = [
  { label: "Students", href: "/students" },
  { label: "Add Student", href: "/students/new" },
];

const NavLink = ({ label, href }: { label: string; href: string }) => (
  <ChakraLink
    as={Link}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{ textDecoration: "none", bg: "gray.200" }}
    href={href}
  >
    {label}
  </ChakraLink>
);

export default function NavBar() {
  const { open, onOpen, onClose } = useDisclosure();

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
        >{open ? <MdClose /> : <MdMenu />} </IconButton>
        <HStack alignItems="center">
          <Box fontWeight="bold">🎓 Student Manager</Box>
          <HStack as="nav" display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </HStack>
        </HStack>
        <Button size="sm" variant="outline" _hover={{ bg: "white", color: "blue.600" }}>
          Login
        </Button>
      </Flex>

      {open ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" >
            {Links.map((link) => (
              <NavLink key={link.label} {...link} />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
