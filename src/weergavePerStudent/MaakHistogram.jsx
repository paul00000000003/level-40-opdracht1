import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

class MaakHistogram extends React.Component {
  constructor() {
    super();
    this.state = { scoreKeuze: "", maakHistogram: false };
  }

  render() {
    let barChartKolommenKeuze = [];
    switch (this.props.scoreKeuze) {
      case "Beide":
        barChartKolommenKeuze = [
          <Bar dataKey="moeilijkGrade" fill="#8884d8" />,
          <Bar dataKey="leukGrade" fill="#98FF98" />,
        ];
        break;
      case "Moeilijk":
        barChartKolommenKeuze = [
          <Bar dataKey="moeilijkGrade" fill="#8884d8" />,
        ];
        break;
      case "Leuk":
        barChartKolommenKeuze = [<Bar dataKey="leukGrade" fill="#98FF98" />];
        break;
      default:
        barChartKolommenKeuze = [];
    }
    return (
      <div>
        <h1>{this.props.student}</h1>
        <BarChart width={730} height={250} data={this.props.scoresHistogram}>
          <XAxis dataKey="opdracht" />
          <YAxis />
          <Tooltip />
          {barChartKolommenKeuze}
        </BarChart>
      </div>
    );
  }
}

export default MaakHistogram;
