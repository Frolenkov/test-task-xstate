// import {
//   StateMachine,
//   BaseActionObject,
//   ServiceMap,
//   ResolveTypegenMeta,
// } from "xstate";
// import filesMachine from "../machines/filesMachine";
// import { useMachine } from "@xstate/react";
// import { getFileDirection, uploadFileRequest } from "../api";
// import { IDirectionResponse, IProgressEvent } from "../models";
// import { useState } from "react";

// // const [state, send] = useMachine(filesMachine);

// // const getDestinationURL = async () => {
// //     try {
// //         const response: IDirectionResponse = await getFileDirection();
// //         if (response?.status === 200) {
// //             send("getURL");
// //             console.log(state);
// //         }
// //     }
// //     catch (e) {
// //         console.log(e);
// //     }
// // };

// // const sendFilesToURL = async () => {
// //     // const {url} = state;

// // };

// // const onUploadProgress = (progressEvent: { lengthComputable: any; total: any; target: { getResponseHeader: (arg0: string) => any; }; loaded: number; }) => {
// //     const totalLength = progressEvent.lengthComputable
// //         ? progressEvent.total
// //         : progressEvent.target.getResponseHeader(
// //               "content-length"
// //           ) ||
// //           progressEvent.target.getResponseHeader(
// //               "x-decompressed-content-length"
// //           );
// //     console.log("total", totalLength);
// //     if (totalLength) {
// //         let progress = Math.round(
// //             (progressEvent.loaded * 100) / totalLength
// //         );
// //         console.log(progress);
// //         return progress
// //     }
// // },

// // const fileAddingHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const files = e.target.files ? [...e.target.files] : [];
// //     send("addFiles");
// //     getDestinationURL();
// //     sendFilesToURL();
// // };

// export function useUploadFiles(): {
//   errorText: string;
//   sucessMessage: string;
//   progressBar: number;
//   //   addFiles: (text: string) => void;
//   //   cancelUpload: () => void;
//   //   retryUpload: () => void;
//   //   endWorking: () => void;
// } {
//   const [progressBar, setProgressBar] = useState(0);
//   const [state, send] = useMachine(filesMachine, {
//     services: {
//       getDestinationURL: async () => {
//         const response: IDirectionResponse = await getFileDirection();
//         const { id, url } = response;
//         return { id, url };
//       }
//   });

//   const onUploadProgress = (progressEvent: IProgressEvent) => {
//     const totalLength = progressEvent.lengthComputable
//       ? progressEvent.total
//       : progressEvent.target.getResponseHeader("content-length") ||
//         progressEvent.target.getResponseHeader("x-decompressed-content-length");
//     console.log("total", totalLength);
//     if (totalLength) {
//       let progress = Math.round((progressEvent.loaded * 100) / totalLength);
//       setProgressBar(progress);
//       return progress;
//     }
//   };

//   //     const getDestinationURL = async () => {
//   //         try {
//   //             const response: IDirectionResponse = await getFileDirection();
//   //             if (response?.status === 200) {
//   //                 send({type:"getURL", id: response.id, destinationURL: response.url});
//   //             }
//   //         }
//   //         catch (e) {
//   //             console.log(e);
//   //         }
//   //     };

//   //     const sendFilesToURL = async () => {
//   //         // const {url} = state;

//   //     };

//   //   const fileAddingHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   //     const files = e.target.files ? [...e.target.files] : [];
//   //     send("addFiles");
//   //     getDestinationURL();
//   //     sendFilesToURL();
//   // };

//   return {
//     errorText: state.context.errorMessage,
//     sucessMessage: state.context.sucessMessage,
//     progressBar,
//     // addFiles,
//     // retryUpload,
//     // cancelUpload
//   };
// }
