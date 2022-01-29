import React, { useContext, useState } from "react";
import ArtifactAPI from "../../hooks/artifactApi";
import ArtifactContext from "../../contexts/ArtifactContext";
import { rangeOfYearMonthsWithCounts } from "../../utils/Utils";

const SearchPanel = () => {

    const [artifactsContext, setArtifactsContext] = useContext(ArtifactContext);
    const { countsRequest, searchRequest, from, to } = artifactsContext;

    const [username, setUsername] = useState("rich");
    const [password, setPassword] = useState("yahdude4747");

    const updateToken = () => {
        sessionStorage.setItem("token", Buffer.from(`${username}:${password}`).toString('base64'));
    }

    const updateFrom = (from: string) => {
        setArtifactsContext({
            ...artifactsContext,
            "from": from.trim().length == 0 ? [] : from.split(/[ ,]+/)
        })
    }

    const updateTo = (to: string) => {
        setArtifactsContext({
            ...artifactsContext,
            "to": to.trim().length == 0 ? [] : to.split(/[ ,]+/)
        })
    }

    const counts = async () => {
        updateToken();

        if (true) {
            ArtifactAPI.artifactCounts({ ...countsRequest, "from": from, "to": to })
                .then((response) => {
                    let [results, maxBoxCount] = rangeOfYearMonthsWithCounts(1990, 2021, response)
                    setArtifactsContext({
                        ...artifactsContext,
                        "countsResponse": results,
                        "maxBoxCount": maxBoxCount
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
        if (code === 13) { //13 is the enter keycode
            counts();
        }
    }

    return (
        <p className="input" onKeyPress={onKeyPress}>

            <button onClick={counts}><i>go !</i></button>

    &nbsp;&nbsp;&nbsp;&nbsp;
            {/* from: <input type="text" onChange={({ target }) => { updateFrom(target.value) }} />
    to: <input type="text" onChange={({ target }) => { updateTo(target.value) }} /> */}

        </p>
    );
};

export default SearchPanel;