import React, { useContext, useState } from "react";
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
                                            <Magnifier
                                                mgShape="circle"
                                                mgWidth={200}
                                                mgHeight={200}
                                                zoomFactor={1.1}
                                                src={artifact.image} />
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

const ResultRow = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [artifactsContext, setArtifactsContext] = useContext(ArtifactContext);

    const { artifact, index } = props;

    const [artifactData, setArtfactData] = useState({});
    const [commentary, setCommetary] = useState('');
    const [relativeKeys, setRelativeKeys] = useState<string[]>([]);
    const [relativeKeyIndex, setRelativeKeyIndex] = useState(0);

    const resultRowClick = async () => {

        const key = artifact.key.split("/");

        ArtifactAPI.artifactRead(key[0], key[1])
            .then((response) => {
                setArtifactsContext({
                    ...artifactsContext,
                    "artifact": response
                });
                console.log("index: " + relativeKeyIndex);
                setArtfactData(response);
                setCommetary(response.description);
                setRelativeKeys(response.relative_keys);
                setRelativeKeyIndex(response.relative_key_index);

                handleShow();
            })
            .catch(() => {
                alert("error retrieving artifact with id: " + key);
            });
    };

    const handleSelect = (index) => {

        const key = relativeKeys[index].split("/");

        ArtifactAPI.artifactRead(key[0], key[1])
            .then((response) => {
                setArtifactsContext({
                    ...artifactsContext,
                    "artifact": response
                });
                setArtfactData(response);
                setCommetary(response.description);
                setRelativeKeyIndex(index);
            })
            .catch(() => {
                alert("error retrieving artifact with id: " + key);
            });
    };

    return (
        <>
            <div className="artifact-link" key={`artifact${index}`}>
                <div onClick={resultRowClick}>
                    <div className="artifact-link-col">
                        {`${index + 1}. ${prettyDate(artifact.when)} -- ${artifact.title} -- ${artifact.trove}`}
                    </div>
                </div>
            </div>
            <ArtifactModal
                show={show}
                commentary={commentary}
                relativeKeys={relativeKeys}
                relativeKeyIndex={relativeKeyIndex}
                handleSelect={handleSelect}
                handleChange={(e, val) => setCommetary(val)}
                handleClose={handleClose}
                artifact={artifactData} />
        </>
    )
}

export default ResultRow;