
import './App.css';
import { Component } from 'react';
import { RadialChart } from 'react-vis';
import { Statistic} from 'antd';
import { PercentageOutlined } from '@ant-design/icons';

class CurrentChart extends Component {
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
        <RadialChart colorRange={['#c7c7c780', '#007fff80']} innerRadius={this.state.width / 3} radius={this.state.height / 2} height={this.state.height} width={this.state.width} animation={"gentle"} data={[this.state.data[0],{angle:(100-this.state.data[0].angle)}]} />
        <Statistic title="Used" value={(Math.floor((this.state.data[0].angle)))} suffix={<PercentageOutlined style={{ "padding": 2 }} />} style={{ position: "relative", top: -1 * this.state.height / 2 - 25, "textAlign": "center" }}></Statistic>
      </div>
    );
  }
}

export default CurrentChart;
