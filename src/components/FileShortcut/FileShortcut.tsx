import css from "./FileShortcut.module.css";
import { IFile } from "../../models";
import { memo } from "react";

const FileShortcut = ({file}: {file: IFile}) => {
    

    return (
        <div className={css.wrapper}>
           <span>Name: {file?.name}</span> 
        </div>
    )
}

export default memo(FileShortcut);