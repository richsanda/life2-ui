import React, { FunctionComponent, useState, useEffect, useContext } from "react";
import "./styles/styles.css";
import "./styles/neat.css";
import { Route, Switch, useHistory } from "react-router-dom";
import ArtifactContext from "./contexts/ArtifactContext";
import NeatContext from "./contexts/NeatContext";
import ErrorBoundary from "./ErrorBoundary";
import ArtifactAPI from "./hooks/artifactApi";
import Neat from "./pages/Neat";
import Life2 from "./pages/Life2";

const App: FunctionComponent<{}> = () => {

  const [artifactContext] = useContext(ArtifactContext);
  const artifactContextState = useState(artifactContext);

  const [neatContext] = useContext(NeatContext);
  const neatContextState = useState(neatContext);

  return (

    <ErrorBoundary>
      <NeatContext.Provider value={neatContextState}>
        <ArtifactContext.Provider value={artifactContextState}>
          <Switch>
            <Route exact path="/life2" component={Life2} />
            <Route exact path="/neat" component={Neat} />
          </Switch>
        </ArtifactContext.Provider>
      </NeatContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
