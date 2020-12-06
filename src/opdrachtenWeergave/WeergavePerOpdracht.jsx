import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OpdrachtPerLinkRegel from "./OpdrachtPerLinkRegel";
import "./weergavePerOpdracht.css";
import MaakHistogram from "./MaakHistogram";
import MaakLineChart from "./MaakLineChart";

let opdrachten = [];
let studenten = [];
let outputselectie = [];
let data = [];

const sorteerStudenten = (studenten) =>
  studenten.sort(function (a, b) {
    let student1 = a;
    let student2 = b;
    if (student1 < student2) {
      return -1;
    }
    if (student1 > student2) {
      return 1;
    }
    return 0;
  });

const make_lineChart_data = (opdr, scores) => {
  let gekozenOpdrachten = opdr;
  let moeilijkGradesOpdr1 = [];
  let moeilijkGradesOpdr2 = [];
  let moeilijkGradesOpdr3 = [];
  let moeilijkGradesOpdr4 = [];
  let moeilijkGradesOpdr5 = [];
  let moeilijkGradesOpdr6 = [];
  let leukGradesOpdr1 = [];
  let leukGradesOpdr2 = [];
  let leukGradesOpdr3 = [];
  let leukGradesOpdr4 = [];
  let leukGradesOpdr5 = [];
  let leukGradesOpdr6 = [];

  scores.forEach((element) => {
    let spotOpdracht = gekozenOpdrachten.indexOf(element.opdracht);
    if (spotOpdracht > -1 && spotOpdracht < 6) {
      let spotstudent = studenten.indexOf(element.student);
      switch (spotOpdracht) {
        case 0:
          moeilijkGradesOpdr1[spotstudent] = element.moeilijkGrade;
          leukGradesOpdr1[spotstudent] = element.leukGrade;
          break;
        case 1:
          moeilijkGradesOpdr2[spotstudent] = element.moeilijkGrade;
          leukGradesOpdr2[spotstudent] = element.leukGrade;
          break;
        case 2:
          moeilijkGradesOpdr3[spotstudent] = element.moeilijkGrade;
          leukGradesOpdr3[spotstudent] = element.leukGrade;
          break;
        case 3:
          moeilijkGradesOpdr4[spotstudent] = element.moeilijkGrade;
          leukGradesOpdr4[spotstudent] = element.leukGrade;
          break;
        case 4:
          moeilijkGradesOpdr5[spotstudent] = element.moeilijkGrade;
          leukGradesOpdr5[spotstudent] = element.leukGrade;
          break;
        case 5:
          moeilijkGradesOpdr6[spotstudent] = element.moeilijkGrade;
          leukGradesOpdr6[spotstudent] = element.leukGrade;
          break;
        default:
          console.log("Geen waarde mogelijk voor " + spotOpdracht);
      }
    }
  });

  let dataLineChart = [];
  sorteerStudenten(studenten);
  studenten.forEach((element, index) => {
    dataLineChart.push({
      student: element,
      cijfer1Moeilijk: moeilijkGradesOpdr1[index],
      cijfer2Moeilijk: moeilijkGradesOpdr2[index],
      cijfer3Moeilijk: moeilijkGradesOpdr3[index],
      cijfer4Moeilijk: moeilijkGradesOpdr4[index],
      cijfer5Moeilijk: moeilijkGradesOpdr5[index],
      cijfer6Moeilijk: moeilijkGradesOpdr6[index],
      cijfer1Leuk: leukGradesOpdr1[index],
      cijfer2Leuk: leukGradesOpdr2[index],
      cijfer3Leuk: leukGradesOpdr3[index],
      cijfer4Leuk: leukGradesOpdr4[index],
      cijfer5Leuk: leukGradesOpdr5[index],
      cijfer6Leuk: leukGradesOpdr6[index],
    });
  });

  return dataLineChart;
};

const maakLijstOpdrachten = (scores) => {
  scores.forEach((element) => {
    if (!opdrachten.includes(element.opdracht))
      opdrachten.push(element.opdracht);
    if (!studenten.includes(element.student)) studenten.push(element.student);
  });
  return [opdrachten, studenten];
};

