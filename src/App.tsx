import React, { FunctionComponent, useState, useEffect, useContext } from "react";
import "./styles/styles.css";
import "./styles/neat.css";
import { Route, Switch, useHistory } from "react-router-dom";
import { Home } from "./pages";
import ArtifactContext from "./contexts/ArtifactContext";
import NeatContext from "./contexts/NeatContext";
import ErrorBoundary from "./ErrorBoundary";
import CorrespondenceAPI from "./hooks/correspondenceApi";
import Neat from "./pages/Neat";
import Life2 from "./pages/Life2";

const App: FunctionComponent<{}> = () => {

  useEffect(() => {
    let token = CorrespondenceAPI.getAuthorizationToken();
    sessionStorage.setItem("token", token);
  }, []);

  const [artifactContext] = useContext(ArtifactContext);
  const artifactContextState = useState(artifactContext);

  const [neatContext] = useContext(NeatContext);
  const neatContextState = useState(neatContext);

  return (

    <ErrorBoundary>
      <NeatContext.Provider value={neatContextState}>

        <ArtifactContext.Provider value={artifactContextState}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/life2" component={Life2} />
            <Route exact path="/neat" component={Neat} />
          </Switch>
        </ArtifactContext.Provider>
      </NeatContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
