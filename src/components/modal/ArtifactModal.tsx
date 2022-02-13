import { prettyDate, prettyNote } from "../../utils/Utils";
import { Accordion, Button, ButtonGroup, Card, CloseButton, Dropdown, Modal, useAccordionButton } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../../styles/styles.css';
import '../../styles/magnifier.less';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArtifactImageFeature from "./ArtifactImageFeature";
import EmailFeature from "./EmailFeature";
import CommentaryBox from "../commentary/CommentaryBox";
import { useEffect, useState } from "react";
import { Person, Trove } from "../../models";
import ArtifactAPI from "../../hooks/artifactApi";
import ArtifactNote from "./ArtifactNote";
import CreateNoteDropdown from "./CreateNoteDropdown";

const ArtifactModal = (props) => {

    const {
        show,
        artifact,
        commentary,
        notes,
        relativeKeys,
        relativeKeyIndex,
        handleSelect,
        handleChange,
        setNotes,
        handleSave,
        handleClose } = props;

    const [personOptions, setPersonOptions] = useState<Person[]>([]);

    useEffect(() => {
      ArtifactAPI.persons().then((response) => {
        setPersonOptions(response);
      })
    }, [])

    const [activeKey, setActiveKey] = useState<number>(0);

    const addNote = (content) => {
        setNotes([...notes, content]); setActiveKey(notes.length);
    }

    const removeNote = (removeKey) => {
        setNotes(notes.filter((n, i) => i != removeKey));
        setActiveKey(-1);
    }

    const toggleNote = (toggleKey) => {
        if (activeKey === toggleKey) {
            setActiveKey(-1);
        } else {
            setActiveKey(toggleKey);
        }
    }

    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    {prettyDate(artifact.when)} &#8212; {artifact.title}
                </Modal.Title>
                <Button style={{ fontSize: ".75em" }} variant="primary" onClick={handleSave}>
                    save
                </Button>
            </Modal.Header>
            <Modal.Body>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="8">
                            {
                                (!!!artifact.types) ? (

                                    <></>

                                ) : (artifact.types.indexOf("email") > -1) ? (

                                    <EmailFeature artifact={artifact} />

                                ) : (artifact.types.indexOf("neat") > -1) ?

                                    (<ArtifactImageFeature
                                        artifact={artifact}
                                        relativeKeys={relativeKeys}
                                        relativeKeyIndex={relativeKeyIndex}
                                        handleSelect={handleSelect}
                                    />

                                    ) :

                                    <></>
                            }
                        </MDBCol>
                        <MDBCol md="4">
                            <MDBRow>
                                <CommentaryBox
                                    value={commentary}
                                    onChange={handleChange}
                                    personOptions={personOptions}
                                    onAdd={() => { }}
                                />
                            </MDBRow>
                           
                            <MDBRow>
                                <Accordion activeKey={"" + activeKey} defaultActiveKey={null}>

                                    {notes.map((n, i) => {

                                        return (<ArtifactNote
                                            content={n}
                                            index={i}
                                            key={"note" + i}
                                            toggleNote={toggleNote}
                                            removeNote={removeNote}
                                            personOptions={personOptions}
                                            onChange={(e, val) => { 
                                                let tmp = [ ...notes];
                                                tmp[i] = val;
                                                setNotes(tmp);
                                             }}
                                        />);
                                    })}
                                </Accordion>
                            </MDBRow>
                            <MDBRow style={{padding: "8px"}}>
                                <CreateNoteDropdown addNote={addNote} />
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </Modal.Body>
        </Modal >
    )
}

export default ArtifactModal;