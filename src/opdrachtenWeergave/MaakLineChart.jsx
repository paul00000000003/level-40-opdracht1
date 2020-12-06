import React from "react";
import "./maaklinechart.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
} from "recharts";

class MaakLineChart extends React.Component {
  render() {
    let color = "#8400D3";
    let datakey = "cijfer1Leuk";
    if (this.props.opdrachten.length === 1) {
      return (
        <div>
          <h1>
            Cijfers voor moeilijk en leuk van opdracht{" "}
            {this.props.opdrachten[0]}
          </h1>
          <LineChart
            className="linechart"
            width={730}
            height={250}
            data={this.props.dataLineChart}
            margin={{ top: 5 }}
          >
            <XAxis dataKey="student" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line
              name="cijfer moeilijk"
              type="monotone"
              dataKey="cijfer1Moeilijk"
              stroke="#8884d8"
            />
            <Line
              name="cijfer leuk"
              type="monotone"
              dataKey="cijfer1Leuk"
              stroke="#FF0000"
            />
          </LineChart>
        </div>
      );
    } else {
      let lijnen = [];
      if (this.props.scorekeuze === "Leuk") {
        lijnen = this.props.opdrachten.map((element, index) => {
          switch (index) {
            case 0:
              color = "#FF0000"; //rood
              datakey = "cijfer1Leuk";
              break;
            case 1:
              color = "#7FFFD4"; //aquamarijn
              datakey = "cijfer2Leuk";
              break;
            case 2:
              color = "#008000"; //groen
              datakey = "cijfer3Leuk";
              break;
            case 3:
              color = "#8400D3"; //paars
              datakey = "cijfer4Leuk";
              break;
            case 4:
              color = "#FFA500"; //oranje
              datakey = "cijfer5Leuk";
              break;
            case 5:
              color = "#A65E2E"; //bruin
              datakey = "cijfer6Leuk";
              break;
            default:
              color = "#FF0000"; //roond
              datakey = "cijfer1Leuk";
          }
          let name = "cijfer leuk opdracht " + element;
          return (
            <Line
              name={name}
              type="monotone"
              dataKey={datakey}
              stroke={color}
            />
          );
        });
      } else {
        lijnen = this.props.opdrachten.map((element, index) => {
          switch (index) {
            case 0:
              color = "#FF0000"; //rood
              datakey = "cijfer1Moeilijk";
              break;
            case 1:
              color = "#7FFFD4"; //aquamarijn
              datakey = "cijfer2Moeilijk";
              break;
            case 2:
              color = "#008000"; //groen
              datakey = "cijfer3Moeilijk";
              break;
            case 3:
              color = "#8400D3"; //aquamarijn
              datakey = "cijfer4Moeilijk";
              break;
            case 4:
              color = "#FFA500"; //groen
              datakey = "cijfer5Moeilijk";
              break;
            case 5:
              color = "#A65E2E"; //bruin
              datakey = "cijfer6Moeilijk";
              break;
            default:
              color = "#8400D3"; //paars
              datakey = "cijfer1Moeilijk";
          }
          let name = "cijfer moeilijk opdracht " + element;
          return (
            <Line
              name={name}
              type="monotone"
              dataKey={datakey}
              stroke={color}
            />
          );
        });
      }
      return (
        <LineChart
          className="linechart"
          width={1460}
          height={500}
          data={this.props.dataLineChart}
          margin={{ top: 5 }}
        >
          <XAxis dataKey="student" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          {lijnen}
        </LineChart>
      );
    }
  }
}

export default MaakLineChart;
