import { Button } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CommentaryBox from "../commentary/CommentaryBox";
import { useEffect, useState } from "react";
import { Person, Tag, Trove } from "../../models";
import ArtifactAPI from "../../hooks/artifactApi";

const SearchPanel = (props) => {

  const [personOptions, setPersonOptions] = useState<Person[]>([]);
  const [troveOptions, setTroveOptions] = useState<Trove[]>([]);
  const [tagOptions, setTagOptions] = useState<Tag[]>([]);

  useEffect(() => {
    ArtifactAPI.persons().then((response) => {
      setPersonOptions(response);
    })
    ArtifactAPI.troves().then((response) => {
      setTroveOptions(response);
    })
    ArtifactAPI.tags().then((response) => {
      setTagOptions(response);
    })
  }, [])

  const { searchText, setSearchText, go } = props;

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      go();
    }
  }

  const onChange = (e, val) => {
    setSearchText(val);
  }

  return (

    <MDBContainer>
      <MDBRow>
        <MDBCol md="4">
          <Button variant="primary" onClick={go}>go</Button>
        </MDBCol>
        <MDBCol md="8">
          <CommentaryBox
            onKeyPress={onKeyPress}
            onChange={onChange}
            onAdd={(...args) => console.log(searchText)}
            value={searchText}
            personOptions={personOptions}
            troveOptions={troveOptions}
            tagOptions={tagOptions}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>

  );
};

export default SearchPanel;