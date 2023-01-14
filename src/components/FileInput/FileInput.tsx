
import css from "./FileInput.module.css";
import { getFileDirection } from "../../api"
import { IDirectionResponse } from "../../models";
import { useMachine } from "@xstate/react";
import filesMachine from "../../machines/filesMachine";
import FileShortcut from "../FileShortcut/FileShortcut";

const FileInput = () => {
  const [state, send] = useMachine(filesMachine, {
    services: {
      getDestinationURL: async () => {
        const response: IDirectionResponse = await getFileDirection();
        const { id, url } = response;
        return { id, url };
      }
    }
  });

  const { files, title } = state.context;

  const isUploadReady = state.matches("initial");
  const isUploadInProgress = state.matches("readyToUpload") || state.matches("uploadInProgress") ;
  const uploadError = state.matches("uploadError");
  const uploadSuccess = state.matches("notify");

  return (
    <div className={css.wrapper}>
      <h1>{title}</h1>
      {isUploadReady &&
        <label className={css.label}>
          <div className={css.mediaTitle}>
            {title}
          </div>
          <input
            multiple={true}
            onChange={(e) => send({
              type: "getURL",
              // @ts-ignore
              files: [...e.target.files],
            })}

            type="file"
            className={css.input}
          />
        </label>
      }
      {isUploadInProgress &&
        <div className={css.stopButton} onClick={() => send({ type: "cancel" })}>Click here</div>
      }
      {uploadError &&
        <div className={css.stopButton} onClick={() => send({ type: "retry" })}>Retry</div>
      }
      {uploadSuccess &&
        <div className={css.stopButton} onClick={() => send({ type: "finish" })}>Ok</div>
      }
      {files.map(file => <FileShortcut key={file.size} file={file} />)}
    </div>
  )
};

export default FileInput;