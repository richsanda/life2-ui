import { useState } from "react";
import { Button } from "react-bootstrap";
import ArtifactAPI from "../../hooks/artifactApi";
import Life2 from "../../pages/Life2";
import ArtifactModal from "./ArtifactModal";

const NewArtifactButton = (props) => {

    const { onSave } = props;

    const [show, setShow] = useState(false);
    const handleAdd = () => { setCommentary(''); setNotes([]); setShow(true); }
    const handleClose = () => { setShow(false); }
    const handleSave = () => { handleClose(); addNote(); onSave(); }

    const [commentary, setCommentary] = useState('');
    const [notes, setNotes] = useState<string[]>([])

    const addNote = () => {

        const trove = "life2";
        let updatedNote = {
          trove: trove,
          text: commentary,
          notes: notes
        }
    
        ArtifactAPI.addNote(trove, updatedNote);
      }

    return (
        <>
            <Button variant="primary" onClick={handleAdd}>add</Button>
            <ArtifactModal
                show={show}
                commentary={commentary}
                handleChange={(e, val) => setCommentary(val)}
                notes={notes}
                setNotes={setNotes}
                handleClose={handleClose}
                handleSave={handleSave}
            />
        </>
    )
}

export default NewArtifactButton;