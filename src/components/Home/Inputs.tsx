import React, { useContext, useState } from "react";
import CorrespondenceApi  from "../../hooks/correspondenceApi";
import ArtifactContext from "../../contexts/ArtifactContext";
import { rangeOfYearMonthsWithCounts } from "../../utils/Utils";

const Inputs = () => {

    const [artifactsContext, setArtifactsContext] = useContext(ArtifactContext);
    const { countsRequest, countsResponse } = artifactsContext;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const updateToken = () => {
        sessionStorage.setItem("token", Buffer.from(`${username}:${password}`).toString('base64'));
    }

    const counts = async () => {
        updateToken();
        if (true) {
          CorrespondenceApi.artifactCounts(countsRequest)
            .then((response) => {
                let [response2, maxBoxCount] = rangeOfYearMonthsWithCounts(1994, 2021, response)
                setArtifactsContext({
                    ...artifactsContext, 
                    "countsResponse" : response2,
                    "maxBoxCount" : maxBoxCount
                });
            })
            .catch(() => {
              alert("error");
            });
        } else {
        }
      };

    return (
        <p className="input">

            username: <input type="text" onChange={({ target }) => { setUsername(target.value)}}></input>
            password: <input type="password" onChange={({ target }) => { setPassword(target.value)}}></input>
            <button onClick={counts}><i>go !</i></button>

    &nbsp;&nbsp;&nbsp;&nbsp;from: <input type="text" data-ng-model="from" ng-keypress="enter($event)" />
    to: <input type="text" data-ng-model="to" ng-keypress="enter($event)" />


        </p>
    );
};

export default Inputs;