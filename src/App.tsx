import React, { FunctionComponent, useState, useContext } from "react";
import "./styles/styles.css";
import "./styles/neat.css";
import { Route, Switch } from "react-router-dom";
import ArtifactContext from "./contexts/ArtifactContext";
import ErrorBoundary from "./ErrorBoundary";
import Life2 from "./pages/Life2";

const App: FunctionComponent<{}> = () => {

  const [artifactContext] = useContext(ArtifactContext);
  const artifactContextState = useState(artifactContext);

  return (

    <ErrorBoundary>
        <ArtifactContext.Provider value={artifactContextState}>
          <Switch>
            <Route exact path="/life2" component={Life2} />
          </Switch>
        </ArtifactContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
