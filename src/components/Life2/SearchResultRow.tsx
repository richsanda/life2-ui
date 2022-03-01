import React, { useContext, useState } from "react";
import { prettyDate, timelineFill } from "../../utils/Utils";
import ArtifactAPI from "../../hooks/artifactApi";
import '../../styles/styles.css';
import '../../styles/magnifier.less';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArtifactModal from "../modal/ArtifactModal";
import { MDBCol, MDBRow } from "mdbreact";
import moment from "moment";

const ResultRow = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => { handleClose(); updateNote(); }

    const { artifact, index, numUpdates, onUpdate } = props;

    const [artifactData, setArtfactData] = useState(artifact);
    const [commentary, setCommentary] = useState('');
    const [notes, setNotes] = useState([]);
    const [relativeKeys, setRelativeKeys] = useState<string[]>([]);
    const [relativeKeyIndex, setRelativeKeyIndex] = useState(0);

    const resultRowClick = async () => {

        retrieveArtifact(
            artifact.trove,
            artifact.key,
            true,
            (response) => {
                setArtfactData(response);
                setCommentary(response.description);
                setNotes(response.notes);
                setRelativeKeys(response.relative_keys || [artifact.trove + "/" + artifact.key]);
                setRelativeKeyIndex(response.relative_key_index || 0);
                handleShow();
            });
    };

    const handleSelect = (newIndex) => {

        updateNote();

        const troveAndKey = relativeKeys[newIndex].split("/");

        retrieveArtifact(
            troveAndKey[0],
            troveAndKey[1],
            false,
            (response) => {
                setArtfactData(response);
                setCommentary(response.description);
                setNotes(response.notes);
                setRelativeKeyIndex(newIndex);
            });
    };

    const retrieveArtifact = (trove, key, relatives, callback) => {

        if (trove === "life2") {
            ArtifactAPI.noteRead(trove, key, relatives)
                .then(callback)
                .catch((e) => {
                    alert("error retrieving artifact with id: " + key + " " + e);
                });
        } else {

            ArtifactAPI.artifactRead(trove, key, relatives)
                .then(callback)
                .catch((e) => {
                    alert("error retrieving artifact with id: " + key + " " + e);
                });
        }
    }

    const updateNote = () => {

        const troveAndKey = relativeKeys[relativeKeyIndex].split("/");
        const trove = troveAndKey[0];
        const key = troveAndKey[1];

        const updatedNote = {
            trove: trove,
            key: key,
            text: commentary,
            notes: notes
        }

        ArtifactAPI.updateNote(trove, key, updatedNote)
            .then((response) => {
                console.log("updated note: " + trove + "/" + key)
                onUpdate();
            })
    }

    const [start, width] = timelineFill(new Date("1990-01-01"), new Date(), artifact.when, artifact.when2);

    return (
        <>
            <div className="artifact-link">
                <div className="artifact-link-col row-timeline">
                    <div className="row-timeline-fill" style={{left: "" + start + "%", width: "" + width + "%"}}>&nbsp;</div>
                </div>
                <div className="artifact-link-col" onClick={resultRowClick}>
                    <span style={{fontSize: ".7em"}}>{`${index + 1}. `}</span>
                    <span style={{fontStyle: "italic", fontSize: ".9em", fontWeight: "bold"}}>{`${artifact?.when_display || prettyDate(artifact.when)}`}</span>
                    <span style={{fontStyle: "italic", fontSize: ".9em"}}>{`   (${artifact.trove})   `}</span>{`${artifact.title || artifact.key} `}
                </div>
            </div>
            <ArtifactModal
                show={show}
                commentary={commentary}
                setCommentary={setCommentary}
                notes={notes}
                setNotes={setNotes}
                relativeKeys={relativeKeys}
                relativeKeyIndex={relativeKeyIndex}
                handleSelect={handleSelect}
                handleChange={(e, val) => setCommentary(val)}
                handleClose={handleClose}
                handleSave={handleSave}
                artifact={artifactData}
                numUpdates={numUpdates}
                onUpdate={onUpdate} />
        </>
    )
}

export default ResultRow;