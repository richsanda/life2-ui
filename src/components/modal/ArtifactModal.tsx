import { prettyDate } from "../../utils/Utils";
import { Accordion, Button, ButtonGroup, Card, CloseButton, Dropdown, Modal, useAccordionButton } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../../styles/styles.css';
import '../../styles/magnifier.less';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArtifactImageFeature from "./ArtifactImageFeature";
import EmailFeature from "./EmailFeature";
import CommentaryBox from "../commentary/CommentaryBox";
import { useState } from "react";

function CustomToggle({ children, eventKey, handleEventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () => {
        handleEventKey(eventKey);
    });

    return (
        <>
            <div
                onClick={decoratedOnClick}
            >
                {children}
            </div>
        </>
    );
}

const ArtifactNote = (props) => {

    const { content, index, removeNote, toggleNote } = props;

    return (<Card>
        <Card.Header style={{ fontSize: ".75em", cursor: "pointer", padding: "2px" }}>
            <CloseButton style={{ float: "right" }} onClick={() => removeNote(index)} />
            <CustomToggle eventKey={"" + index} handleEventKey={toggleNote}>{content}</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey={"" + index}>
            <Card.Body style={{ padding: "0px", fontSize: ".75em" }}>
                <CommentaryBox
                    value={content}
                    onChange={() => { }}
                    onAdd={() => { }}
                />
            </Card.Body>
        </Accordion.Collapse>
    </Card>);
}

const CreateNoteDropdown = (props) => {

    const { addNote } = props;

    return (<Dropdown as={ButtonGroup}>
        <Button style={{ fontSize: ".75em" }} size="sm" onClick={() => addNote("whatever")}>+ note</Button>
        <Dropdown.Toggle split style={{ fontSize: ".75em" }} id="dropdown-basic" />
        <Dropdown.Menu>
            <Dropdown.Item size="sm" style={{ fontSize: ".75em" }} onClick={() => addNote("$$receipt")}>receipt</Dropdown.Item>
            <Dropdown.Item size="sm" style={{ fontSize: ".75em" }} onClick={() => addNote("$$journal")}>journal</Dropdown.Item>
            <Dropdown.Item size="sm" style={{ fontSize: ".75em" }} onClick={() => addNote("$$song")}>song</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>)
}

const ArtifactModal = (props) => {

    const [notes, setNotes] = useState<string[]>([]);
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

    const {
        show,
        artifact,
        commentary,
        relativeKeys,
        relativeKeyIndex,
        handleSelect,
        handleChange,
        handleClose } = props;

    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    {prettyDate(artifact.when)} &#8212; {artifact.title}
                </Modal.Title>
                <Button style={{ fontSize: ".75em" }} variant="primary" onClick={handleClose}>
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

                                ) : (artifact.types.indexOf("note") > -1) ?

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
                                    onAdd={() => { }}
                                />
                            </MDBRow>
                            <MDBRow>
                                <CreateNoteDropdown addNote={addNote} />
                            </MDBRow>
                            <MDBRow>
                                <Accordion activeKey={"" + activeKey} defaultActiveKey={null}>

                                    {notes.map((n, i) => {

                                        return (<ArtifactNote
                                            content={n}
                                            index={i}
                                            toggleNote={toggleNote}
                                            removeNote={removeNote}
                                        />);
                                    })}
                                </Accordion>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </Modal.Body>
        </Modal >
    )
}

export default ArtifactModal;