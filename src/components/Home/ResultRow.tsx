import React, { useContext } from "react";
import { prettyDate } from "../../utils/Utils";
import CorrespondenceApi from "../../hooks/correspondenceApi";
import ArtifactContext from "../../contexts/ArtifactContext";

const ResultRow = (props) => {

    const [artifactsContext, setArtifactsContext] = useContext(ArtifactContext);

    const { artifact, index } = props;

    const resultRowClick = async () => {

        CorrespondenceApi.artifactRead("billshwah", artifact.key)
            .then((response) => {
                setArtifactsContext({
                    ...artifactsContext,
                    "readResponse" : response
                });
                showFeature()
            })
            .catch(() => {
                alert("error");
            });
    };

    const showFeature = () => {
        let bg = document.getElementById("feature-background");
        if (bg) bg.style.display = "block";
    }

    return (
        <div className="artifact-link" key={`artifact${index}`}>
        <div onClick={resultRowClick}>
            <div className="artifact-link-col">{`${index + 1}`}. {prettyDate(artifact.sent)}</div>
            <div className="artifact-link-col">
                {`${artifact.from_email} -> ${artifact.to_emails.join(', ')}`}
            </div>
            <div className="artifact-link-col">{`[${artifact.subject}]`}</div>
        </div>
    </div>
    )
}

export default ResultRow;