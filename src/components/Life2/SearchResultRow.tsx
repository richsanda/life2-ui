import React, { useContext, useState } from "react";
import { prettyDate } from "../../utils/Utils";
import ArtifactAPI from "../../hooks/artifactApi";
import '../../styles/styles.css';
import '../../styles/magnifier.less';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArtifactModal from "../modal/ArtifactModal";

const ResultRow = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => { setShow(false); updateNote(); }
    const handleShow = () => setShow(true);

    const { artifact, index } = props;

    const [artifactData, setArtfactData] = useState(artifact);
    const [commentary, setCommetary] = useState('');
    const [notes, setNotes] = useState([]);
    const [relativeKeys, setRelativeKeys] = useState<string[]>([]);
    const [relativeKeyIndex, setRelativeKeyIndex] = useState(0);

    const resultRowClick = async () => {

        retrieveArtifact(
            artifact.trove,
            artifact.key,
            (response) => {
                setArtfactData(response);
                setCommetary(response.description);
                setNotes(response.notes);
                setRelativeKeys(response.relative_keys);
                setRelativeKeyIndex(response.relative_key_index);
                handleShow();
            });
    };

    const handleSelect = (newIndex) => {

        updateNote();

        const troveAndKey = relativeKeys[newIndex].split("/");

        retrieveArtifact(
            troveAndKey[0],
            troveAndKey[1],
            (response) => {
                setArtfactData(response);
                setCommetary(response.description);
                setNotes(response.notes);
                setRelativeKeyIndex(newIndex);
            });
    };

    const retrieveArtifact = (trove, key, callback) => {

        ArtifactAPI.artifactRead(trove, key)
            .then(callback)
            .catch((e) => {
                alert("error retrieving artifact with id: " + key + " " + e);
            });
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
            })
    }

    return (
        <>
            <div className="artifact-link" key={`artifact${index}`}>
                <div onClick={resultRowClick}>
                    <div className="artifact-link-col">
                        {`${index + 1}. `}
                        {`${prettyDate(artifact.when)} — ${artifact.trove} — ${artifact.title} `}
                    </div>
                </div>
            </div>
            <ArtifactModal
                show={show}
                commentary={commentary}
                notes={notes}
                relativeKeys={relativeKeys}
                relativeKeyIndex={relativeKeyIndex}
                handleSelect={handleSelect}
                handleChange={(e, val) => setCommetary(val)}
                setNotes={setNotes}
                handleClose={handleClose}
                artifact={artifactData} />
        </>
    )
}

export default ResultRow;