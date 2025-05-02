import { ProgressCircle } from "@chakra-ui/react"

export const LoadingState = () => {
    return (
        <ProgressCircle.Root value={null} size="xs">
            <ProgressCircle.Circle>
                <ProgressCircle.Track />
                <ProgressCircle.Range />
            </ProgressCircle.Circle>
        </ProgressCircle.Root>
    )
}
