import { useMachine } from "@xstate/react";
import FileInput from "../FileInput/FileInput";
import css from "./Uploader.module.css";
import filesMachine from "../../machines/filesMachine";

const Uploader = () => {
    const [state, send] = useMachine(filesMachine);

    return (
        <div className={css.wrapper}>
            <h1>Please add your files</h1>
            <FileInput/>
        </div>
    )
}

export default Uploader;