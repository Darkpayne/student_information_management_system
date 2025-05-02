import { LoadingState } from "@/components/shared/Loaders";
import { Box } from "@chakra-ui/react";

export default function Loading() {
return <Box p={4} m={'auto'}><LoadingState /></Box>;
  }