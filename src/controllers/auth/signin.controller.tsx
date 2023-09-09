import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link as ChakraLink,
  Icon,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "core/hooks/use-redux";
import { AuthLocationState } from "models/auth";
import { useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginJWT, loginWebAuthN } from "store/action-creators/auth.actions";
import { ErrorToast } from "core/components/error";
import { isFieldsInvalid } from "lib/utils";
import { appRoutes } from "core/routes/routes";
import { FingerScan } from "iconsax-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as AuthLocationState)?.from?.pathname ||
    appRoutes.DASHBOARD;
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [state, setState] = useState({ email: "", password: "" });

  //
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const isDisabled = useCallback(() => isFieldsInvalid(state), [state]);

  const onLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(loginJWT(navigate, from, state));
  };

  const onLoginWebAuth = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(loginWebAuthN(navigate, from));
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={onChange}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={state.password}
                  onChange={onChange}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <ChakraLink
                    as={Link}
                    to={appRoutes.SIGN_UP}
                    color={useColorModeValue("gray.700", "gray.600")}
                    colorScheme="gray"
                  >
                    Create an account
                  </ChakraLink>
                </Stack>
                <Flex justifyContent={"space-between"} gap="2">
                  <Button
                    bg={useColorModeValue("gray.700", "gray.600")}
                    color={"white"}
                    _hover={{
                      bg: "gray.500",
                    }}
                    onClick={onLogin}
                    isLoading={loading}
                    isDisabled={isDisabled()}
                    flexGrow={"1"}
                  >
                    Sign in
                  </Button>
                  <Button
                    bg={useColorModeValue("gray.700", "gray.600")}
                    color={"white"}
                    _hover={{
                      bg: "gray.500",
                    }}
                    flexBasis={"3rem"}
                    onClick={onLoginWebAuth}
                    isLoading={loading}
                    isDisabled={isDisabled()}
                  >
                    <Icon as={FingerScan} boxSize={"6"} />
                  </Button>
                </Flex>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      {ErrorToast({ error })}
    </>
  );
}
