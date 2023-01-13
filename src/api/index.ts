import axios from "axios";
import { IDirectionResponse, IProgressEvent } from "../models";
import { v4 as uuidv4 } from 'uuid';

export const getFileDirection: () => Promise<IDirectionResponse> = () => new Promise((response): NodeJS.Timeout => setTimeout(() => response({id: uuidv4(), url: "/files/", status: 200}), 1000));

export const uploadFileRequestAPI = async (files: string[] | Blob[], id: string, url: string, onUploadProgress: (progressEvent: any) => number | undefined) => {
        try {
            const formData = new FormData();
            files.map((file: string | Blob)=> {
                formData.append("file", file);
            })
           
            const response = await axios.post(
                `localhost:5000${url}${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress
                }
            );
            return response.data;
        } catch (e) {
            console.log(e);
        }
};