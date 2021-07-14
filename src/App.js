import { Suspense } from "react";
import { Helmet } from "react-helmet";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Loader from "./shared/Loader";
import PublicRoute from "./shared/PublicRoute";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Examination Demo</title>
      </Helmet>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {PublicRoute.data.map((val, index) => (
              <Route
                key={index}
                path={val.path}
                component={val.component}
                exact={val.exact}
              ></Route>
            ))}
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
