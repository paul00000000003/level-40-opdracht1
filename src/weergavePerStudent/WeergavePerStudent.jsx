import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MaakHistogram from "./MaakHistogram";
import StudentPerLinkRegel from "./StudentPerLinkRegel";
import "./weergaveperstudent.css";
import MaakLineChart from "./MaakLineChart";

let studenten = [];
let data = [];
let opdrachten = [];
let outputselectie = [];
let gekozenStudenten = [];

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

const filterScores = (scores) => {
  studenten = [];
  opdrachten = [];
  scores.forEach((element) => {
    if (!studenten.includes(element.student)) studenten.push(element.student);
    if (!opdrachten.includes(element.opdracht))
      opdrachten.push(element.opdracht);
  });
  return [studenten, opdrachten];
};

const make_lineChart_data = (gekozenStudenten, opdrachten, scores) => {
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
    let spotStudent = gekozenStudenten.indexOf(element.student);
    if (spotStudent > -1 && spotStudent < 6) {
      let spotopdracht = opdrachten.indexOf(element.opdracht);
      switch (spotStudent) {
        case 0:
          moeilijkGradesOpdr1[spotopdracht] = element.moeilijkGrade;
          leukGradesOpdr1[spotopdracht] = element.leukGrade;
          break;
        case 1:
          moeilijkGradesOpdr2[spotopdracht] = element.moeilijkGrade;
          leukGradesOpdr2[spotopdracht] = element.leukGrade;
          break;
        case 2:
          moeilijkGradesOpdr3[spotopdracht] = element.moeilijkGrade;
          leukGradesOpdr3[spotopdracht] = element.leukGrade;
          break;
        case 3:
          moeilijkGradesOpdr4[spotopdracht] = element.moeilijkGrade;
          leukGradesOpdr4[spotopdracht] = element.leukGrade;
          break;
        case 4:
          moeilijkGradesOpdr5[spotopdracht] = element.moeilijkGrade;
          leukGradesOpdr5[spotopdracht] = element.leukGrade;
          break;
        case 5:
          moeilijkGradesOpdr6[spotopdracht] = element.moeilijkGrade;
          leukGradesOpdr6[spotopdracht] = element.leukGrade;
          break;
        default:
          console.log("Geen waarde mogelijk voor " + spotStudent);
      }
    }
  });

  let dataLineChart = [];
  opdrachten.forEach((element, index) => {
    dataLineChart.push({
      opdracht: element,
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

//<MaakHistogram student={this.state.student} scores={this.state.scores}/>:<p></p>}

class WeergavePerStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      scoresHistogram: [],
      scores: [],
      scoreKeuze: "",
      student: "",
      maakHistogram: false,
      gekozenStudenten: [],
    };
    this.scoreKeuzeHandle = this.scoreKeuzeHandle.bind(this);
    this.make_histogram = this.make_histogram.bind(this);
    this.make_linechart = this.make_linechart.bind(this);
    this.handleHisto = this.handleHisto.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  scoreKeuzeHandle(e) {
    this.setState({ scoreKeuze: e.target.value, maakHistogram: true });
  }

  handleChange(index, vinkje) {
    gekozenStudenten = this.state.gekozenStudenten;
    if (vinkje.checked === true) {
      if (gekozenStudenten.length === 6) {
        alert("Er kunnen slechts 6 studenten worden gekozen");
        vinkje.checked = false;
      } else if (
        this.state.scoreKeuze === "Beide" &&
        gekozenStudenten.length === 1
      ) {
        vinkje.checked = false;
        alert(
          "Bij twee of meer studenten kun je voor de scorekeuze alleen moeilijk of leuk kiezen"
        );
      } else gekozenStudenten.push(this.state.studenten[index]);
    } else {
      let index2 = -1;

      gekozenStudenten.forEach((element, index3) => {
        if (element === this.state.studenten[index]) index2 = index3;
      });
      if (index2 !== -1) gekozenStudenten.splice(index2, 1);
    }
    outputselectie = Array.from(document.getElementsByClassName("outputoptie"));
    outputselectie.forEach((element) => (element.checked = false));
    if (gekozenStudenten.length === 0)
      this.setState({
        gekozenStudenten: gekozenStudenten,
        makeLineChart: false,
        dataLineChart: [],
      });
    else {
      if (this.state.makeLineChart === true) {
        data = make_lineChart_data(
          gekozenStudenten,
          this.state.opdrachten,
          this.props.scores
        );
        this.setState({
          dataLineChart: data,
          gekozenStudenten: gekozenStudenten,
        });
      } else this.setState({ gekozenStudenten: gekozenStudenten });
    }
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
      if (this.state.gekozenStudenten.length === 0) {
        alert("Vink een aantal studenten aan");
        e.target.checked = false;
      } else {
        if (
          this.state.scoreKeuze === "Beide" &&
          this.state.gekozenStudenten.length > 1
        ) {
          alert(
            "Bij keuze van meerdere studenten kan alleen voor leuk of moeilijk worden gekozen maar niet voor beide"
          );
          e.target.checked = false;
        } else {
          data = make_lineChart_data(
            this.state.gekozenStudenten,
            this.state.opdrachten,
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
      alert("Selecteer een opdracht door op de link te klikken");
      e.target.checked = false;
    } else {
      if (this.state.scoreKeuze === "") {
        alert("Vul een scorekeuze in");
        e.target.checked = false;
      } else {
        this.setState({ makeLineChart: false, makeHistogram: true });
      }
    }
  }

  componentDidMount() {
    let gefilterd = filterScores(this.props.scores);
    studenten = gefilterd[0];
    opdrachten = gefilterd[1];
    this.setState({
      scores: this.props.scores,
      studenten: studenten,
      opdrachten: opdrachten,
    });
  }

  render() {
    sorteerStudenten(studenten);
    let studentenLinkRegels = studenten.map((element, index) => {
      let str = "./" + element.toLowerCase();
      return (
        <StudentPerLinkRegel
          str={str}
          el={element}
          key={index}
          handlechange={this.handleChange}
          handlehisto={this.handleHisto}
          index={index}
        />
      );
    });

    let studentenRoutes = studenten.map((element, index) => {
      let str = "/" + element.toLowerCase();
      let student = element;
      return (
        <Route key={index} path={str}>
          <MaakHistogram
            key={index}
            student={student}
            scoreKeuze={this.state.scoreKeuze}
            scoresHistogram={this.props.scores.filter(
              (element) => element.student === student
            )}
          />
        </Route>
      );
    });

    return (
      <Router>
        <nav>
          <ul className="ullijstje">{studentenLinkRegels}</ul>
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
          <Switch>{studentenRoutes}</Switch>
        ) : (
          <p></p>
        )}
        {this.state.makeLineChart ? (
          <div>
            <MaakLineChart
              dataLineChart={this.state.dataLineChart}
              studenten={this.state.gekozenStudenten}
              scorekeuze={this.state.scoreKeuze}
            />
          </div>
        ) : (
          <p></p>
        )}
      </Router>
    );
  }
}

export default WeergavePerStudent;
