import React, { useContext, useEffect, useState } from "react";
import ArtifactAPI from "../../hooks/artifactApi";
import ArtifactContext from "../../contexts/ArtifactContext";
import { rangeOfYearMonthsWithCounts } from "../../utils/Utils";
import { Button } from "react-bootstrap";
import { Mention, MentionsInput } from 'react-mentions';
import defaultStyle from '../Neat/defaultStyle'
import defaultMentionStyle from '../Neat/defaultMentionStyle'
import { Person, Trove } from "../../models";

const SearchPanel = () => {

    const [artifactsContext, setArtifactsContext] = useContext(ArtifactContext);
    const { countsRequest, searchRequest, from, to } = artifactsContext;

    const [username, setUsername] = useState("rich");
    const [password, setPassword] = useState("yahdude4747");

    const [value, setValue] = useState('');
    const [personOptions, setPersonOptions] = useState<Person[]>([])
    const [troveOptions, setTroveOptions] = useState<Trove[]>([])

    const updateToken = () => {
        sessionStorage.setItem("token", Buffer.from(`${username}:${password}`).toString('base64'));
    }

    const updateFrom = (from: string) => {
        setArtifactsContext({
            ...artifactsContext,
            "from": from.trim().length == 0 ? [] : from.split(/[ ,]+/)
        })
    }

    const searchPersons = () => {
        ArtifactAPI.persons().then((response) => {
            setPersonOptions(response);
        })
    }

    const searchTroves = () => {
        ArtifactAPI.troves().then((response) => {
            setTroveOptions(response);
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

        ArtifactAPI.artifactCounts({ ...countsRequest, "from": from, "to": to })
            .then((response) => {
                let [results, maxBoxCount] = rangeOfYearMonthsWithCounts(1990, 2021, response)
                
                setArtifactsContext({
                    ...artifactsContext,
                    "countsResponse": results,
                    "maxBoxCount": maxBoxCount
                });
            })
            .catch((e) => {
                alert("error: " + e);
            });
    };

    useEffect(() => {
        updateToken();
        searchPersons();
        searchTroves();
    }, []);

    return (
        <>
            <MentionsInput
                value={value}
                onChange={(e, val) => { setValue(val); }}
                style={defaultStyle}
                placeholder={"Mention people using '@'"}
                a11ySuggestionsListLabel={"Suggested mentions"}
            >
                <Mention
                    markup="@[__display__](user:__id__)"
                    trigger="@"
                    data={personOptions.map((p) => { return { id: p.name, display: p.name } })}
                    renderSuggestion={(
                        suggestion,
                        search,
                        highlightedDisplay,
                        index,
                        focused
                    ) => (
                        <div className={`user ${focused ? 'focused' : ''}`}>
                            {highlightedDisplay}
                        </div>
                    )}
                    onAdd={() => console.log("added person")}
                    style={defaultMentionStyle}
                />

                <Mention
                    markup="@[__display__](field:__id__)"
                    trigger="$"
                    data={troveOptions.map((t) => { return { id: t.name, display: t.name } })}
                    renderSuggestion={(
                        suggestion,
                        search,
                        highlightedDisplay,
                        index,
                        focused
                    ) => (
                        <div
                            className={`user ${focused ? 'focused' : ''}`}
                        >
                            {highlightedDisplay}
                        </div>
                    )}
                    onAdd={() => console.log("added trove")}
                    style={{ backgroundColor: '#ebc8d0' }} />
            </MentionsInput>
            <Button variant="primary" onClick={counts}>go</Button>

        </>
    );
};

export default SearchPanel;