import React, { createContext } from "react";
import {
  NoteBox,
  Note,
  NeatFile
} from "../models";

const neatContextState: NeatContextState = {
  fileIndex: 0,
  folders: [],
  noteBoxes: {},
  notes: [],
  comment: ""
};

type NeatContextState = {

  folders: string[];
  noteBoxes: Record<string, NoteBox>;
  notes: Note[];

  folder?: string;
  file?: NeatFile;
  fileIndex: number;
  noteBox?: NoteBox;
  note?: Note;
  comment: string;
};

type NeatContextProps = [NeatContextState, React.Dispatch<React.SetStateAction<NeatContextState>>];

const defaultValue: NeatContextProps = [neatContextState as NeatContextState, () => { }];

const NeatContext = createContext<NeatContextProps>(defaultValue);

export default NeatContext;
