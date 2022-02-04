import Magnifier from "react-magnifier";
import { Artifact } from "../../models";

const ArtifactImageDisplay = (props: { artifact: Artifact }) => {

    return (
        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
            <Magnifier
                mgShape="circle"
                mgWidth={400}
                mgHeight={400}
                zoomFactor={0.4}
                src={props.artifact.image} /> :
        </div>
    )
}

export default ArtifactImageDisplay;