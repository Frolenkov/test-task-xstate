import css from "./FileShortcut.module.css";
import { IFile } from "../../models";

const FileShortcut = ({file}: {file: IFile}) => {

    return (
        <div className={css.wrapper}>
           <span>Name: {file?.name}</span> 
        </div>
    )
}

export default FileShortcut;