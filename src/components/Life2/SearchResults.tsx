import React, { useContext } from "react";
import ArtifactContext from "../../contexts/ArtifactContext";
import CorrespondenceApi from "../../hooks/correspondenceApi";
import SearchResultRow from "./SearchResultRow";
import '../../styles/life2.css';

const Results = () => {

    const [artifactsContext, setArtifactsContext] = useContext(ArtifactContext);
    const { searchResponse } = artifactsContext;

    return (
        <div id="results">
        {/* <div class="artifact-link" data-ng-repeat="artifact in artifacts" id="{{'artifact' + $index}}">
            <div data-ng-click="read($index, artifact.trove, artifact.key)">
                <div class="artifact-link-col">{{ $index + 1 }}. {{ prettyDateify(artifact.sent) }}</div>
                <div class="artifact-link-col">
                    {{ artifact.from_email + ' -> ' + artifact.to_emails.join(', ') }}
                </div>
                <div class="artifact-link-col">{{ '[' + artifact.subject + ']' }}</div>
            </div>
        </div> */}
        {searchResponse.map((artifact, index) => {
                return (
                  <SearchResultRow artifact={artifact} index={index}/>
                )
            })}
    </div>
    );
};

export default Results;