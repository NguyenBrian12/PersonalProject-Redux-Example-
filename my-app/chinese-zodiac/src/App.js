import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import ChineseZodiacsContainer from "./chineseZodiacs/chineseZodiacsContainer";
import ChineseZodiacsResults from "./chineseZodiacs/chineseZodiacsResults";
class App extends React.Component {
  //npm run dev
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path={"/"} component={ChineseZodiacsContainer} />
          <Route
            exact
            path={"/:id(\\d+)"}
            component={ChineseZodiacsContainer}
          />
          <Route exact path={"/results"} component={ChineseZodiacsResults} />
        </React.Fragment>
      </Router>
    );
  }
}
export default App;
