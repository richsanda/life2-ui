import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

const CreateNoteDropdown = (props) => {

    const { onCreateNote } = props;

    return (<Dropdown as={ButtonGroup}>
        <Button style={{ fontSize: ".75em" }} size="sm" onClick={() => onCreateNote("")}>+ note</Button>
        <Dropdown.Toggle split style={{ fontSize: ".75em" }} id="dropdown-basic" />
        <Dropdown.Menu>
            <Dropdown.Item size="sm" style={{ fontSize: ".75em" }} onClick={() => onCreateNote(receiptTemplate)}>receipt</Dropdown.Item>
            <Dropdown.Item size="sm" style={{ fontSize: ".75em" }} onClick={() => onCreateNote(withdrawalTemplate)}>withdrawal</Dropdown.Item>
            <Dropdown.Item size="sm" style={{ fontSize: ".75em" }} onClick={() => onCreateNote(depositTemplate)}>deposit</Dropdown.Item>
            <Dropdown.Item size="sm" style={{ fontSize: ".75em" }} onClick={() => onCreateNote(journalTemplate)}>journal</Dropdown.Item>
            <Dropdown.Item size="sm" style={{ fontSize: ".75em" }} onClick={() => onCreateNote(contactTemplate)}>contact</Dropdown.Item>
            <Dropdown.Item size="sm" style={{ fontSize: ".75em" }} onClick={() => onCreateNote(letterTemplate)}>letter</Dropdown.Item>
            <Dropdown.Item size="sm" style={{ fontSize: ".75em" }} onClick={() => onCreateNote(emailTemplate)}>email</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>)
}

const contactTemplate = "$[contact](artifact:contact)\n$[when](field:when) \n$[where](field:where) ";
const receiptTemplate = "$[receipt](artifact:receipt)\n$[when](field:when) \n$[where](field:where) ";
const withdrawalTemplate = "$[receipt](artifact:receipt)\n$[when](field:when) \n$[where](field:where) \n$[withdrawal](field:withdrawal) \n$[balance](field:balance) ";
const depositTemplate = "$[receipt](artifact:receipt)\n$[when](field:when) \n$[where](field:where) \n$[deposit](field:deposit) \n$[balance](field:balance) ";
const journalTemplate = "$[journal](artifact:journal)\n$[when](field:when) \n$[where](field:where) ";
const letterTemplate = "$[letter](artifact:letter)\n$[when](field:when) \n$[from](field:from) \n$[to](field:to) ";
const emailTemplate = "$[email](artifact:email)\n$[when](field:when) \n$[from](field:from) \n$[to](field:to) ";

export default CreateNoteDropdown;