
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.(machine).initial:invocation[0]": { type: "done.invoke.(machine).initial:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "getDestinationURL": "done.invoke.(machine).initial:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "getDestinationURL";
        };
        eventsCausingActions: {
          
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "getDestinationURL": "cancel" | "finish" | "xstate.init";
        };
        matchesStates: "initial" | "notify" | "uploadError" | "uploadInProgress";
        tags: never;
      }
  