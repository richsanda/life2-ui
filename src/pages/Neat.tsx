import { useContext, useState } from "react";
import Results from "../components/Neat/Results";
import NeatContext from "../contexts/NeatContext";
import ArtifactAPI from "../hooks/artifactApi";

const Neat = () => {

    const [neatContext, setNeatContext] = useContext(NeatContext);

    const [username, setUsername] = useState("rich");
    const [password, setPassword] = useState("yahdude4747");

    const updateToken = () => {
        sessionStorage.setItem("token", Buffer.from(`${username}:${password}`).toString('base64'));
    }

    const listFolders = async () => {

        updateToken();

        ArtifactAPI.listNeatFolders()
            .then((response) => {
                setNeatContext({ ...neatContext, "folders": response })
            }).catch(() => {
                alert("error");
            });
    }

    return (
        <>
        <div onClick={listFolders}>go</div>
        <Results />
        </>
    );
};

export default Neat;
