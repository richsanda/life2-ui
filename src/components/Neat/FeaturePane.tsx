import { useContext, useState } from "react";
import NeatContext from "../../contexts/NeatContext";
import { NeatFile } from "../../models";
import CommentaryPane from "./CommentaryPane";
import Commentary from "./CommentaryPane";

const FeaturePane = (props) => {

    const [neatContext, setNeatContext] = useContext(NeatContext);
    const { file, noteBox, notes, note, fileIndex } = neatContext;

    const move = (count: number) => {

        let nextIndex = fileIndex ? fileIndex + count : 0;

        setNeatContext({
            ...neatContext,
            fileIndex: nextIndex,
            note: notes[nextIndex],
            file: noteBox ? notes[nextIndex].file : notes[nextIndex].file,
            comment: notes[nextIndex].text
        })
    }

    function onKeyPress(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            move(1);
        } else if (code === 24) {
            move(-1);
        } else if (code === 25) {
            move(1);
        }
    }

    return (
        <div className="featurepane">
            <div className="prev button" onClick={() => move(-1)}>&nbsp;</div>
            {file ?
                <img className="center-fit" src={imgSrc(file)}></img>
                :
                <></>
            }
            <div className="next button" onClick={() => move(1)}>&nbsp;</div>
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