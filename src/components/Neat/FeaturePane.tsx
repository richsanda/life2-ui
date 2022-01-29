import { useContext, useState } from "react";
import NeatContext from "../../contexts/NeatContext";
import ArtifactAPI from "../../hooks/artifactApi";
import { NeatFile } from "../../models";
import './imageHoverStyle.css';

const FeaturePane = (props) => {

    const [neatContext, setNeatContext] = useContext(NeatContext);
    const { file, noteBox, notes, note, fileIndex, comment } = neatContext;

    const move = (count: number) => {
        saveCurrent(() => { readNext(count); });
    }

    const saveCurrent = (callback) => {

        if (!note || !noteBox) return;

        let currentFile = noteBox.files[fileIndex];

        let updatedNote = {
            ...note,
            text: comment
        };

        ArtifactAPI.updateNote(currentFile.folder, currentFile.filename, updatedNote)
            .then((response) => {
                callback();
            })
    }

    const readNext = (count: number) => {

        let nextIndex = fileIndex + count;

        let nextFile = noteBox ? noteBox.files[nextIndex] : notes ? notes[nextIndex].file : undefined;

        if (!nextFile) return;

        ArtifactAPI.readNote(nextFile.folder, nextFile.filename).then((response) => {

            setNeatContext({
                ...neatContext,
                fileIndex: nextIndex,
                note: response ? response : notes[nextIndex],
                file: nextFile,
                comment: response ? response.text : notes[nextIndex].text
            })
        });
    }

    return (
        <div className="featurepane">
                <div className="prev button" onClick={() => move(-1)}>&nbsp;</div>
                :
                <div className="prev">&nbsp;</div>
          
            {file ?
                <img className="center-fit" src={imgSrc(file)}></img>
                :
                <></>
            }
            {fileIndex < notes.length - 1 ?
                <div className="next button" onClick={() => move(1)}>&nbsp;</div>
                :
                <div className="next">&nbsp;</div>
            } 
        </div>
    )
}

function imgSrc(file?: NeatFile) {

    if (!file) return;

    let val = "/w/neat/" +
        file.folder +
        "/" +
        file.filename +
        "." +
        file.extension;

    return val;
}

export default FeaturePane;