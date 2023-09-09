import { Box, Text, VStack, Code, Grid } from "@chakra-ui/react";
import { Logo } from "../../Logo";

const Dashboard = () => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
          </Text>
        </VStack>
      </Grid>
    </Box>
  );
};

export default Dashboard;
