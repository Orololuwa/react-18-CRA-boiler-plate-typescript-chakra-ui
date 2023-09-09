import { useToast } from "@chakra-ui/react";
import { useMemo } from "react";

export const ErrorToast = ({ error }: { error: string }) => {
  const toast = useToast();

  const ErrorComponent: React.ReactNode = useMemo(() => {
    if (!error) return null;
    toast({
      description: error,
      status: "error",
      position: "top",
      variant: "subtle"
    });
  }, [error]);

  return ErrorComponent;
};
