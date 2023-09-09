import { AxiosResponse } from "axios";
import { UserWebauthn } from "core/components/layout/dashboard-layout/nav";
import { apiRoutes } from "core/routes/routes";
import { authInstance, publicInstance } from "lib/config/axios.config";
import { TransmittablePublicKeyCredential } from "lib/helpers/web-auth-n.helper";
import { ILogin, IProfile } from "models/auth";

class AuthService {
  async login(body: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<{ data: ILogin }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await publicInstance.post(apiRoutes.SIGN_IN, body);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  async signUp(body: {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<AxiosResponse<{ data: ILogin }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await publicInstance.post(apiRoutes.SIGN_UP, body);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getProfile(): Promise<AxiosResponse<{ data: IProfile }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.get(apiRoutes.PROFILE);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getWebAuthStatus(): Promise<
    AxiosResponse<{ data: { isWebAuthEnabled: boolean } }>
  > {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.get(apiRoutes.GET_RESIDENT_KEYS);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async attestateBegin(): Promise<
    AxiosResponse<{ data: PublicKeyCredentialCreationOptions }>
  > {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.get(apiRoutes.ATTESTATE_BEGIN);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async attestateEnd(
    body: TransmittablePublicKeyCredential
  ): Promise<AxiosResponse<{ data: UserWebauthn }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.post(apiRoutes.ATTESTATE_END, body);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async assertBegin(): Promise<
    AxiosResponse<{ data: PublicKeyCredentialRequestOptions }>
  > {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.get(apiRoutes.ASSERT_BEGIN);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async assertEndRemove(body: any): Promise<AxiosResponse<{ data: any }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.post(apiRoutes.ASSERT_END_REMOVE, body);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async loginWebAuthN(body: any): Promise<AxiosResponse<{ data: ILogin }>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await authInstance.post(apiRoutes.SIGN_IN_WEBAUTHN, body);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new AuthService();
