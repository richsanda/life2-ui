import React, { useContext, useState } from "react";
import CorrespondenceApi  from "../../hooks/correspondenceApi";
import ArtifactContext from "../../contexts/ArtifactContext";
import { rangeOfYearMonthsWithCounts } from "../../utils/Utils";

const Inputs = () => {

    const [artifactsContext, setArtifactsContext] = useContext(ArtifactContext);
    const { countsRequest, searchRequest, from, to } = artifactsContext;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const updateToken = () => {
        sessionStorage.setItem("token", Buffer.from(`${username}:${password}`).toString('base64'));
    }

    const updateFrom = (from: string) => {
        setArtifactsContext({
            ...artifactsContext, 
            "from" : from.trim().length == 0 ? [] : from.split(/[ ,]+/)
        })
    }

    const updateTo = (to: string) => {
        setArtifactsContext({
            ...artifactsContext, 
            "to" : to.trim().length == 0 ? [] : to.split(/[ ,]+/)
        })
    }

    const counts = async () => {
        updateToken();

        if (true) {
          CorrespondenceApi.artifactCounts({...countsRequest, "from": from, "to": to})
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

      function onKeyPress(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            counts();
        } 
    }

    return (
        <p className="input" onKeyPress={onKeyPress}>

            username: <input type="text" onChange={({ target }) => { setUsername(target.value) }}></input>
            password: <input type="password" onChange={({ target }) => { setPassword(target.value) }}></input>
            <button onClick={counts}><i>go !</i></button>

    &nbsp;&nbsp;&nbsp;&nbsp;
    from: <input type="text" onChange={({ target }) => { updateFrom(target.value) }} />
    to: <input type="text" onChange={({ target }) => { updateTo(target.value) }} />

        </p>
    );
};

export default Inputs;