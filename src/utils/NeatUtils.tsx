import { useContext } from "react";
import NeatContext from "../contexts/NeatContext";
import { NoteBox, Note, NeatFile } from "../models";

function reorder(array: any[], from: number, to: number): any[] {

    if (to < from) return [
        ...array.slice(0, to),
        array[from],
        ...array.slice(to, from),
        ...array.slice(from + 1)
    ];
    if (from < to) return [
        ...array.slice(0, from),
        ...array.slice(from + 1, to + 1),
        array[from],
        ...array.slice(to + 1)
    ]
    return array;
}

function initNoteBox(folder: string, files: NeatFile[]): NoteBox {
    
    let noteBox: NoteBox = {
        key: folder,
        files: files,
        notes: files.map((file) => {
            return(
                {
                    key: file.filename,
                    text: "",
                    pointers: [file.filename],
                    file: file,
                    data: {}
                }
            )
        })
    }
    
    return noteBox;
}

export { reorder, initNoteBox }