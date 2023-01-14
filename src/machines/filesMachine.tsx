import { assign, createMachine } from "xstate";
import { uploadFileService } from "../services";
import { IFile } from "../models";

const filesMachine =

    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgNwBdd0AbAYhgoFUAlAGQG0AGAXUVAAOAe1iVcQ-PxAAPRAEYuXOSQDMAFhUB2TXIAcAJgCsmtfs0AaEAE9EaucoBsTh3oCcuw4a6GHagL5+lmhYeISkAE5g6BBWACpCTAI0QtF0EBJgZPgAbkIA1pnBOATEJJHRcQlJKRAIBLmY6FQS3DytUsKizZJIMvKKyupaOgbGphbWiLrKaq5zrlwqPnpyapoBQRjFYWVRMfGJyamN+JhgNO29nWISUrII9ly6JGpcDvrv+l8OhrpqljYECoXCQ5M4NAZNPpXD8NiAiqFSgBXarRACS+AACuEhFBIrBYGkMllcgUSAiSqQUUcIBjsbj8bA6jkhI1uq1LoIRDceqB7oYVFwSB5XCpdCp9HJRVDdADEF81KD9LMPFxNA5XBC4RSdtSanScXi4ISwOEceESEkmgAzIThVDkraIqmo2lYw2M5kNJrifAc3gdbndO7yVyOLii3Qi1yeDT-SYIDwkTRPCVLLRq-Tap2Ukh69HuhnGugnM4XANXIO+kMIAVCkViiVSrT6WUJ4EOZOzVyaHs9lMubMhXP5iAAUTNdrokQo4SsnJA12DvXuUvDkejsfUcoevZIMfFcmhmhFTnWgXhOd1ron5pL6FO5wXS+rK9D67Fm8McZ3al0mheeYHE0LQHGmNUh22Up8CEKhrSsOhrXIWBsGfKtbjfBAT1cVRNC8fQuDsFwo30HdlUMfd5lcL49AcJQfACC8YIgOApB1YhAy6V8+UQABaBwd34yDnSyMRaE4nkayjHChm0ewFi+Uj22AkhlTmQxNR+X49HPTZhx2cp9iqGkJOXHiHklFR9z+FQwzsptDB3dQhWcBw00lbwT2EkdXQNIsCVM7i+iBUxhQ0sUNOMUZjB3BQhW7dxPHUMxJV0bzrxpW87UCjDzNMWKwReX4VFWQUaLmFR0ug2DcHgnLeWCsD9FwrwpRPN5gIEhNlU7LwBiMLwoV+fxGKAA */
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
                    title: "Getting URL"
                }),
                getUrlAction: assign({
                    id: (_, event: { data: { id: string; }; }) => event.data.id,
                    destinationURL: (_, event: { data: { url: string; }; }) => event.data.url,
                    title: "Upload in progress"
                }),
                notifyAction: assign({
                    title: "Files uploaded"
                }),
                errorAction: assign({
                    title: "Upload error"
                }),
                initTitleAction: assign({
                    title: "Upload your media"
                }),
            }
        }
    );

export default filesMachine;
