import { prettyDate } from "../../utils/Utils";
import ArtifactAPI from "../../hooks/artifactApi";
import ArtifactContext from "../../contexts/ArtifactContext";
import { Button, Carousel, Modal } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../../styles/styles.css';
import '../../styles/magnifier.less';
import 'bootstrap/dist/css/bootstrap.min.css';
import NeatTextbox from "../Neat/NeatTextBox";
import Magnifier from "react-magnifier";
import { Artifact } from "../../models";
import { useEffect, useRef, useState } from "react";

const ArtifactDisplay = (props: { artifact: Artifact }) => {

    return (
        <div style={{ minHeight: "100vh" }}>
            <Magnifier
                mgShape="circle"
                mgWidth={200}
                mgHeight={200}
                zoomFactor={1.1}
                src={props.artifact.image} /> :     
        </div>
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