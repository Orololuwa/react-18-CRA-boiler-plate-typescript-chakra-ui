import { ReactNode } from "react";
import { Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export const SimpleNavLink = ({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <ChakraLink
      as={Link}
      px={2}
      py={1}
      rounded={"md"}
      color={"whiteAlpha.900"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      // eslint-disable-next-line no-use-before-define
      bg={match ? useColorModeValue("gray.200", "gray.700") : "initial"}
      to={to}
    >
      {children}
    </ChakraLink>
  );
};
