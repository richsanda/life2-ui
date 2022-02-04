import { Button } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CommentaryBox from "../commentary/CommentaryBox";

const SearchPanel = (props) => {

    const { searchText, setSearchText, counts } = props;

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="4">
                    <Button variant="primary" onClick={counts}>go</Button>
                </MDBCol>
                <MDBCol md="8">
                    <CommentaryBox 
                    value={searchText}
                    onChange={(e, val) => setSearchText(val)}
                    onAdd={() => {}}
                    />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default SearchPanel;