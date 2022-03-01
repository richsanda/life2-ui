import { FunctionComponent } from "react";
import "./styles/styles.css";
import { Route, Switch } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Life2 from "./pages/Life2";

const App: FunctionComponent<{}> = () => {

  return (

    <ErrorBoundary>
      <Switch>
        <Route exact path="/life2" component={Life2} />
      </Switch>
    </ErrorBoundary>
  );
};

export default App;
