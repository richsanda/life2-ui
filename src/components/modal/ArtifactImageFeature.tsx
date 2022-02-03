import { Carousel } from "react-bootstrap";
import { Artifact } from "../../models";
import ArtifactImageDisplay from "./ArtifactImageDisplay";

const ArtifactImageFeature = (props : {
    artifact : Artifact,
    relativeKeys : string[],
    relativeKeyIndex : number,
    handleSelect
}) => {

    const { artifact, relativeKeys, relativeKeyIndex, handleSelect } = props;

    return (
        <Carousel
            activeIndex={relativeKeyIndex}
            interval={null}
            wrap={false}
            onSelect={handleSelect}>
            {relativeKeys.map((key, index) => {
                return (
                    <Carousel.Item>
                        <ArtifactImageDisplay artifact={artifact} />
                    </Carousel.Item>
                )
            })}
        </Carousel>
    )
}

export default ArtifactImageFeature;