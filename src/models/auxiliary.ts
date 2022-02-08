import { Note } from "./note";

export interface NeatFile {
    folder: string;
    filename: string;
    extension: string;
    index?: number[];
    page?: number[];
    title?: string;
    type: string;
}

export interface NoteBox {
    key: string;
    files: NeatFile[];
    notes: Note[];
}

export interface Person {
    name: string;
    emails: string[];
}


export interface Trove {
    name: string;
}