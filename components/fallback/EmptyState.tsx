import { Button, ButtonGroup, EmptyState, VStack } from "@chakra-ui/react"
import { HiColorSwatch } from "react-icons/hi"

export const EmptyStateComponent = () => {
    return (
        <EmptyState.Root>
            <EmptyState.Content>
                <EmptyState.Indicator>
                    <HiColorSwatch />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                    <EmptyState.Title>There are No Students</EmptyState.Title>
                </VStack>
                <ButtonGroup>
                    <Button>Create Student</Button>
                </ButtonGroup>
            </EmptyState.Content>
        </EmptyState.Root>
    )
}
