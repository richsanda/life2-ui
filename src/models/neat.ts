export interface NeatFile {
    folder: string;
    filename: string;
    extension: string;
    index?: number[];
    page?: number[];
    title?: string;
    type: string;
}

// {
//     "folder" : "folder-rich-is-awesome",
//     "filename" : "Document- Page 1_10",
//     "extension" : "jpg",
//     "index" : 10,
//     "page" : 1,
//     "title" : " ",
//     "type" : "Document"
//   }

export interface NoteBox {
    key: string;
    notes: Note[];
}

export interface Note {
    key: string;
    text: string;
    pointers: string[];
    file: NeatFile;
}