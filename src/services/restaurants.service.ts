import { AxiosResponse } from "axios";
import { apiRoutes } from "core/routes/routes";
import { authInstance } from "lib/config/axios.config";
import { IRestaurant } from "models/restaurants";

class RestaurantService {
  async getRestaurants(): Promise<AxiosResponse<IRestaurant[]>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.get(apiRoutes.RESTAURANT);
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getARestaurant(id: number): Promise<AxiosResponse<IRestaurant>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.get(`${apiRoutes.RESTAURANT}/${id}`);
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  async createRestaurant(): Promise<AxiosResponse<{ message: string }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.post(apiRoutes.RESTAURANT);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async editRestaurant(
    id: number
  ): Promise<AxiosResponse<{ message: string }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.patch(`${apiRoutes.RESTAURANT}/${id}`);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new RestaurantService();
