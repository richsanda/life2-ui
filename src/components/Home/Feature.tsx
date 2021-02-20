import React from "react";

const Feature = () => {
    return (
        <div id="feature-background" data-ng-click="hideFeature()">
        {/* <div id="feature" data-ng-click="$event.stopPropagation()">
            <div class="clickable" data-ng-click="hideFeature()">close</div>
            <div>Sent: {{ prettyDateify(feature.sent) }}</div>
            <div>From: {{ feature.from }}</div>
            <div>To: {{ feature.to }}</div>
            <div>Subject: {{ feature.subject }}</div>
            <div ng-bind-html="feature.body_html ? preify(feature.body) : bodyify(feature.body)"></div>
        </div> */}
    </div>
    );
};

export default Feature;