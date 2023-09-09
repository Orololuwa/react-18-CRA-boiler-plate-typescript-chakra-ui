import { useToast } from "@chakra-ui/react";
import { Loading } from "core/components/loading";
import { useAppSelector } from "core/hooks/use-redux";
import { appRoutes } from "core/routes/routes";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const SetupCompleteGuard = ({ children }: { children: JSX.Element }) => {
  const data = useAppSelector((state) => state.auth.profile);
  const toast = useToast();

  useEffect(() => {
    if (data.error)
      toast({
        status: "error",
        description: data.error,
        position: "top",
      });
  }, [data.error]);

  const setupComplete = data.data?.setupComplete;

  if (data.loading) return <Loading />;

  console.log("@setup_complete", { setupComplete });

  if (!setupComplete) {
    return <Navigate to={appRoutes.RESTAURANT_SETUP} />;
  }

  return children;
};

export default SetupCompleteGuard;
