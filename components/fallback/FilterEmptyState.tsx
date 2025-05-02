import { EmptyState, List, VStack } from "@chakra-ui/react"
import { HiColorSwatch } from "react-icons/hi"

export const FilterEmptyState = ({ text }: { text: string }) => {
    return (
        <EmptyState.Root>
            <EmptyState.Content>
                <EmptyState.Indicator>
                    <HiColorSwatch />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                    <EmptyState.Title>No results found for '{text}'</EmptyState.Title>
                    <EmptyState.Description>
                        Try adjusting your search
                    </EmptyState.Description>
                </VStack>
                <List.Root variant="marker">
                    <List.Item>Try removing filters</List.Item>
                    <List.Item>Try different keywords</List.Item>
                </List.Root>
            </EmptyState.Content>
        </EmptyState.Root>
    )
}
