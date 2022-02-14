import { MDBCol, MDBRow } from "mdbreact";
import CountGrid from "./CountGrid";
import SearchPanel from "./SearchPanel";
import '../../styles/life2.css';

const SearchPane = (props) => {

    const {
        searchText, 
        setSearchText, 
        maxBoxCount, 
        counts, 
        countsResponse, 
        setSearchResponse
    } = props;

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
                        countsResponse={countsResponse}
                        maxBoxCount={maxBoxCount}
                        setSearchResponse={setSearchResponse}
                    />
                </MDBCol>
                <MDBCol md="6">
                <CountGrid
                        searchText={searchText}
                        setSearchText={setSearchText}
                        counts={counts}
                        countsResponse={[]}
                        maxBoxCount={maxBoxCount}
                        setSearchResponse={setSearchResponse}
                    />
                </MDBCol>
            </MDBRow>
        </>
    )
}

export default SearchPane;