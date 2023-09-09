import { useToast } from "@chakra-ui/react";
import { Loading } from "core/components/loading";
import { useAppSelector } from "core/hooks/use-redux";
import { appRoutes } from "core/routes/routes";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const IsRestaurantCreatedGuard = ({ children }: { children: JSX.Element }) => {
  const data = useAppSelector((state) => state.restaurant.restaurants);
  const toast = useToast();

  useEffect(() => {
    if (data.error)
      toast({
        status: "error",
        description: data.error,
        position: "top",
      });
  }, [data.error]);

  const isRestaurantCreated = data.data.length;

  if (data.loading) return <Loading />;

  console.log(isRestaurantCreated, !!isRestaurantCreated);

  if (!isRestaurantCreated) {
    return <Navigate to={appRoutes.RESTAURANT_CHOOSE} />;
  }

  return children;
};

export default IsRestaurantCreatedGuard;
