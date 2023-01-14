import axios from "axios";
import { IDirectionResponse, IFile } from "../models";
import { v4 as uuidv4 } from 'uuid';

export const getFileDirection: () => Promise<IDirectionResponse> = () => new Promise((response): NodeJS.Timeout => setTimeout(() => response({id: uuidv4(), url: "/files/", status: 200}), 1000));

const instance = axios.create({
    baseURL: 'http://localhost:5000'
  });

export const uploadFileRequestAPI = async (files: IFile[], id: string, url: string) => {
        try {
            const formData = new FormData();
            console.log(files);
            files?.map((file: any) => {
                formData.append("file", file);
            })
           
            const response = await instance.post(
                `${url}${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return {
                status: 200,
                message: "Files already was uploaded"
            };
        } catch (e) {
            console.log(e);
        }
};