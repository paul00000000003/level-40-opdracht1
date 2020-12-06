import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Scores from "./Scores";
import Home from "../home/Home";
import WeergavePerStudent from "../weergavePerStudent/WeergavePerStudent";
import WeergavePerOpdracht from "../opdrachtenWeergave/WeergavePerOpdracht";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { scores: [], schermGeladen: false };
  }

  componentDidMount() {
    this.setState({ scores: Scores, schermGeladen: true });
  }

  render() {
    if (this.state.schermGeladen) {
      return (
        <Router>
          <nav>
            <ul className="scoremogelijkheden">
              <li className="li-nav">
                {" "}
                <Link className="link nav-link" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="li-nav">
                {" "}
                <Link className="link" to={"./weergavePerStudent"}>
                  Weergave per student
                </Link>
              </li>
              <li className="li-nav">
                {" "}
                <Link className="link" to={"./weergavePerOpdracht"}>
                  {" "}
                  Weergave per opdracht{" "}
                </Link>
              </li>
            </ul>
          </nav>
          <hr />
          <Switch>
            <Route exact path="/">
              <Home scores={this.state.scores} />
            </Route>
            <Route path="/weergavePerStudent">
              <WeergavePerStudent scores={this.state.scores} />
            </Route>
            <Route path="/weergavePerOpdracht">
              <WeergavePerOpdracht scores={this.state.scores} />
            </Route>
          </Switch>
        </Router>
      );
    } else return <h1>Moment geduld. Gegevens worden geladen</h1>;
  }
}

export default App;
