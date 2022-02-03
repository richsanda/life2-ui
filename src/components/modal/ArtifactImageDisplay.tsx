import Magnifier from "react-magnifier";
import { Artifact } from "../../models";

const ArtifactImageDisplay = (props: { artifact: Artifact }) => {

    return (
        <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
            <Magnifier
                mgShape="square"
                mgWidth={1000}
                mgHeight={1000}
                zoomFactor={0.15}
                src={props.artifact.image} /> :
        </div>
    )
}

export default ArtifactImageDisplay;