import { useContext } from "react";
import NeatContext from "../../contexts/NeatContext";
import NeatItem from "./NeatItem"

const ListPane = (props) => {

    const { setSelectedIndex } = props;

    const [neatContext] = useContext(NeatContext);
    const { notes } = neatContext;

    return (
        <div className="leftpane">
            {notes.map((note, index) => {
                return (
                    <NeatItem setSelectedIndex={setSelectedIndex} note={note} index={index} />
                )
            })}
        </div>
    )
}

export default ListPane;