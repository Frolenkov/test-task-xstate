
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.(machine).readyToUpload:invocation[0]": { type: "done.invoke.(machine).readyToUpload:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.(machine).uploadInProgress:invocation[0]": { type: "done.invoke.(machine).uploadInProgress:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.(machine).uploadInProgress:invocation[0]": { type: "error.platform.(machine).uploadInProgress:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "getDestinationURL": "done.invoke.(machine).readyToUpload:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "getDestinationURL";
        };
        eventsCausingActions: {
          "addFilesAction": "getURL";
"errorAction": "error.platform.(machine).uploadInProgress:invocation[0]";
"getUrlAction": "done.invoke.(machine).readyToUpload:invocation[0]";
"initTitleAction": "cancel" | "finish";
"notifyAction": "done.invoke.(machine).uploadInProgress:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "getDestinationURL": "getURL";
        };
        matchesStates: "initial" | "notify" | "readyToUpload" | "uploadError" | "uploadInProgress";
        tags: never;
      }
  