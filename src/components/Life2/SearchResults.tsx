import SearchResultRow from "./SearchResultRow";
import '../../styles/life2.css';

const SearchResults = (props) => {

    const { searchResponse } = props;

    return (
        <div id="results">
            {searchResponse.map((artifact, index) => {
                return (
                    <SearchResultRow artifact={artifact} key={index} index={index} />
                )
            })}
        </div>
    );
};

export default SearchResults;