import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Content = (): JSX.Element => {
  return (
    <Box as={"main"} overflowX="auto" scrollBehavior={"smooth"}>
      <Outlet />
    </Box>
  );
};

export default Content;
