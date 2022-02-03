import { useContext, useState } from "react";
import ArtifactAPI from "../../hooks/artifactApi";
import ArtifactContext from "../../contexts/ArtifactContext";
import { rangeOfYearMonthsWithCounts } from "../../utils/Utils";
import { Button } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import CommentaryBox from "../commentary/CommentaryBox";

const SearchPanel = () => {

    const [artifactsContext, setArtifactsContext] = useContext(ArtifactContext);
    const { countsRequest, searchRequest, from, to } = artifactsContext;

    const [searchText, setSearchText] = useState('');

    const counts = async () => {

        ArtifactAPI.artifactCounts({ ...countsRequest, "from": from, "to": to })
            .then((response) => {
                let [results, maxBoxCount] = rangeOfYearMonthsWithCounts(1990, 2021, response)
                
                setArtifactsContext({
                    ...artifactsContext,
                    "countsResponse": results,
                    "maxBoxCount": maxBoxCount
                });
            })
            .catch((e) => {
                alert("error: " + e);
            });
    };

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