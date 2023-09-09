import {
  Avatar,
  Box,
  Center,
  Flex,
  FormLabel,
  Icon,
  Input,
  Progress,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ExportCurve } from "iconsax-react";
import React, { useState } from "react";
import cloudUploadService from "services/cloud-upload.service";

interface IUpload {
  uploadKey: string;
  initialImage: string;
  onCurrentImageChange: (image: string) => void;
  title: string;
}

const Upload = ({
  uploadKey,
  title,
  initialImage,
  onCurrentImageChange,
}: IUpload) => {
  const [isLoading, setLoading] = useState(false);
  const [inputKey, setInputKey] = useState(0);

  const preset_key = process.env.REACT_APP_CLOUDINERY_PRESET_KEY as string;
  const cloud_name = process.env.REACT_APP_CLOUDINERY_CLOUD_NAME as string;

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!preset_key && !cloud_name) return;

    setLoading(true);
    const files = event?.target.files;

    if (!files?.length) return;

    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    try {
      const response = await cloudUploadService.cloudineryUpload(
        cloud_name,
        formData
      );
      onCurrentImageChange(response.secure_url);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    // Reset the input by forcing a new one
    setInputKey((key) => key + 1);
  };

  return (
    <Flex alignItems={"flex-start"} gap={"5"}>
      <Avatar src={initialImage} size={"2xl"} />
      <Stack flexGrow={"1"}>
        <Box flexBasis="60%">
          <Center w="full" h="full">
            <FormLabel
              px="2"
              py="5"
              m="0"
              w="full"
              display="flex"
              cursor="pointer"
              fontSize={"sm"}
              alignItems="center"
              justifyContent={"center"}
              borderRadius="6"
              borderWidth={"2px"}
              borderColor={useColorModeValue("gray.200", "whiteAlpha.300")}
              borderStyle={"dashed"}
              _disabled={{ bgColor: "gray.200" }}
              htmlFor={uploadKey}
              textAlign={"center"}
              overflow="clip"
              position={"relative"}
            >
              <Stack spacing={"2"} alignItems="center">
                <Text fontWeight={"bold"}>{title}</Text>
                <Icon as={ExportCurve} color="gray.500" boxSize={"5"} />
                <Text>Tap to upload document</Text>
              </Stack>
              {
                // loadingUpload ||
                isLoading ? (
                  <Progress
                    size="xs"
                    isIndeterminate
                    w="full"
                    position={"absolute"}
                    bottom="0"
                    left="0"
                    hasStripe
                    colorScheme={"gray"}
                  />
                ) : null
              }
            </FormLabel>
            <Input
              type="file"
              display="none"
              id={uploadKey}
              name="user-profile"
              colorScheme="primary"
              accept="image/png, image/jpeg, application/pdf"
              multiple
              onChange={handleFileChange}
              key={inputKey}
            />
          </Center>
        </Box>
        <Text fontSize={"xs"} fontStyle="italic">
          Accepted formats are jpeg, png and pdf.
        </Text>
      </Stack>
    </Flex>
  );
};

export default Upload;
