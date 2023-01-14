export interface IDirectionResponse {
  id: string;
  url: string;
  status: number;
}

export interface IUploadResponse {
  status: number;
  message: string;
}

export interface IFile {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
