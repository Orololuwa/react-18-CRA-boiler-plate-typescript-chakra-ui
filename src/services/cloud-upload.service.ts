import axios from "axios";
import { ICloundineryUpload } from "models/cloud-upload";

class CloudUploadService {
  async cloudineryUpload(
    cloud_name: string,
    formData: FormData
  ): Promise<ICloundineryUpload> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new CloudUploadService();
