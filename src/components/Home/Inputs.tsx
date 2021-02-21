import React, { useContext, useState } from "react";
import CorrespondenceApi  from "../../hooks/correspondenceApi";
import ArtifactContext from "../../contexts/ArtifactContext";

const Inputs = () => {

    const [artifactsContext, setArtifactsContext] = useContext(ArtifactContext);
    const { countsRequest } = artifactsContext;

    const [token, setToken] = useState("");

    const counts = async () => {
        if (true) {
          alert(countsRequest.after)
          CorrespondenceApi.artifactCounts(countsRequest)
            .then((response) => {
              alert("success");
            })
            .catch(() => {
              alert("error");
            });
        } else {
        }
      };

    return (
        <p className="input">

            TOKEN: <input type="password" onChange={({ target }) => setToken(target.value)}></input>
            <button onClick={counts}><i>go !</i></button>

    &nbsp;&nbsp;&nbsp;&nbsp;from: <input type="text" data-ng-model="from" ng-keypress="enter($event)" />
    to: <input type="text" data-ng-model="to" ng-keypress="enter($event)" />


        </p>
    );
};

export default Inputs;