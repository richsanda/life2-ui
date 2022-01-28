import { getByDisplayValue } from "@testing-library/react";
import React, { useContext } from "react";
import NeatContext from "../../contexts/NeatContext";
import { NeatFile } from "../../models";
import Draggable from "react-draggable";
import { reorder } from "../../utils/NeatUtils";
import NeatAPI from "../../hooks/neatApi";

const NeatItem = (props) => {

  const { note, item, index, setSelectedIndex } = props;

  const [neatContext, setNeatContext] = useContext(NeatContext);
  const { noteBoxes, folder, notes, fileIndex, noteBox, note : currentNote } = neatContext;
  const isCurrent = note.file?.filename == currentNote?.file?.filename;

  const move = (count: number) => {

    let nextIndex = fileIndex ? fileIndex + count : 0;

    setNeatContext({
      ...neatContext,
      fileIndex: nextIndex,
      file: notes[nextIndex].file
    })
  }

  function onKeyPress(event) {
    var code = event.keyCode || event.which;
    if (code === 13) { //13 is the enter keycode
      move(1);
    } else if (code === 24) {
      move(-1);
    } else if (code === 25) {
      move(1);
    }
  }

  function onClick() {
   
      let nextFile = note.file;

      setNeatContext({
        ...neatContext,
        file: note.file,
        fileIndex: index,
        note: note,
        comment: note.text
      });

      NeatAPI.readNote(nextFile.folder, nextFile.filename).then((response) => {

        setNeatContext({
            ...neatContext,
            folder: folder,
            noteBox: noteBox,
            fileIndex: index,
            note: response ? response : note,
            file: nextFile,
            comment: response ? response.text : note.text
        })
      });

      setSelectedIndex(2);
    }

  if (note) {

    return (
      <div
        tabIndex={index}
        onKeyPress={onKeyPress}
        key={`${note.file?.filename}`}
        id={`${note.file?.filename}`}
        className={`neat-item ${isCurrent ? 'selected' : ''}`}
        onClick={onClick}
      >
        {displayName(note.file)} {note.text}
      </div>

    )
  } else {
    return (<></>)
  }
}

function displayName(file?: NeatFile) {

  if (!file) return;
  let val = file.filename.substring(0, 1);
  if (file.title) val = val + " " + file.title;
  if (file.index) val = val + " " + file.index;
  if (file.page) val = val + "." + file.page;

  return val;
}

export default NeatItem;