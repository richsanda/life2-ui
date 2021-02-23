import React, { useContext } from "react";
import ArtifactContext from "../../contexts/ArtifactContext";
import { prettyDate, bodyify, preify } from "../../utils/Utils";

const Feature = () => {

    const [artifactContext] = useContext(ArtifactContext);
    const { readResponse: feature } = artifactContext;

    const hideFeature = () => {
        let bg = document.getElementById("feature-background");
        if (bg) bg.style.display = "none";
    }

    if (feature) {
        return (
            <div id="feature-background" onClick={hideFeature}>
                <div id="feature" data-ng-click="$event.stopPropagation()">
                    <div className="clickable" onClick={hideFeature}>close</div>
                    <div>Sent: {prettyDate(feature.sent)}</div>
                    <div>From: {feature.from}</div>
                    <div>To: {feature.to}</div>
                    <div>Subject: {feature.subject}</div>
                    {feature.body_html ? preify(feature.body) : bodyify(feature.body)}
                </div>
            </div>
        );
    } else {
        return (<></>)
    }
};

export default Feature;