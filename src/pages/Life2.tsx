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

    const [numUpdates, setNumUpdates] = useState(0);

    const onUpdate = () => {
        setNumUpdates(numUpdates + 1);
    }

    const [searchText, setSearchText] = useState('');

    const [countsResponse, setCountsResponse] = useState<ArtifactCountsResponse[]>([]);
    const [maxBoxCount, setMaxBoxCount] = useState<number>(0);
    const [secondaryCountsResponse, setSecondaryCountsResponse] = useState<ArtifactCountsResponse[]>([]);
    const [secondaryMaxBoxCount, setSecondaryMaxBoxCount] = useState<number>(0);

    const [searchResponse, setSearchResponse] = useState<ArtifactSearchResponse[]>([]);

    const counts = async () => {

        ArtifactAPI.artifactCounts({ ...artifactCounts, "text": searchText })
            .then((response) => {
                let [results, maxBoxCount] = rangeOfYearMonthsWithCounts(1990, 2021, response)

                setCountsResponse(results);
                setMaxBoxCount(maxBoxCount);
            })
            .catch((e) => {
                alert("error: " + e);
            });
    };

    const secondaryCounts = async () => {

        ArtifactAPI.artifactCounts({ ...artifactCounts, "text": searchText, "source": "secondary" })
            .then((response) => {
                let [results, maxBoxCount] = rangeOfYearMonthsWithCounts(1990, 2021, response)

                setSecondaryCountsResponse(results);
                setSecondaryMaxBoxCount(maxBoxCount);
            })
            .catch((e) => {
                alert("error: " + e);
            });
    };

    const life2 = () => {

        let updatedSearch = {
            ...artifactSearch,
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
            ...artifactSearch,
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
                        secondaryCounts={secondaryCounts}
                        countsResponse={countsResponse}
                        secondaryCountsResponse={secondaryCountsResponse}
                        setSearchResponse={setSearchResponse}
                        maxBoxCount={maxBoxCount}
                        secondaryMaxBoxCount={secondaryMaxBoxCount}
                        numUpdates={numUpdates} />
                </MDBCol>
                <MDBCol md="6">
                    <MDBRow>
                        <MDBCol md="12">
                            <NewArtifactButton onUpdate={onUpdate} />
                            &nbsp;&nbsp;
                            <Button variant="primary" onClick={life2}>&#8635;</Button>
                            &nbsp;&nbsp;
                            <Button variant="primary" onClick={undated}>&#8594;</Button>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="12" className="scrollable">
                            <SearchResults
                                searchResponse={searchResponse}
                                numUpdates={numUpdates}
                                onUpdate={onUpdate} />
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Life2;