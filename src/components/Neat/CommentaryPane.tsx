import { render } from "@testing-library/react";
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import NeatContext from "../../contexts/NeatContext";
import ArtifactAPI from "../../hooks/artifactApi";

const CommentaryPane = () => {

    const [neatContext, setNeatContext] = useContext(NeatContext);
    const { noteBox, comment, notes, note, fileIndex } = neatContext;

    const setComment = (value) => {

        if (!note) return;

        let updatedNote = {
            ...note,
            text: value
        }

        setNeatContext({
            ...neatContext,
            note: updatedNote,
            notes: [
                ...notes.slice(0, fileIndex),
                updatedNote,
                ...notes.slice(fileIndex + 1)
            ],
            comment: value
        });
    }

    const onChange = (e, value) => {
        setComment(value);
    }

    const onSave = () => {

        if (!note || !noteBox) return;

        let file = noteBox.files[fileIndex];

        let updatedNote = {
            ...note,
            text: comment
        }

        ArtifactAPI.updateNote(file.folder, file.filename, updatedNote)
    }

    return (

        <div className="commentarypane">
            <div className="toppane button" onClick={onSave}>&nbsp;</div>
            <div>
                {/* <NeatTextbox value={comment} onChange={onChange} /> */}
                <Button
                    variant="outline-primary"
                    onClick={() => setComment(`${comment}\n${sep}\n${contactTemplate}`)}>contact</Button>{' '}
                <Button
                    variant="outline-primary"
                    onClick={() => setComment(`${comment}\n${sep}\n${receiptTemplate}`)}>receipt</Button>{' '}
                <Button
                    variant="outline-primary"
                    onClick={() => setComment(`${comment}\n${sep}\n${journalTemplate}`)}>journal</Button>{' '}
            </div>
        </div>

    )
}

const sep = "---";

const contactTemplate = "@[contact](artifact:contact) \n@[when:](field:when) \n@[where:](field:where) ";
const receiptTemplate = "@[receipt](artifact:receipt) \n@[when:](field:when) \n@[where:](field:where) ";
const journalTemplate = "@[journal](artifact:journal) \n@[when:](field:when) \n@[where:](field:where) ";

export default CommentaryPane;