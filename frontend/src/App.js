import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Page2 from "./pages/Page2";
import IndexPage from "./pages/IndexPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Index</Link>
                </li>
                <li>
                  <Link to="/page-2">Page 2</Link>
                </li>
              </ul>
            </nav>
            <Route path="/" exact component={IndexPage} />
            <Route path="/page-2" component={Page2} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
