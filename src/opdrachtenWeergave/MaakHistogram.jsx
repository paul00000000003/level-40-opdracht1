import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

class MaakHistogram extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let barChartKolommenKeuze = [];
    switch (this.props.scoreKeuze) {
      case "Beide":
        barChartKolommenKeuze = [
          <Bar key={1} dataKey="moeilijkGrade" fill="#8884d8" />,
          <Bar key={2} dataKey="leukGrade" fill="#98FF98" />,
        ];
        break;
      case "Moeilijk":
        barChartKolommenKeuze = [
          <Bar key={3} dataKey="moeilijkGrade" fill="#8884d8" />,
        ];
        break;
      case "Leuk":
        barChartKolommenKeuze = [
          <Bar key={4} dataKey="leukGrade" fill="#98FF98" />,
        ];
        break;
      default:
        barChartKolommenKeuze = [];
    }
    return (
      <div>
        <h1>{this.props.opdracht}</h1>
        <BarChart width={730} height={250} data={this.props.scoresHistogram}>
          <XAxis dataKey="student" />
          <YAxis />
          <Tooltip />
          {barChartKolommenKeuze}
        </BarChart>
      </div>
    );
  }
}

export default MaakHistogram;
