import NeatFolder from "./NeatFolder";
import NeatContext from "../../contexts/NeatContext";
import { useContext } from "react";

const FolderPane = (props) => {

    const { setSelectedIndex } = props;

    const [neatContext] = useContext(NeatContext);
    const { folders } = neatContext;

    return (
        <div className="leftpane">
            {folders.map((folder, index) => {
                return (
                    <NeatFolder setSelectedIndex={setSelectedIndex} folder={folder} index={index} />
                )
            })}
        </div>
    )
}

export default FolderPane;