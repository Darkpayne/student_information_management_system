"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/authStore";
import { LoadingState } from "../shared/Loaders";
import { Box, Flex } from "@chakra-ui/react";
import { toaster } from "../ui/toaster";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/");
      toaster.create({
        description: "Login to Proceed",
        type: "info",
      });
    } else {
      setCheckedAuth(true);
    }
  }, [pathname]);

  if (!checkedAuth) {
    return (
      <Box w={"full"} h={"full"} m={"auto"}>
        <Flex justify={"center"} align={"center"}>
          <LoadingState />
        </Flex>
      </Box>
    );
  }

  return <>{children}</>;
}
