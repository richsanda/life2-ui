import React, { FunctionComponent, useState, useEffect, useContext } from "react";
import "./styles/styles.css";
import { Route, Switch, useHistory } from "react-router-dom";
import { Home } from "./pages";
import ArtifactCountsContext from "./contexts/ArtifactContext";
import ErrorBoundary from "./ErrorBoundary";
import CorrespondenceAPI from "./hooks/correspondenceApi";

const App: FunctionComponent<{}> = () => {

  useEffect(() => {
    let token = CorrespondenceAPI.getAuthorizationToken();
    sessionStorage.setItem("token", token);
  }, []);

  const [defaultValue] = useContext(ArtifactCountsContext);
  const artifactCountsRequest = useState(defaultValue);

  return (

    <ErrorBoundary>
      <ArtifactCountsContext.Provider value={artifactCountsRequest}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </ArtifactCountsContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
