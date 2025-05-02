
'use client'
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";

export default function HeaderWithBackButton({text}:{text:string}) {
  const router = useRouter();
  return (
    <Stack >
        <Flex justify={'start'}>

      <Button onClick={() => router.back()} color="gray.600" variant="plain">
        <RiArrowLeftLine /> Back
      </Button>
        </Flex>
      <Heading size="2xl" mb={4} textAlign="center" color={"black"}>
      {text}
      </Heading>
    </Stack>
  );
}
