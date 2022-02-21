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
import { Button } from "react-bootstrap";
import NewArtifactButton from "../components/modal/NewArtifactButton";

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

    const life2 = () => {

        let updatedSearch = {
            ...searchRequest,
            after: undefined,
            before: undefined,
            who: [],
            troves: ["life2"],
            text: ""
        }

        ArtifactAPI.artifactSearch(updatedSearch)
            .then((response) => {
                setSearchResponse(response);
            })
            .catch(() => {
                alert("error");
            });
    }

    const undated = () => {

        let updatedSearch = {
            ...searchRequest,
            after: undefined,
            before: undefined,
            text: searchText
        }

        ArtifactAPI.artifactSearch(updatedSearch)
            .then((response) => {
                setSearchResponse(response);
            })
            .catch(() => {
                alert("error");
            });
    }

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
                        maxBoxCount={maxBoxCount} />
                </MDBCol>
                <MDBCol md="6">
                    <MDBRow>
                        <MDBCol md="12">
                            <NewArtifactButton onSave={life2} />
                            &nbsp;&nbsp;
                            <Button variant="primary" onClick={life2}>&#8635;</Button>
                            &nbsp;&nbsp;
                            <Button variant="primary" onClick={undated}>&#8594;</Button>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="12" className="scrollable">
                            <SearchResults searchResponse={searchResponse} />
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Life2;