import React, { FunctionComponent, useState, useEffect, useContext } from "react";
import "./styles/styles.css";
import { Route, Switch, useHistory } from "react-router-dom";
import { Home } from "./pages";
import CorrespondenceSearchContext from "./contexts/ArtifactCountsContext";
import ErrorBoundary from "./ErrorBoundary";

const App: FunctionComponent<{}> = () => {

  const [defaultCorrespondenceSearch] = useContext(CorrespondenceSearchContext);
  const correspondenceSearch = useState(defaultCorrespondenceSearch);

  return (

    <ErrorBoundary>
      <CorrespondenceSearchContext.Provider value={correspondenceSearch}>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </CorrespondenceSearchContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
