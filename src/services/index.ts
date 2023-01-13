import { uploadFileRequestAPI } from "../api";
import { IProgressEvent } from "../models";

const onUploadProgress = (progressEvent: IProgressEvent) => {
    const totalLength = progressEvent.lengthComputable
      ? progressEvent.total
      : progressEvent.target.getResponseHeader("content-length") ||
        progressEvent.target.getResponseHeader("x-decompressed-content-length");
    console.log("total", totalLength);
    if (totalLength) {
      let progress = Math.round((progressEvent.loaded * 100) / totalLength);
      return progress;
    }
  };

export const uploadFileRequest = async (file: string[] | Blob[], id: string, url: string) => {
    const response: any = await uploadFileRequestAPI(
      file,
      id,
      url,
      onUploadProgress
    );
    console.log(response);
    return response;
  }