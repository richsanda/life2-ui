import { MDBCol, MDBRow } from "mdbreact";
import CountGrid from "./CountGrid";
import SearchPanel from "./SearchPanel";
import '../../styles/life2.css';

const SearchPane = (props) => {

    const {
        searchText,
        setSearchText,
        maxBoxCount,
        secondaryMaxBoxCount,
        counts,
        secondaryCounts,
        countsResponse,
        secondaryCountsResponse,
        setSearchResponse,
        numUpdates
    } = props;

    return (
        <>
            <MDBRow>
                <MDBCol md="12">
                    <SearchPanel
                        searchText={searchText}
                        setSearchText={setSearchText}
                        go={() => { counts(); secondaryCounts(); }}
                        numUpdates={numUpdates}
                    />
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol md="6">
                    <CountGrid
                        searchText={searchText}
                        countsResponse={countsResponse}
                        maxBoxCount={maxBoxCount}
                        setSearchResponse={setSearchResponse}
                    />
                </MDBCol>
                <MDBCol md="6">
                    <CountGrid
                        searchText={searchText}
                        countsResponse={secondaryCountsResponse}
                        maxBoxCount={secondaryMaxBoxCount}
                        setSearchResponse={setSearchResponse}
                        source={"secondary"}
                    />
                </MDBCol>
            </MDBRow>
        </>
    )
}

export default SearchPane;