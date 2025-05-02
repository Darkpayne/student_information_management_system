"use client";
import { Button, ButtonGroup, EmptyState, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { HiColorSwatch } from "react-icons/hi";

export const EmptyStateComponent = ({
  action,
  single,
}: {
  action?: () => void;
  single?: boolean;
}) => {
  const router = useRouter();
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <HiColorSwatch />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>
            {single ? "Student not found" : "There are No Students"}
          </EmptyState.Title>
        </VStack>
        <ButtonGroup>
          {action && <Button onClick={action}>Create Student</Button>}
          {single && (
            <Button onClick={() => router.push("/students")}>
              Go Back Home
            </Button>
          )}
        </ButtonGroup>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};
