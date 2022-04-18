
import './App.css';
import { Component } from 'react';
import { LineSeries,XAxis,YAxis,XYPlot,VerticalGridLines,HorizontalGridLines,DecorativeAxis } from 'react-vis';
import { Statistic} from 'antd';
import { PercentageOutlined } from '@ant-design/icons';
import '../node_modules/react-vis/dist/style.css';

class TimelineChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      name: "chart",
      height: props.height,
      width: props.width
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div style={{ "width": this.state.width, height: this.state.height }}>
          <XYPlot yDomain={[0,100]} height={this.state.height} width={this.state.width}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <YAxis  axisDomain={[0,100]}/>
              <XAxis tickTotal={6} style={{line: {fill: '#0000ff'}}} axisStart={{x: 0, y: 0}} axisDomain={[0,100]}/>
              <LineSeries data={this.state.data} opacity={1}/>
              </XYPlot>
      </div>
    );
  }
}

export default TimelineChart;
