import { render } from "@testing-library/react";
import React, { useContext, useState } from "react";
import NeatContext from "../../contexts/NeatContext";

const CommentaryPane = () => {

    const [neatContext, setNeatContext] = useContext(NeatContext);
    const { noteBoxes, comment, notes, note, fileIndex } = neatContext;

    const [text, setText] = useState(note?.text);

    const onChange = (e) => {

        if (!note) return;

        let updatedNote = {
            ...note,
            text: e.target.value
        }

        setNeatContext({
            ...neatContext,
            note: updatedNote,
            notes: [
                ...notes.slice(0, fileIndex),
                updatedNote,
                ...notes.slice(fileIndex + 1)
            ],
            comment: e.target.value
        });

        setText(e.target.value);
    }

    return (

        <div className="commentarypane">
            <textarea
                cols={65}
                rows={45}
                onChange={onChange}
                value={comment} />
        </div>

    )
}

export default CommentaryPane;