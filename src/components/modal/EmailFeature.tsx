import { Artifact } from "../../models";
import { bodyify, preify, prettyDate } from "../../utils/Utils";

const EmailFeature = (props: { artifact: Artifact }) => {

    const { artifact } = props;

    return (
        <div
            style={
                {
                    textAlign: "left",
                    fontSize: "0.8em",
                    maxHeight: "500px",
                    overflowY: "scroll"
                }
            }
        >
            <div>Sent: {prettyDate(artifact.data.email.sent)}</div>
            <div>From: {artifact.data.email.from}</div>
            <div>To: {artifact.data.email.to}</div>
            <div>Subject: {artifact.data.email.subject}</div>
            {artifact.data.email.body_html ? preify(artifact.data.email.body) : bodyify(artifact.data.email.body)}
        </div>
    )
}

export default EmailFeature;
