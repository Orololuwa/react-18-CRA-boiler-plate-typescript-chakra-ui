import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Flex,
  Stack,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";

import Upload from "core/components/upload/upload";
import { useAppDispatch, useAppSelector } from "core/hooks/use-redux";
import { getARestaurant } from "store/action-creators/restaurant.action";

const RestaurantDetails = () => {
  const restaurantId = 6;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getARestaurant(restaurantId));
  }, []);

  const { data, loading } = useAppSelector(
    (state) => state.restaurant.restaurant
  );

  useEffect(() => {
    if (!data) return;

    setState({
      name: data?.name || "",
      email: data?.email || "",
      description: data?.description || "",
      logo: data?.logo || "",
    });
  }, [data]);

  const [state, setState] = useState({
    name: data?.name || "",
    email: data?.email || "",
    description: data?.description || "",
    logo: data?.logo || "",
  });

  //
  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onImageChangeHandler = (image: string) => {
    setState((prevState) => ({ ...prevState, logo: image }));
  };

  if (loading) {
    return (
      <Stack spacing={"10"}>
        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          User Registration
        </Heading>
        <Skeleton h="10" w="full" />
        <Skeleton h="10" w="full" />
        <Skeleton h="20" w="full" />
        <Flex alignItems={"flex-start"} gap={"5"}>
          <SkeletonCircle boxSize={"36"} flexShrink={"0"} />
          <Stack flexGrow={"1"}>
            <Skeleton h="28" w="full" />
            <Skeleton h="2" w="full" />
          </Stack>
        </Flex>
      </Stack>
    );
  }

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        User Registration
      </Heading>
      <FormControl mt="2%">
        <FormLabel htmlFor="name" fontWeight={"normal"}>
          Restaurant Name
        </FormLabel>
        <Input
          id="name"
          type="text"
          value={state.name}
          name="name"
          onChange={onChangeHandler}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Email address
        </FormLabel>
        <Input
          id="email"
          type="email"
          value={state.email}
          name="email"
          onChange={onChangeHandler}
          disabled={!!data}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="description" fontWeight={"normal"}>
          Description
        </FormLabel>
        <Textarea
          id="description"
          value={state.description}
          name="description"
          onChange={onChangeHandler}
        />
      </FormControl>
      <Box py="5">
        <Upload
          uploadKey={"test"}
          title="Logo"
          initialImage={state.logo}
          onCurrentImageChange={onImageChangeHandler}
        />
      </Box>
    </>
  );
};

export default RestaurantDetails;
