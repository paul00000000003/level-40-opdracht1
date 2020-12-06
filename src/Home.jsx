import React from 'react'
import {BarChart,
    Bar,
    XAxis,
    YAxis,
    LineChart,
    Line,
    Legend,
    CartesianGrid,
    Tooltip} from 'recharts'

class Home extends React.Component{
    constructor(){super()
                  this.state={scoresGemiddeld:[],
                              schermGeladen : false,
                              makeHistogram : true,
                              makeLineChart : false}
                            
                this.make_linechart=this.make_linechart.bind(this)
                this.make_histogram=this.make_histogram.bind(this)}

    make_linechart()
    {
      this.setState({makeHistogram:false})
    }

    make_histogram()
    {
      this.setState({makeHistogram:true})

    }

    componentDidMount(){
        let leukGradesTotalen = {}
        let moeilijkGradesTotalen = {}
        let aantallenGrades = {}
        let scoresGemiddeld = []
        let opdrachten = []
    
        this.props.scores.forEach(element => {
            if (!(opdrachten.includes(element.opdracht))) {
                opdrachten.push(element.opdracht)
                leukGradesTotalen[element.opdracht] = element.leukGrade
                moeilijkGradesTotalen[element.opdracht] = element.moeilijkGrade
                aantallenGrades[element.opdracht] = 1
                opdrachten.push(element.opdracht)
           } 
           else {
            leukGradesTotalen[element.opdracht] = leukGradesTotalen[element.opdracht] + element.leukGrade
            moeilijkGradesTotalen[element.opdracht] = moeilijkGradesTotalen[element.opdracht] + element.moeilijkGrade
            aantallenGrades[element.opdracht] = aantallenGrades[element.opdracht] + 1
           }
        })

        opdrachten.sort(function(a, b) {
            let element1 = a
            let element2 = b
            if (element1 < element2) {
               return -1;
               }
            if (element1 > element2) {
               return 1;
               }   
            return 0;
            });

        opdrachten.forEach(element => {
            let totaantal = aantallenGrades[element]
            let leukGradeGem = leukGradesTotalen[element] / totaantal
            let moeilijkGradeGem = moeilijkGradesTotalen[element] / totaantal
            scoresGemiddeld.push({ opdracht: element, leukGrade: leukGradeGem, moeilijkGrade: moeilijkGradeGem })
        })
        this.setState({scoresGemiddeld:scoresGemiddeld,
                       schermGeladen:true})
    }
    
    render(){
        if (this.state.schermGeladen)
           return ( <div>
                       <h1>Winc gemiddelde resultaten leuk en moeilijk</h1>
                       <label>Maak linechart</label>
                           <input type="radio" className="outputkeuze" 
                                               name="outputkeuze" 
                                               value={this.state.makeLineChart} 
                                               onChange={this.make_linechart}
                                               />
                        <label>Maak histogram</label>
                        <input id="histo"   type="radio" className="outputkeuze" 
                                            name="outputkeuze" 
                                            value={this.state.makeHistogram} 
                                            onChange={this.make_histogram}
                                            defaultChecked/>
                        <hr/>
 
                        {this.state.makeHistogram ?
                          <BarChart width={1600} height={500} data={this.state.scoresGemiddeld}>
                             <XAxis dataKey="opdracht" />
                             <YAxis />
                             <Tooltip />
                             <Bar name="moeilijk" dataKey="moeilijkGrade" fill="#FF0000" />
                             <Bar name="leuk" dataKey="leukGrade" fill="#008000"/>
                          </BarChart> :
                          <LineChart className="linechart" width={1460} height={500} data={this.state.scoresGemiddeld} margin={{top:5}} >
                            <XAxis dataKey="opdracht" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line name="moeilijk" type="monotone" dataKey="moeilijkGrade" stroke="#FF0000"/>
                            <Line name="leuk" type="monotone" dataKey="leukGrade" stroke="#008000"/>
                          </LineChart>}
                   </div>)
        else return <h1>Moment geduld alstublieft. Het scherm wordt geladen</h1>  
    }
}


export default Home