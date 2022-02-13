import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

const CreateNoteDropdown = (props) => {

    const { addNote } = props;

    return (<Dropdown as={ButtonGroup}>
        <Button style={{ fontSize: ".75em" }} size="sm" onClick={() => addNote("")}>+ note</Button>
        <Dropdown.Toggle split style={{ fontSize: ".75em" }} id="dropdown-basic" />
        <Dropdown.Menu>
            <Dropdown.Item size="sm" style={{ fontSize: ".75em" }} onClick={() => addNote(receiptTemplate)}>receipt</Dropdown.Item>
            <Dropdown.Item size="sm" style={{ fontSize: ".75em" }} onClick={() => addNote(journalTemplate)}>journal</Dropdown.Item>
            <Dropdown.Item size="sm" style={{ fontSize: ".75em" }} onClick={() => addNote(contactTemplate)}>contact</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>)
}

const contactTemplate = "$[contact](artifact:contact) \n$[when:](field:when) \n$[where:](field:where) ";
const receiptTemplate = "$[receipt](artifact:receipt) \n$[when:](field:when) \n$[where:](field:where) ";
const journalTemplate = "$[journal](artifact:journal) \n$[when:](field:when) \n$[where:](field:where) ";

export default CreateNoteDropdown;