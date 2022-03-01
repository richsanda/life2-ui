import SearchResultRow from "./SearchResultRow";
import '../../styles/life2.css';
import { MDBRow } from "mdbreact";

const SearchResults = (props) => {

    const { searchResponse, numUpdates, onUpdate } = props;

    return (
        <div id="results">
            {searchResponse.map((artifact, index) => {
                return (
                    <SearchResultRow 
                    artifact={artifact} 
                    numUpdates={numUpdates}
                    onUpdate={onUpdate}
                    key={index} 
                    index={index} />
                )
            })}
        </div>
    );
};

export default SearchResults;