class WeergavePerOpdracht extends React.Component {
  constructor() {
    super();
    this.state = {
      gekozenOpdrachten: [],
      studenten: [],
      dataLineChart: [],
      opdrachten: [],
      scoreKeuze: "",
      scores: [],
      makeLineChart: false,
      makeHistogram: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.scoreKeuzeHandle = this.scoreKeuzeHandle.bind(this);
    this.make_linechart = this.make_linechart.bind(this);
    this.make_histogram = this.make_histogram.bind(this);
  }

  handleChange(index, vinkje) {
    let gekozenOpdrachten = this.state.gekozenOpdrachten;

    if (vinkje.checked === true) {
      if (gekozenOpdrachten.length === 6) {
        alert("Er kunnen slechts 6 opdrachten worden gekozen");
        vinkje.checked = false;
      } else {
        if (
          this.state.scoreKeuze === "Beide" &&
          gekozenOpdrachten.length === 1
        ) {
          vinkje.checked = false;
          alert(
            "Bij twee of meer opdrachten kun je voor de scorekeuze alleen moeilijk of leuk kiezen"
          );
        } else gekozenOpdrachten.push(this.state.opdrachten[index]);
      }
    } else {
      let index2 = -1;

      gekozenOpdrachten.forEach((element, index3) => {
        if (element === this.state.opdrachten[index]) index2 = index3;
      });
      if (index2 !== -1) gekozenOpdrachten.splice(index2, 1);
    }

    outputselectie = Array.from(document.getElementsByClassName("outputoptie"));
    outputselectie.forEach((element) => (element.checked = false));
    if (gekozenOpdrachten.length === 0)
      this.setState({
        gekozenOpdrachten: gekozenOpdrachten,
        makeLineChart: false,
        dataLineChart: [],
      });
    else {
      if (this.state.makeLineChart === true) {
        data = make_lineChart_data(gekozenOpdrachten, this.props.scores);
        this.setState({
          dataLineChart: data,
          gekozenOpdrachten: gekozenOpdrachten,
        });
      } else this.setState({ gekozenOpdrachten: gekozenOpdrachten });
    }
  }

  scoreKeuzeHandle(e) {
    this.setState({ scoreKeuze: e.target.value });
  }

  handleHisto(index, link) {
    let linkjes = Array.from(document.getElementsByClassName("linkklas"));
    linkjes.forEach((element) => {
      if (element.classList.contains("maakbold"))
        element.classList.remove("maakbold");
    });
    outputselectie = Array.from(document.getElementsByClassName("outputoptie"));
    outputselectie.forEach((element) => (element.checked = false));
    link.classList.add("maakbold");
  }

  make_linechart(e) {
    if (this.state.scoreKeuze === "") {
      alert("Vul een scorekeuze in");
      e.target.checked = false;
    } else {
      if (this.state.gekozenOpdrachten.length === 0) {
        alert("Vink een aantal opdrachten aan");
        e.target.checked = false;
      } else {
        if (
          this.state.scoreKeuze === "Beide" &&
          this.state.gekozenOpdrachten.length > 1
        ) {
          alert(
            "Bij keuze van meerdere opdrachten kan alleen voor leuk of moeilijk worden gekozen maar niet voor beide"
          );
          e.target.checked = false;
        } else {
          data = make_lineChart_data(
            this.state.gekozenOpdrachten,
            this.props.scores
          );
          this.setState({
            dataLineChart: data,
            makeLineChart: true,
            makeHistogram: false,
          });
        }
      }
    }
  }

  make_histogram(e) {
    let item = document.getElementsByClassName("maakbold");
    if (typeof item[0] === "undefined") {
      alert("Selecteer een opdracht door op de link te drukken");
      e.target.checked = false;
    } else {
      if (this.state.scoreKeuze === "") {
        alert("Vul een scorekeuze in");
        e.target.checked = false;
      } else this.setState({ makeLineChart: false, makeHistogram: true });
    }
  }

  componentDidMount() {
    let maakLijst = maakLijstOpdrachten(this.props.scores);
    opdrachten = maakLijst[0];
    studenten = maakLijst[1];
    this.setState({
      opdrachten: opdrachten,
      studenten: studenten,
      scores: this.props.scores,
    });
  }

  render() {
    let opdrachtenLinks = opdrachten.map((element, index) => {
      let str = "./" + element.toLowerCase();
      return (
        <OpdrachtPerLinkRegel
          str={str}
          el={element}
          key={index}
          handlechange={this.handleChange}
          handlehisto={this.handleHisto}
          index={index}
        />
      );
    });

    let opdrachtenRoutes = opdrachten.map((element, index) => {
      let str = "/" + element.toLowerCase();
      let opdracht = element;
      return (
        <Route key={index} path={str}>
          <MaakHistogram
            opdracht={opdracht}
            scoreKeuze={this.state.scoreKeuze}
            scoresHistogram={this.props.scores.filter(
              (element) => element.opdracht === opdracht
            )}
          />
        </Route>
      );
    });

    return (
      <div>
        <Router>
          <nav>
            <ul className="ullijstje">{opdrachtenLinks}</ul>
          </nav>
          <div className="soortScore">
            <p className="soortscore">Scorekeuze : </p>
            <p className="soortScoreLabel">Beiden</p>
            <input
              className="radio_score"
              type="radio"
              name="scorekeuze"
              value="Beide"
              onChange={this.scoreKeuzeHandle}
            />
            <p className="soortScoreLabel">Moeilijkheid</p>
            <input
              className="radio_score"
              type="radio"
              name="scorekeuze"
              value="Moeilijk"
              onChange={this.scoreKeuzeHandle}
            />
            <p className="soortScoreLabel">Leuk</p>
            <input
              className="radio_score"
              type="radio"
              name="scorekeuze"
              value="Leuk"
              onChange={this.scoreKeuzeHandle}
            />
          </div>
          <label>Maak linechart</label>
          <input
            type="radio"
            className="outputkeuze"
            name="outputkeuze"
            value={this.state.makeLineChart}
            onChange={this.make_linechart}
          />
          <label>Maak histogram</label>
          <input
            type="radio"
            className="outputkeuze"
            name="outputkeuze"
            value={this.state.makeHistogram}
            onChange={this.make_histogram}
          />
          <hr />
          {this.state.makeHistogram ? (
            <Switch>{opdrachtenRoutes}</Switch>
          ) : (
            <p></p>
          )}

          {this.state.makeLineChart ? (
            <div>
              <MaakLineChart
                dataLineChart={this.state.dataLineChart}
                opdrachten={this.state.gekozenOpdrachten}
                scorekeuze={this.state.scoreKeuze}
              />
            </div>
          ) : (
            <p></p>
          )}
        </Router>
      </div>
    );
  }
}

export default WeergavePerOpdracht;
