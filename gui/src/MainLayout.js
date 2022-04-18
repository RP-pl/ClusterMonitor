import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import React from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Machine from './Machine';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


async function getMachines(){
    var resp = await fetch('http://127.0.0.1:5050/machines', {
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
  var res = await resp.json()
  return res['machines']
}

class MainLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      current: "Machine 0",
      machines: []
    };
  }
  componentDidMount(){
    getMachines().then((mch)=>{
      var ms = []
      var i = 1
      for (var machine of mch) {
        ms.push(
          <Menu.Item key={i} icon={<PieChartOutlined />} onClick={this.onClick}>
           {machine}
          </Menu.Item>
        )
        i++
      }
      this.setState({'machines':ms,'current':mch[0]})
    })
    setInterval(()=>{
      getMachines().then((mch)=>{
      var ms = []
      var i = 1
      for (var machine of mch) {
        ms.push(
          <Menu.Item key={i} icon={<PieChartOutlined />} onClick={this.onClick}>
           {machine}
          </Menu.Item>
        )
        i++
      }
      this.setState({'machines':ms,'current':mch[0]})
    })
    },1000)
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  onClick = element => {
    this.setState({current:this.state.machines[element.key-1]["props"]["children"]})
  }
  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {this.state.machines}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, fontSize: "120%", display: "flex", justifyContent: "center" }} ><h1 style={{ color: "#fff" }}>{this.state.current}</h1></Header>
          <Content style={{ margin: '0 16px' }}>
            <Machine url={this.state.current} />
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </Layout>
    );
  }
}
export default MainLayout