import { uploadFileRequestAPI } from "../api";
import { IFile } from "../models";

export const uploadFileService = async (
  file: IFile[],
  id: string,
  url: string
) => {
  try {
    await uploadFileRequestAPI(file, id, url);
  } catch (e) {
    throw e;
  }
};
