import React from "react";

const Results = () => {
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
    </div>
    );
};

export default Results;