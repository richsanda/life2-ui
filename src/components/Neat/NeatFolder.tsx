import React, { useContext } from "react";
import NeatContext from "../../contexts/NeatContext";
import ArtifactAPI from "../../hooks/artifactApi";
import { NoteBox } from "../../models";
import { initNoteBox } from "../../utils/NeatUtils";

const NeatFolder = (props) => {
    
    const { folder, index, setSelectedIndex } = props;

    const [neatContext, setNeatContext] = useContext(NeatContext);
    const { folder : neatFolder, noteBoxes, notes } = neatContext;

    const loadFolder = () => {

        loadNoteBox();
        setSelectedIndex(1);
    }

    const syncNoteBoxContext = (folder: string, noteBox: NoteBox) => {
        setNeatContext({
            ...neatContext,
            folder: folder,
            noteBox: noteBox,
            notes: noteBox.notes,
            file: null as any,
        })
    }

    const loadNoteBox = () => {
        if (!noteBoxes[folder]) {
            ArtifactAPI.readNeatFolder(folder)
                .then((response) => {
                    noteBoxes[folder] = initNoteBox(folder, response);
                    syncNoteBoxContext(folder, noteBoxes[folder]);
                }).catch(() => {
                    alert("error");
                });
        } else {
            syncNoteBoxContext(folder, noteBoxes[folder]);
        }
    }
    
    return(
        <div             
        
        key={`neat-folder-${index}`}

        className={`neat-folder ${folder == neatFolder ? 'selected' : ''}`} 
        onClick={loadFolder}>{folder.split("-").join(" ")}</div>     
    )
}

export default NeatFolder;