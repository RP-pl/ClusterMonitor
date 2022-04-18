import './App.css';
import { Component } from 'react';
import {Card} from 'antd';
import { PercentageOutlined } from '@ant-design/icons';

class DataGrid extends Component {
  constructor(props) {
    super(props)
    this.state={gridStyle:{
        width: '33.33%',
        height:'65px',
        textAlign: 'center',
        fontSize:"80%",
        justifyContent:"center"
      }};
  }
  componentDidMount() {
  }
  render() {
      var el = []
      for(var index in this.props.data){
          el.push(<Card.Grid key={index} style={this.state.gridStyle}>{index} : {this.props.data[index]}</Card.Grid>)
      }
    return (
    <Card bodyStyle={this.gridStyle}  style={{width:this.props.width*3-this.props.width*65/135,height:this.props.height-35}} title={this.props.name}>
        {el}
    </Card>
    );
  }
}

export default DataGrid;