import FeaturePane from "./FeaturePane";
import FolderPane from "./FolderPane";
import ListPane from "./ListPane";
import { Tabs, Tab, TabPanel, TabList } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import CommentaryPane from "./CommentaryPane";

const Results = () => {

    const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <Tabs
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}>
            <TabList>
                <Tab>
                    folders
                </Tab>
                <Tab>
                    items
                </Tab>
                <Tab>
                    feature
                </Tab>
            </TabList>
            <TabPanel>
                <FolderPane setSelectedIndex={setSelectedIndex} />
            </TabPanel>
            <TabPanel>
                <ListPane setSelectedIndex={setSelectedIndex} />
            </TabPanel>
            <TabPanel>
                <div className="feature-container">
                    <FeaturePane />
                    <CommentaryPane />
                </div>
            </TabPanel>
        </Tabs>
    )
}

export default Results