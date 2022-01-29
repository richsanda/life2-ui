
import { useState } from "react";
import ArtifactAPI from "../../hooks/artifactApi";
import { Person } from "../../models";
import CommentaryBox from "./CommentaryBox";

const NeatTextbox = ({value, onChange}: {value: string, onChange: any}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<Person[]>([]);

    const handleSearch = () => {
        setIsLoading(true);
        ArtifactAPI.persons().then((response) => {
            setOptions(response);
            setIsLoading(false);
        })
    }

    const onAdd = (...args) => console.log('added a new mention', ...args);

    return (
        <CommentaryBox 
        value={value}
        data={options.map((p) => { return { id: p.name, display: p.name } })} 
        onChange={(e, v) => { handleSearch(); onChange(e, v); }}
        onAdd={onAdd} />
    );
};

export default NeatTextbox;