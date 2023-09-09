import { Box, BoxProps, Image, useColorModeValue } from "@chakra-ui/react";
import { appRoutes } from "core/routes/routes";
import logo from "assets/logo.png";
import { useNavigate } from "react-router-dom";

interface LogoProps extends BoxProps {}

export const Logo = ({ ...rest }: LogoProps) => {
  const navigate = useNavigate();
  return (
    <Box
      h="10"
      cursor={"pointer"}
      onClick={() => navigate(appRoutes.HOME)}
      p="2"
      bg={useColorModeValue("white", "gray.700")}
      rounded="md"
      {...rest}
    >
      <Image src={logo} alt="Logo" height={"100%"} w={["8", "10", "10"]} />
    </Box>
  );
};
