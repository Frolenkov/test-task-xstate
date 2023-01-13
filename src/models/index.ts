export interface IDirectionResponse {
  id: string;
  url: string;
  status: number;
}

export interface IUploadResponse {
  status: number;
  message: string;
}

export interface IProgressEvent {
  lengthComputable: any;
  total: any;
  target: { getResponseHeader: (arg0: string) => any };
  loaded: number;
}