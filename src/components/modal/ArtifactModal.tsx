import { prettyDate } from "../../utils/Utils";
import { Button, Modal } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../../styles/styles.css';
import '../../styles/magnifier.less';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArtifactImageFeature from "./ArtifactImageFeature";
import EmailFeature from "./EmailFeature";
import CommentaryBox from "../commentary/CommentaryBox";

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
                                (!!!artifact.types) ? (

                                    <></>

                                ) : (artifact.types.indexOf("email") > -1) ? (

                                    <EmailFeature artifact={artifact} />

                                ) : (artifact.types.indexOf("note") > -1) ?

                                    (<ArtifactImageFeature
                                        artifact={artifact}
                                        relativeKeys={relativeKeys}
                                        relativeKeyIndex={relativeKeyIndex}
                                        handleSelect={handleSelect}
                                    />

                                    ) :

                                    <></>
                            }
                        </MDBCol>
                        <MDBCol md="4">
                        <CommentaryBox
                            value={commentary}
                            onChange={handleChange}
                            onAdd={() => {}}
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </Modal.Body>
        </Modal >
    )
}

export default ArtifactModal;