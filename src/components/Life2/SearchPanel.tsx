import { Button } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CommentaryBox from "../commentary/CommentaryBox";
import { useEffect, useState } from "react";
import { Person, Trove } from "../../models";
import ArtifactAPI from "../../hooks/artifactApi";

const SearchPanel = (props) => {

    const [personOptions, setPersonOptions] = useState<Person[]>([]);
    const [troveOptions, setTroveOptions] = useState<Trove[]>([]);
  
    useEffect(() => {
      ArtifactAPI.persons().then((response) => {
        setPersonOptions(response);
      })
      ArtifactAPI.troves().then((response) => {
        setTroveOptions(response);
      })
    }, [])

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
                    personOptions={personOptions}
                    troveOptions={troveOptions}
                    />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default SearchPanel;