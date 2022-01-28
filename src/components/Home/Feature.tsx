import React, { useContext, useState } from "react";
import ArtifactContext from "../../contexts/ArtifactContext";
import { prettyDate, bodyify, preify } from "../../utils/Utils";

const Feature = () => {

    const [show, setShow] = useState(false);

    const [artifactContext] = useContext(ArtifactContext);
    const { readResponse: response } = artifactContext;
    const { email : feature } = response || {};

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
    } else if (response) {
        return (
            <div id="feature-background" onClick={hideFeature}>
            <div id="feature" data-ng-click="$event.stopPropagation()">
                <div className="clickable" onClick={hideFeature}>close</div>
                <div>Sent: {prettyDate(response.when)}</div>
                <div>
                <img style={{width: "80%"}} src={response.image}/>
                </div>
            </div>
        </div>
        )
    } else {
        return (<></>)
    }
};

export default Feature;