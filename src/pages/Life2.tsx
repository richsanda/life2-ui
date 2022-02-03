import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../styles/life2.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CountGrid from "../components/Life2/CountGrid";
import SearchPanel from "../components/Life2/SearchPanel";
import SearchResults from "../components/Life2/SearchResults";
import { updateToken } from "../utils/Utils";

const Life2 = () => {

    updateToken();

    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <MDBRow>
                        <MDBCol md="12">
                            <SearchPanel/>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <CountGrid/>
                        </MDBCol>
                        <MDBCol md="6">timeline</MDBCol>
                    </MDBRow>
                </MDBCol>
                <MDBCol md="6">
                    <MDBRow>
                        <MDBCol md="12" className="scrollable">
                            <SearchResults/>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Life2;