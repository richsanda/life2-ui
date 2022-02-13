import { Accordion, Card, CloseButton, useAccordionButton } from "react-bootstrap";
import { prettyNote } from "../../utils/Utils";
import CommentaryBox from "../commentary/CommentaryBox";

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

    const { content, index, removeNote, toggleNote, personOptions, onChange } = props;

    return (
    <Card>
        <Card.Header style={{ textAlign: "left", fontSize: ".75em", cursor: "pointer", padding: "2px" }}>
            <CloseButton style={{ float: "right" }} onClick={() => removeNote(index)} />
            <CustomToggle eventKey={"" + index} handleEventKey={toggleNote}>{prettyNote(content.split("\n")[0])}&nbsp;</CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey={"" + index}>
            <Card.Body style={{padding: "4px"}}>
                <CommentaryBox
                    personOptions={personOptions}
                    value={content}
                    onChange={onChange}
                    onAdd={() => { }}
                />
            </Card.Body>
        </Accordion.Collapse>
    </Card>);
}

export default ArtifactNote;