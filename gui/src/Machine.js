import { Component, createRef } from "react";
import TimelineChart from "./TimelineChart";
import { Card, Row, Col } from 'antd'
import CurrentChart from "./CurrentChart";
import { Typography } from 'antd';
import DataGrid from "./DataGrid";
const { Title } = Typography;

async function getData(machine){
    var resp = await fetch('http://127.0.0.1:5050/machine/'+machine, {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    var res = await resp.json()
    return res
}


class Machine extends Component {
    constructor(props) {
        super(props)
        this.timeline = createRef()
        this.cpuPie = createRef()
        this.ramPie = createRef()
        this.gpuPie = createRef()
        this.i = 0
        this.state = {
            data1: {
                cpuClock: 4200,
                gpuClock: 300,
                ramClock: 3200,
                T0: 98,
                T1: 76
            },
            data2: {
                T2: 33,
                T3: 45,
                T4: 36,
                gpuName: 'NVIDIA GeForce RTX 2060'
            }
        }
    }
    componentDidMount() {
        setInterval(()=>{
            getData(this.props.url).then((d)=>{
                this.gpuPie.current.setState({'data':[{'angle':d.gpu0_data.gpu_usage}]})
                this.cpuPie.current.setState({'data':[{'angle':d.cpu_data.cpu_usage}]})
                this.ramPie.current.setState({'data':[{'angle':d.memory_data.mem_usage}]})
                this.timeline.current.setState({'data':[...(this.timeline.current.state.data.slice(this.timeline.current.state.data.length-20)),{ "x": this.timeline.current.state.data[this.timeline.current.state.data.length-1].x +1, "y": d.cpu_data.cpu_usage }]})
                this.setState({'data1':{...d.cpu_data,...d.memory_data},'data2':{...d.gpu0_data}})
            })
        },1000)
    }
    render() {
        const size = 225
        return (
            <Row gutter={[16, 16]}>
                <Col>
                    <Card title={"Cpu usage in last 10 seconds"}>
                        <TimelineChart width={size} height={size} data={[{ "x": 0, "y": 0 }]} ref={this.timeline} />
                    </Card>
                </Col>
                <Col>
                    <Card title={"Current cpu usage"}>
                        <CurrentChart width={size} height={size} data={[{ angle: 1 }]} ref={this.cpuPie}></CurrentChart>
                    </Card>
                </Col>
                <Col>
                    <Card title="Ram usage">
                        <CurrentChart width={size} height={size} data={[{ angle: 1 }]} ref={this.ramPie}></CurrentChart>
                    </Card>
                </Col>
                <Col>
                    <Card title="Gpu usage">
                        {this.state.data1.gpuClock != "Not Available" && <CurrentChart width={size} height={size} data={[{ angle: 1 }]} ref={this.gpuPie}></CurrentChart>}
                    </Card>
                </Col>
                <Col gutter={16}>
                    <DataGrid width={size} height={size} data={this.state.data1} name="Temperatures and clocks" />
                </Col>
                <Col gutter={16}>
                    <DataGrid width={size} height={size} data={this.state.data2} name="Temperatures and clocks" />
                </Col>
            </Row>
        )
    }
}

export default Machine