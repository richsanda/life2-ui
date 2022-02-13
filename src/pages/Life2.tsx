import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../styles/life2.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResults from "../components/Life2/SearchResults";
import { rangeOfYearMonthsWithCounts, updateToken } from "../utils/Utils";
import SearchPane from "../components/Life2/SearchPane"
import { ArtifactCountsRequest, ArtifactCountsResponse, ArtifactSearchRequest, ArtifactSearchResponse } from "../models";
import ArtifactAPI from "../hooks/artifactApi";
import { artifactCounts, artifactSearch } from "../utils/requestTemplates.json";

const Life2 = () => {

    useEffect(() => {
        updateToken();
    }, [])

    const [countsRequest, setCountsRequest] = useState<ArtifactCountsRequest>(artifactCounts);
    const [countsResponse, setCountsResponse] = useState<ArtifactCountsResponse[]>([]);
    const [searchRequest, setSearchRequest] = useState<ArtifactSearchRequest>(artifactSearch);
    const [searchResponse, setSearchResponse] = useState<ArtifactSearchResponse[]>([]);
    const [maxBoxCount, setMaxBoxCount] = useState<number>(0);
    const [from, setFrom] = useState<string[]>([]);
    const [to, setTo] = useState<string[]>([]);

    const [searchText, setSearchText] = useState('');

    const counts = async () => {

        ArtifactAPI.artifactCounts({ ...countsRequest, "from": from, "to": to, "text": searchText })
            .then((response) => {
                let [results, maxBoxCount] = rangeOfYearMonthsWithCounts(1990, 2021, response)

                setCountsResponse(results);
                setMaxBoxCount(maxBoxCount);
            })
            .catch((e) => {
                alert("error: " + e);
            });
    };

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <SearchPane 
                    searchText={searchText} 
                    setSearchText={setSearchText}
                    counts={counts}
                    countsResponse={countsResponse}
                    setSearchResponse={setSearchResponse}
                    maxBoxCount={maxBoxCount}/>
                </MDBCol>
                <MDBCol md="6">
                    <MDBRow>
                        <MDBCol md="12" className="scrollable">
                            <SearchResults searchResponse={searchResponse}/>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Life2;