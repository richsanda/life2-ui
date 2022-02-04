import { MDBCol, MDBRow } from "mdbreact";
import CountGrid from "./CountGrid";
import SearchPanel from "./SearchPanel";
import '../../styles/life2.css';
import { useContext, useState } from "react";
import ArtifactContext from "../../contexts/ArtifactContext";
import { rangeOfYearMonthsWithCounts, updateToken } from "../../utils/Utils";
import ArtifactAPI from "../../hooks/artifactApi";

const SearchPane = () => {

    const [artifactsContext, setArtifactsContext] = useContext(ArtifactContext);
    const { countsRequest, searchRequest, from, to } = artifactsContext;

    const [searchText, setSearchText] = useState('');

    const counts = async () => {

        ArtifactAPI.artifactCounts({ ...countsRequest, "from": from, "to": to, "text" : searchText })
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
        <>
            <MDBRow>
                <MDBCol md="12">
                    <SearchPanel 
                    searchText={searchText}
                    setSearchText={setSearchText}
                    counts={counts}
                    />
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md="6">
                    <CountGrid 
                     searchText={searchText}
                     setSearchText={setSearchText}
                     counts={counts}
                    />
                </MDBCol>
                <MDBCol md="6">timeline</MDBCol>
            </MDBRow>
        </>
    )
}

export default SearchPane;