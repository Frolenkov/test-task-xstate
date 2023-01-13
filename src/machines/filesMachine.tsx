import { assign, createMachine } from "xstate";
import { uploadFileRequest } from "../services";

const filesMachine =
    createMachine({
        initial: "initial",
        schema: {
            events: {} as
                | { type: "getURL"; files:  string[] | Blob[] }
                | { type: "sendFiles" }
                | { type: "retry" }
                | { type: "cancel" }
                | { type: "success"; }
                | { type: "error"; }
                | { type: "finish" },
            context: {} as { id: string, destinationURL: string, files: string[] | Blob[] },
            services: {} as
                | {
                    getDestinationURL: {
                        data: { id: string, url: string }
                    }
                }
                | {
                    uploadFileRequest: {
                        data: any
                    }
                }
        },
        context: {
            files: [],
            id: "",
            destinationURL: "",
        },
        states: {
            "initial": {
                on: {
                    "getURL": {
                        target: "readyToUpload",
                        actions: assign({
                            files: (context, event) => {
                                console.log(event.files)
                                return event.files
                            }
                          }),
                    }
                }
            },
            "readyToUpload": {
                // @ts-ignore
                invoke: {
                    src: "getDestinationURL",
                    onDone: {
                        target: "uploadInProgress",
                        actions: assign({
                            id: (context: any, event: { data: { id: string; }; }) => event.data.id,
                            destinationURL: (context: any, event: { data: { url: string; }; }) => event.data.url,
                        }),
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
                    src: (context, event) => uploadFileRequest(context.files, context.id, context.destinationURL),
                    onDone: {
                        target: "notify",
                    },
                    onError: {
                        target: "uploadError",
                    },
                },
                on: {
                    "cancel": {
                        target: "initial"
                    },
                }
            },
            "uploadError": {
                on: {
                    "retry": {
                        target: "uploadInProgress"
                    },
                    "cancel": {
                        target: "initial"
                    },
                },
            },
            "notify": {
                on: {
                    "finish": {
                        target: "initial",
                    }
                }
            }
        }
    });

export default filesMachine;