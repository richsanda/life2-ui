import { prettyDate, bodyify, preify } from "../../utils/Utils";
import { Button, Carousel, Modal } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../../styles/styles.css';
import '../../styles/magnifier.less';
import 'bootstrap/dist/css/bootstrap.min.css';
import NeatTextbox from "../Neat/NeatTextBox";
import Magnifier from "react-magnifier";
import { Artifact } from "../../models";

const ArtifactDisplay = (props: { artifact: Artifact }) => {

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

const ArtifactImageCarousel = (props) => {

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
                        <ArtifactDisplay artifact={artifact} />
                    </Carousel.Item>
                )
            })}
        </Carousel>
    )
}

const ArtifactModal = (props) => {

    const {
        show,
        artifact,
        commentary,
        relativeKeys,
        relativeKeyIndex,
        handleSelect,
        handleChange,
        handleClose } = props;

    //https://dev.to/anxiny/create-an-image-magnifier-with-react-3fd7

    return (
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    {prettyDate(artifact.when)} -- {artifact.title}
                </Modal.Title>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Header>
            <Modal.Body>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="8">
                            {   
                                 (!!!artifact.types) ? (<></>) :

                                 (artifact.types.indexOf("email") > -1) ? (

                                <div 
                                style={
                                    {textAlign: "left", 
                                    fontSize: "0.8em",
                                    maxHeight: "500px", 
                                    overflowY: "scroll"}
                                } 
                                    >
                                    <div>Sent: {prettyDate(artifact.data.email.sent)}</div>
                                    <div>From: {artifact.data.email.from}</div>
                                    <div>To: {artifact.data.email.to}</div>
                                    <div>Subject: {artifact.data.email.subject}</div>
                                    {artifact.data.email.body_html ? preify(artifact.data.email.body) : bodyify(artifact.data.email.body)}
                                </div>

                                ) : (artifact.types.indexOf("note") > -1) ?
                                
                                (<ArtifactImageCarousel
                                    artifact={artifact}
                                    relativeKeys={relativeKeys}
                                    relativeKeyIndex={relativeKeyIndex}
                                    handleSelect={handleSelect}
                                />
                                ) : <></>
                            }
                        </MDBCol>
                        <MDBCol md="4">
                            <NeatTextbox value={commentary} onChange={handleChange} />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </Modal.Body>
        </Modal >
    )
}

export default ArtifactModal;