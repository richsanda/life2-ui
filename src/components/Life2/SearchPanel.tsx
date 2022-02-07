import { Button } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CommentaryBox from "../commentary/CommentaryBox";

const SearchPanel = (props) => {

    const { searchText, setSearchText, counts } = props;

    const onKeyPress = (event) => {
        if(event.key === 'Enter'){
          counts();
        }
      }

    const onChange = (e, val) => {
        setSearchText(val);
    }

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="4">
                    <Button variant="primary" onClick={counts}>go</Button>
                </MDBCol>
                <MDBCol md="8">
                    <CommentaryBox 
                    onKeyPress={onKeyPress}
                    onChange={onChange}
                    onAdd={(...args) => console.log(searchText)}
                    value={searchText}
                    />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default SearchPanel;