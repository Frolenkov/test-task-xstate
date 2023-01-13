
import css from "./FileInput.module.css";
import { getFileDirection } from "../../api"
import { IDirectionResponse } from "../../models";
import { useMachine } from "@xstate/react";
import filesMachine from "../../machines/filesMachine";

const FileInput = () => {
  const [state, send] = useMachine(filesMachine, {
    services: {
      getDestinationURL: async () => {
        const response: IDirectionResponse = await getFileDirection();
        const { id, url } = response;
        return { id, url };
      }
    }});

  return (

    <label className={css.label}>
      <div className={css.mediaTitle}>
        Upload your media
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

  )
};

export default FileInput;