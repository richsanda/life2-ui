import React, { useContext } from "react";
import ArtifactContext from "../../contexts/ArtifactContext";
import ArifactAPI from "../../hooks/artifactApi";
import SearchResultRow from "./SearchResultRow";
import '../../styles/life2.css';

const Results = () => {

    const [artifactsContext, setArtifactsContext] = useContext(ArtifactContext);
    const { searchResponse } = artifactsContext;

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

export default Results;