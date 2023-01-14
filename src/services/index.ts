import { uploadFileRequestAPI } from "../api";
import { IFile } from "../models";

export const uploadFileService = async (file: IFile[], id: string, url: string) => {
    const response: any = await uploadFileRequestAPI(
      file,
      id,
      url
    );
    return response;
  }