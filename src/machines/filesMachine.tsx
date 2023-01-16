import { assign, createMachine } from "xstate";
import { uploadFileService } from "../services";
import { IFile } from "../models";

const filesMachine =

    createMachine({
        initial: "initial",
        schema: {
            events: {} as
                | { type: "getURL"; files: IFile[] }
                | { type: "sendFiles" }
                | { type: "retry" }
                | { type: "cancel" }
                | { type: "success"; }
                | { type: "error"; }
                | { type: "finish" },
            context: {} as { id: string, destinationURL: string, files: IFile[], title: string },
            services: {} as
                | {
                    getDestinationURL: {
                        data: { id: string, url: string }
                    }
                }
                | {
                    uploadFileService: {
                        data: any
                    }
                }
        },
        tsTypes: {} as import("./filesMachine.typegen").Typegen0,
        context: {
            files: [],
            id: "",
            destinationURL: "",
            title: "Upload your media"
        },
        states: {
            "initial": {
                on: {
                    "getURL": {
                        target: "readyToUpload",
                        actions: ["addFilesAction"]
                    }
                }
            },
            "readyToUpload": {
                invoke: {
                    src: "getDestinationURL",
                    onDone: {
                        target: "uploadInProgress",
                        actions: ["getUrlAction"]
                    }
                },
                on: {
                    "cancel": {
                        target: "initial"
                    },
                }
            },
            "uploadInProgress": {
                invoke: {
                    src: (context, event) => uploadFileService(context.files, context.id, context.destinationURL),
                    onDone: {
                        target: "notify",
                        actions: ["notifyAction"],
                    },
                    onError: {
                        target: "uploadError",
                        actions: ["errorAction"],
                    },
                },
                on: {
                    "cancel": {
                        target: "initial",
                        actions: ["initTitleAction"],
                    },
                }
            },
            "uploadError": {
                on: {
                    "retry": {
                        target: "uploadInProgress"
                    },
                    "cancel": {
                        target: "initial",
                        actions: ["initTitleAction"],
                    },
                },
            },
            "notify": {
                on: {
                    "finish": {
                        target: "initial",
                        actions: ["initTitleAction"],
                    }
                }
            }
        }
    },
        {
            actions: {
                addFilesAction: assign({
                    files: (_, event) => event.files,
                    title: (context) => "Getting URL"
                }),
                getUrlAction: assign({
                    // id: (_, event }) => event.data.id,
                    destinationURL: (_, event: any) => event.data.url,
                    title: (context) => "Upload in progress"
                }),
                notifyAction: assign({
                    title: (context) => "Files uploaded"
                }),
                errorAction: assign({
                    title: (context) => "Upload error"
                }),
                initTitleAction: assign({
                    title: (context) => "Upload your media"
                }),
            }
        }
    );

export default filesMachine;
