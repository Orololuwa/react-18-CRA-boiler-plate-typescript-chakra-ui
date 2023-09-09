import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthLocationState } from "models/auth";
import { useAppDispatch, useAppSelector } from "core/hooks/use-redux";
import { isFieldsInvalid } from "lib/utils";
import { signUpJWT } from "store/action-creators/auth.actions";
import { ErrorToast } from "core/components/error";
import { appRoutes } from "core/routes/routes";

interface IState {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm?: string;
}

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as AuthLocationState)?.from?.pathname ||
    appRoutes.DASHBOARD;
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [state, setState] = useState<IState>({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  //
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const isDisabled = useCallback(() => {
    const stateCopy = { ...state };
    delete stateCopy.middleName;

    return isFieldsInvalid(stateCopy);
  }, [state]);

  const toast = useToast();

  const onSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (state.password !== state.passwordConfirm) {
      return toast({
        description: "Passwords do not match",
        status: "error",
        position: "top",
        variant: "subtle",
      });
    }

    const data = { ...state };
    delete data?.passwordConfirm;

    if (!data.middleName) delete data.middleName;

    dispatch(signUpJWT(navigate, from, data));
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
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
            <HStack>
              <Box>
                <FormControl id="first_name" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    value={state.firstName}
                    onChange={onChange}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="last_name" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    value={state.lastName}
                    onChange={onChange}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="middle_name">
              <FormLabel>Middle Name</FormLabel>
              <Input
                type="text"
                name="middleName"
                value={state.middleName}
                onChange={onChange}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={state.email}
                onChange={onChange}
              />
            </FormControl>
            <FormControl id="phone" isRequired>
              <FormLabel>Phone</FormLabel>
              <Input
                type="tel"
                name="phone"
                value={state.phone}
                onChange={onChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={state.password}
                  onChange={onChange}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="password_confirm" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="passwordConfirm"
                  value={state.passwordConfirm}
                  onChange={onChange}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"gray.700"}
                color={"white"}
                _hover={{
                  bg: "gray.500",
                }}
                isLoading={loading}
                onClick={onSignUp}
                isDisabled={isDisabled()}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <ChakraLink as={Link} to={appRoutes.SIGN_IN} color={"gray.700"}>
                  Login
                </ChakraLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {ErrorToast({ error })}
    </Flex>
  );
}
